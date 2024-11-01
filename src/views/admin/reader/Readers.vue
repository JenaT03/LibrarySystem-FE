<template>
    <AdminNavBar />

    <div class="container pb-5">
        <div class="col-md-10 mb-3">
            <InputSearch v-model="searchText" />
        </div>
        <div class="row">
            <div class="mt-3 col-md-6">
                <h4 class="text-center">
                    Độc giả
                </h4>

                <ReaderList v-if="filteredReadersCount > 0" :readers="filteredReaders"
                    v-model:activeIndex="activeIndex" />
                <p v-else class="text-center">Không có độc giả nào.</p>
                <div class="mt-3 d-flex justify-content-around align-items-center">
                    <button class="btn btn-sm btn-primary px-4 py-2 text-white" @click="refreshList()">
                        <i class="fas fa-redo"></i>
                        Làm mới
                    </button>

                    <button class="btn btn-sm btn-secondary px-4 py-2 text-white" @click="goToAddReader">
                        <i class="fas fa-plus"></i>
                        Thêm mới
                    </button>


                </div>
            </div>
            <div class="mt-3 col-md-1"></div>
            <div class="mt-3 col-md-5">
                <div v-if="activeReader">
                    <h4>
                        Chi tiết Độc giả
                    </h4>
                    <ReaderCard :reader="activeReader" />
                    <router-link :to="{
                        name: 'reader.edit',
                        params: { id: activeReader._id },
                    }">
                        <span class="mt-2 text-secondary">
                            <i class="fas fa-edit"></i> Hiệu chỉnh
                        </span>
                    </router-link>
                    <div class="text-center"><button v-if="activeReader.state == 'active'"
                            class="btn btn-danger text-white " @click="lockAcc(activeReader._id)">
                            <i class="fa-solid fa-lock"></i>
                            Khóa tài khoản</button>
                        <button v-if="activeReader.state == 'blocked'" class="btn btn-primary text-white"
                            @click="unlockAcc(activeReader._id)">
                            <i class="fa-solid fa-unlock"></i>
                            Kích hoạt tài khoản</button>
                    </div>


                </div>
            </div>
        </div>

    </div>

</template>
<script>
import ReaderCard from "@/components/admin/reader/ReaderCard.vue";
import InputSearch from "@/components/layouts/InputSearch.vue";
import ReaderList from "@/components/admin/reader/ReaderList.vue";
import ReaderService from "@/services/reader.service";
import AdminNavBar from "@/components/layouts/AdminNavBar.vue";
export default {
    components: {
        ReaderCard,
        InputSearch,
        ReaderList,
        AdminNavBar,
    },
    data() {
        return {
            readers: [],
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
        readerStrings() {
            return this.readers.map((reader) => {
                const { name, address, phone, birth, gender } = reader;
                return [name, address, phone, birth, gender].join("");
            });
        },
        filteredReaders() {
            if (!this.searchText) return this.readers;
            return this.readers.filter((_reader, index) => this.readerStrings[index].includes(this.searchText));
        },
        activeReader() {
            if (this.activeIndex < 0) return null;
            return this.filteredReaders[this.activeIndex];
        },
        filteredReadersCount() {

            return this.filteredReaders.length;
        },
    },

    methods: {
        async retrieveReaders() {
            try {
                this.readers = await ReaderService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveReaders();
            this.activeIndex = -1;
        },

        goToAddReader() {
            this.$router.push({ name: "reader.add" });
        },

        async lockAcc(id) {
            try {
                await ReaderService.changeState(id, 'blocked');
                alert('Đã khóa tài khoản độc giả');
                this.refreshList();
            } catch (error) {
                console.log(error)
            };
        },
        async unlockAcc(id) {
            try {
                await ReaderService.changeState(id, 'active');
                alert('Đã kích hoạt tài khoản độc giả');
                this.refreshList();
            } catch (error) {
                console.log(error)
            };
        }

    },
    mounted() {
        this.refreshList();
    },
};
</script>
