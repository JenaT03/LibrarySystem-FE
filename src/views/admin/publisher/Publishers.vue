<template>
    <AdminNavBar />

    <div class="container pb-5">
        <div class="col-md-10 mb-3">
            <InputSearch v-model="searchText" />
        </div>
        <div class="row">
            <div class="mt-3 col-md-6">
                <h4 class="text-center">
                    Nhà xuất bản

                </h4>

                <PublisherList v-if="filteredPublishersCount > 0" :publishers="filteredPublishers"
                    v-model:activeIndex="activeIndex" />
                <p v-else class="text-center">Không có nhà xuất bản nào.</p>
                <div class="mt-3 d-flex justify-content-around align-items-center">
                    <button class="btn btn-sm btn-primary px-4 py-2 text-white" @click="refreshList()">
                        <i class="fas fa-redo"></i>
                        Làm mới
                    </button>

                    <button class="btn btn-sm btn-secondary px-4 py-2 text-white" @click="goToAddPublisher">
                        <i class="fas fa-plus"></i>
                        Thêm mới
                    </button>


                </div>
            </div>
            <div class="mt-3 col-md-1"></div>
            <div class="mt-3 col-md-5">
                <div v-if="activePublisher">
                    <h4>
                        Chi tiết Nhà xuất bản
                    </h4>
                    <PublisherCard :publisher="activePublisher" />
                    <router-link :to="{
                        name: 'publisher.edit',
                        params: { id: activePublisher._id },
                    }">
                        <span class="mt-2 text-secondary">
                            <i class="fas fa-edit"></i> Hiệu chỉnh
                        </span>
                    </router-link>
                </div>
            </div>
        </div>

    </div>

</template>
<script>
import PublisherCard from "@/components/admin/publisher/PublisherCard.vue";
import InputSearch from "@/components/layouts/InputSearch.vue";
import PublisherList from "@/components/admin/publisher/PublisherList.vue";
import PublisherService from "@/services/publisher.service";
import AdminNavBar from "@/components/layouts/AdminNavBar.vue";
export default {
    components: {
        PublisherCard,
        InputSearch,
        PublisherList,
        AdminNavBar,
    },
    data() {
        return {
            publishers: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        publisherStrings() {
            return this.publishers.map((publisher) => {
                const { name, email, address } = publisher;
                return [name, email, address].join("");
            });
        },
        filteredPublishers() {
            if (!this.searchText) return this.publishers;
            return this.publishers.filter((_publisher, index) => this.publisherStrings[index].includes(this.searchText));
        },
        activePublisher() {
            if (this.activeIndex < 0) return null;
            return this.filteredPublishers[this.activeIndex];
        },
        filteredPublishersCount() {

            return this.filteredPublishers.length;
        },
    },

    methods: {
        async retrievePublishers() {
            try {
                this.publishers = await PublisherService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrievePublishers();
            this.activeIndex = -1;
        },

        goToAddPublisher() {
            this.$router.push({ name: "publisher.add" });
        },

    },
    //Khi component được khởi tạo, gọi phương thức refreshList() để tải danh sách liên hệ ban đầu
    mounted() {
        this.refreshList();
    },
};
</script>
