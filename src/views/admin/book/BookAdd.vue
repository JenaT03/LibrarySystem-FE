<template>
    <AdminNavBar />
    <div class="container">
        <h4 class="text-center m-3">Thêm Sách</h4>
        <BookForm :book="book" @submit:book="createBook" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import BookForm from "@/components/admin/book/BookForm.vue";
import bookService from "@/services/book.service";
import AdminNavBar from "@/components/layouts/AdminNavBar.vue";
export default {
    components: {
        BookForm,
        AdminNavBar,
    },

    data() {
        return {
            book: {},
            message: "",
        }
    },

    methods: {
        async createBook(data) {
            try {

                await bookService.create(data);
                alert('Sách được thêm thành công');
                this.$router.push({ name: "books" })
            } catch (error) {
                console.log(error)
            }
        }
    }

}

</script>