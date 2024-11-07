<template>
    <NavBar />
    <div v-if="book && reader" class="container-fluid page-header-login-register"
        style=" padding: 8rem 0 4rem 0; margin-top: 100px;">
        <h1 v-if="book && reader" class="text-center text-white display-5">Mượn sách</h1>
    </div>
    <h2 v-if="book && reader" class="my-3 text-center">Mượn sách</h2>
    <div class="container">
        <BorrowForm :book="book" :reader="reader" :borrow="borrow" @submit:borrow="createBorrowBook" />
    </div>

    <Footer />
</template>

<script>
import NavBar from '@/components/layouts/NavBar.vue';
import Footer from '@/components/layouts/Footer.vue';
import BorrowForm from '@/components/client/BorrowForm.vue';
import bookService from '@/services/book.service';
import borrowedbookService from '@/services/borrowedbook.service';

export default {
    components: {
        NavBar,
        Footer,
        BorrowForm,
    },
    data() {
        return {
            borrow: {},
            book: null,
            reader: null,
        }
    },
    async created() {
        const reader = JSON.parse(localStorage.getItem('reader'));
        if (!reader) {
            this.$router.push({ name: 'readerLogin' });
        } else {
            this.reader = reader;
            await this.getBook(this.$route.params.id);
        }
    },

    methods: {
        async getBook(id) {
            try {
                const response = await bookService.get(id);
                this.book = {
                    ...response,
                    imgUrl: `/uploads/images/${response.img}`,
                };
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
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

        async createBorrowBook(data) {
            try {
                await borrowedbookService.create(data);
                alert('Mượn sách thành công');
                this.$router.push({ name: "home" })
            } catch (error) {
                console.log(error);
            }
        }
    }

}
</script>