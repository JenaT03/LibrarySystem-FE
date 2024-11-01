<template>
    <AdminNavBar />
    <div v-if="staff" class="page">
        <h4 class="text-center m-3">Hiệu chỉnh Nhân viên</h4>
        <StaffForm :staff="staff" @submit:staff="updateStaff" @delete:staff="deleteStaff" />
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            staff: null,
            message: "",
        };
    },
    methods: {
        async getStaff(id) {
            try {

                this.staff = await staffService.get(id);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateStaff(data) {
            try {
                await staffService.update(this.staff._id, data);
                alert('Nhân viên được cập nhật thành công.');
                this.$router.push({ name: "staffs" });
            } catch (error) {
                console.log(error);
            }
        },
        async deleteStaff() {
            if (confirm("Bạn muốn xóa Nhân viên này?")) {
                try {
                    await staffService.delete(this.staff._id);
                    this.$router.push({ name: "staffs" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getStaff(this.$route.params.id);
        this.message = "";
    },
};
</script>