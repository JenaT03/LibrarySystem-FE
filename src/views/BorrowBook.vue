<template>
    <NavBar />
    <div class="container-fluid page-header-login-register" style=" padding: 8rem 0 4rem 0; margin-top: 100px;">
        <h1 class="text-center text-white display-5">Mượn sách</h1>
    </div>


    <h1>Mượn sách</h1>
    <div class=" container">

    </div>

    <Footer />
</template>

<script>
import NavBar from '@/components/layouts/NavBar.vue';
import Footer from '@/components/layouts/Footer.vue';

export default {
    components: {
        NavBar,
        Footer,

    },
    created() {
        const reader = JSON.parse(localStorage.getItem('reader'));
        if (!reader) {
            this.$router.push({ name: 'readerLogin' });
        }
    }

}
</script>