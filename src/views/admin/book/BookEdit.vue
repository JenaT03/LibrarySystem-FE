<template>
    <AdminNavBar />
    <div v-if="book" class="page">
        <h4 class="text-center m-3">Hiệu chỉnh Sách</h4>
        <BookForm :book="book" @submit:book="updateBook" @delete:book="deleteBook" />
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            book: null,
            message: "",
        };
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
        async updateBook(data) {
            try {
                const formData = new FormData();
                formData.append("title", data.title);
                formData.append("author", data.author);
                formData.append("category", data.category);
                formData.append("quantity", data.quantity);
                formData.append("year", data.year);
                formData.append("price", data.price);
                formData.append("publisherId", data.publisherDetails._id);
                formData.append("img", data.img);
                await bookService.update(this.book._id, formData);
                alert('Sách được cập nhật thành công.');
                this.$router.push({ name: "books" });
            } catch (error) {
                console.log(error);
            }
        },
        async deleteBook() {
            if (confirm("Bạn muốn xóa Sách này?")) {
                try {
                    await bookService.delete(this.book._id);
                    this.$router.push({ name: "books" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getBook(this.$route.params.id);
        this.message = "";
    },
};
</script>