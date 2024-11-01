<template>
    <NavBar />
    <div class="container-fluid page-header-login-register" style=" padding: 8rem 0 4rem 0; margin-top: 100px;">
        <h1 class="text-center text-white display-5">Độc giả đăng nhập</h1>
    </div>
    <p v-if="message" class="text-danger text-center mt-3">{{ message }}</p>
    <ReaderLogin :reader="reader" @submit:reader="readerLogin" />


    <div class=" container">

    </div>

    <Footer />
</template>

<script>
import NavBar from '@/components/layouts/NavBar.vue';
import Footer from '@/components/layouts/Footer.vue';
import authService from '@/services/auth.service';
import ReaderLogin from '@/components/auth/ReaderLogin.vue';
export default {
    components: {
        NavBar,
        Footer,
        ReaderLogin
    },
    data() {
        return {
            reader: {},
            message: "",
        };
    },
    methods: {
        async readerLogin(data) {
            try {
                const readerData = await authService.readerLogin(data);

                if (readerData && readerData[0]?._id) {
                    localStorage.setItem('reader', JSON.stringify(readerData[0]));
                    this.$router.push({ name: 'home' });
                } else {
                    this.message = "Mật khẩu hoặc số điện thoại không đúng";
                }
            } catch (error) {
                this.message = error.message;
            }
        }
    },
    created() {
        const reader = JSON.parse(localStorage.getItem('reader'));
        if (reader) {
            this.$router.push({ name: 'home' });
        }
    }

    // logout() {
    //   localStorage.removeItem('reader'); // Xóa đối tượng `reader` khỏi localStorage
    //   this.$router.push({ name: 'readerLogin' }); // Chuyển hướng về trang đăng nhập
    // }
}
</script>