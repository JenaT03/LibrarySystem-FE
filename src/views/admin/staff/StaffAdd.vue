<template>
    <AdminNavBar />
    <div class="container">
        <h4 class="text-center m-3">Thêm Nhân viên</h4>
        <StaffForm :staff="staff" @submit:staff="createStaff" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import StaffForm from "@/components/admin/staff/StaffForm.vue";
import staffService from "@/services/staff.service";
import AdminNavBar from "@/components/layouts/AdminNavBar.vue";
export default {
    components: {
        StaffForm,
        AdminNavBar,
    },

    data() {
        return {
            staff: {},
            message: "",
        }
    },

    methods: {
        async createStaff(data) {
            try {
                await staffService.create(data);
                alert('Nhân viên được thêm thành công');
                this.$router.push({ name: "staffs" })
            } catch (error) {
                console.log(error)
            }
        }
    }

}

</script>