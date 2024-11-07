<template>
    <AdminNavBar />
    <div class="row g-0 pt-3 bg-white">
        <router-link :to="{ name: 'booklistborrow.admin' }" class="col-2 text-center py-2 border-cus fw-bold">MƯỢN
            SÁCH</router-link>
        <router-link :to="{ name: 'pendingBorrows' }" class="col-2 text-center py-2">ĐANG CHỜ
            DUYỆT</router-link>
        <router-link :to="{ name: 'borrowedBorrows' }" class="col-2 text-center py-2 ">ĐANG
            MƯỢN</router-link>
        <router-link :to="{ name: 'returnedBorrows' }" class="col-2 text-center py-2">ĐÃ TRẢ</router-link>
        <router-link :to="{ name: 'overdueBorrows' }" class="col-2 text-center py-2">QUÁ HẠN</router-link>
        <router-link :to="{ name: 'rejectedBorrows' }" class="col-2 text-center py-2">TỪ CHỐI</router-link>

    </div>


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

export default {
    components: {
        BorrowForm,
        AdminNavBar,
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

                await borrowedbookService.create(data);
                alert('Mượn sách thành công');
                this.$router.push({ name: "booklistborrow.admin" })
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