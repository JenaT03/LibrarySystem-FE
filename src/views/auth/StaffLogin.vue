<template>
    <NavBar />
    <div class="container-fluid page-header-login-register" style=" padding: 8rem 0 4rem 0; margin-top: 100px;">
        <h1 class="text-center text-white display-5">Nhân viên đăng nhập</h1>
    </div>

    <div class=" container">
        <p v-if="message" class="text-danger text-center mt-3">{{ message }}</p>
        <StaffLogin :staff="staff" @submit:staff="staffLogin" />
    </div>

    <Footer />
</template>

<script>
import NavBar from '@/components/layouts/NavBar.vue';
import Footer from '@/components/layouts/Footer.vue';
import authService from '@/services/auth.service';
import StaffLogin from '@/components/auth/StaffLogin.vue';
export default {
    components: {
        NavBar,
        Footer,
        StaffLogin
    },
    data() {
        return {
            staff: {},
            message: "",
        };
    },
    methods: {
        async staffLogin(data) {
            try {
                const staffData = await authService.staffLogin(data);

                if (staffData && staffData[0]?._id) {
                    localStorage.setItem('staff', JSON.stringify(staffData[0]));
                    this.$router.push({ name: 'dashboard' });
                } else {
                    this.message = "Mật khẩu hoặc email không đúng";
                }
            } catch (error) {
                this.message = error.message;
            }
        }
    },
    created() {
        const staff = JSON.parse(localStorage.getItem('staff'));
        if (staff) {
            this.$router.push({ name: 'dashboard' });
        }
    }


}
</script>