<template>
    <AdminNavBar />
    <AdminBorrowNav />


    <div v-if="book">
        <h4 class="text-center m-3">Mượn Sách</h4>
        <BorrowForm :book="book" :borrow="borrow" @submit:borrow="createBorrowBook" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import BorrowForm from "@/components/admin/borrow/BorrowForm.vue";
import bookService from "@/services/book.service";
import AdminNavBar from "@/components/layouts/AdminNavBar.vue";
import borrowedbookService from "@/services/borrowedbook.service";
import AdminBorrowNav from "@/components/layouts/AdminBorrowNav.vue";
import readerService from "@/services/reader.service";
export default {
    components: {
        BorrowForm,
        AdminNavBar,
        AdminBorrowNav
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            book: null,
            borrow: {},
            message: "",
        };
    },
    methods: {
        async getBook(id) {
            try {

                this.book = await bookService.get(id);

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
        async createBorrowBook(data) {
            try {
                const reader = await readerService.get(data.readerId);
                if (reader.state == 'blocked') {
                    alert('Tài khoản của độc giả đã bị khóa!');
                } else {
                    await borrowedbookService.create(data);
                    alert('Mượn sách thành công');
                    this.$router.push({ name: "pendingBorrows" })
                }

            } catch (error) {
                console.log(error);
            }
        },

    },
    created() {
        this.getBook(this.$route.params.id);
        this.message = "";
    },
};
</script>