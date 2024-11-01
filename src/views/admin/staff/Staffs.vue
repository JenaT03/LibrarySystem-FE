<template>
    <AdminNavBar />

    <div class="container pb-5">
        <div class="col-md-10 mb-3">
            <InputSearch v-model="searchText" />
        </div>
        <div class="row">
            <div class="mt-3 col-md-6">
                <h4 class="text-center">
                    Nhân viên

                </h4>

                <StaffList v-if="filteredStaffsCount > 0" :staffs="filteredStaffs" v-model:activeIndex="activeIndex" />
                <p v-else class="text-center">Không có nhân viên nào.</p>
                <div class="mt-3 d-flex justify-content-around align-items-center">
                    <button class="btn btn-sm btn-primary px-4 py-2 text-white" @click="refreshList()">
                        <i class="fas fa-redo"></i>
                        Làm mới
                    </button>

                    <button class="btn btn-sm btn-secondary px-4 py-2 text-white" @click="goToAddStaff">
                        <i class="fas fa-plus"></i>
                        Thêm mới
                    </button>


                </div>
            </div>
            <div class="mt-3 col-md-1"></div>
            <div class="mt-3 col-md-5">
                <div v-if="activeStaff">
                    <h4>
                        Chi tiết Nhân viên
                    </h4>
                    <StaffCard :staff="activeStaff" />
                    <router-link :to="{
                        name: 'staff.edit',
                        params: { id: activeStaff._id },
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
import StaffCard from "@/components/admin/staff/StaffCard.vue";
import InputSearch from "@/components/layouts/InputSearch.vue";
import StaffList from "@/components/admin/staff/StaffList.vue";
import StaffService from "@/services/staff.service";
import AdminNavBar from "@/components/layouts/AdminNavBar.vue";
export default {
    components: {
        StaffCard,
        InputSearch,
        StaffList,
        AdminNavBar,
    },
    data() {
        return {
            staffs: [],
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
        staffStrings() {
            return this.staffs.map((staff) => {
                const { name, email, address, phone, position, birth, gender } = staff;
                return [name, email, address, phone, position, birth, gender].join("");
            });
        },
        filteredStaffs() {
            if (!this.searchText) return this.staffs;
            return this.staffs.filter((_staff, index) => this.staffStrings[index].includes(this.searchText));
        },
        activeStaff() {
            if (this.activeIndex < 0) return null;
            return this.filteredStaffs[this.activeIndex];
        },
        filteredStaffsCount() {

            return this.filteredStaffs.length;
        },
    },

    methods: {
        async retrieveStaffs() {
            try {
                this.staffs = await StaffService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveStaffs();
            this.activeIndex = -1;
        },

        goToAddStaff() {
            this.$router.push({ name: "staff.add" });
        },

    },
    //Khi component được khởi tạo, gọi phương thức refreshList() để tải danh sách liên hệ ban đầu
    mounted() {
        this.refreshList();
    },
};
</script>
