<template>
    <NavBar />
    <div class="container-fluid page-header-login-register" style=" padding: 8rem 0 4rem 0; margin-top: 100px;">

        <h1 class="text-center text-white display-5">Đăng ký tài khoản</h1>
    </div>

    <div class=" container">
        <h3 class="text-center my-5">Đăng ký</h3>
        <p v-if="message" class="text-danger text-center">{{ message }}</p>
        <ReaderForm :reader="reader" @submit:reader="register" />

    </div>

    <Footer />
</template>

<script>
import NavBar from '@/components/layouts/NavBar.vue';
import Footer from '@/components/layouts/Footer.vue';
import ReaderForm from '@/components/ReaderForm.vue';
import authService from '@/services/auth.service';
import readerService from '@/services/reader.service';
export default {
    components: {
        NavBar,
        Footer,
        ReaderForm
    },
    data() {
        return {
            reader: {},
            message: "",
        };
    },
    methods: {
        async register(data) {
            try {
                const user = await readerService.getByPhone(data.phone);
                console.log(user);
                if (user.length == 0) {
                    this.createReader(data)
                } else {
                    this.message = "Số điện thoại đã tồn tại"
                }
            }
            catch (error) { console.log(error) };

        },

        async createReader(data) {
            try {
                await authService.register(data);
                alert('Đăng ký tài khoản thành công');
                this.$router.push({ name: "readerlogin" })
            } catch (error) {

                console.log(error);
            }
        }
    }
}
</script>