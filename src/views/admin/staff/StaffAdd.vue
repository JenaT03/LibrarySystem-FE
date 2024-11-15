<template>
    <AdminNavBar />
    <div class="container">
        <h4 class="text-center m-3">Thêm Nhân viên</h4>
        <p class="text-danger text-center">{{ message }}</p>
        <StaffForm :staff="staff" @submit:staff="findExistStaff" />
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
        async findExistStaff(data) {
            try {
                const user = await staffService.getEmail(data.email);
                if (user.length == 0) {
                    this.createStaff(data)
                } else {
                    alert('Email đã tồn tại');
                }
            } catch (error) {
                console.log(error);
            }
        },

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