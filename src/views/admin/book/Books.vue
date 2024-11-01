<template>
    <AdminNavBar />

    <div class="container pb-5">
        <div class="col-md-10 mb-3">
            <InputSearch v-model="searchText" />
        </div>
        <div class="row">
            <div class="mt-3 col-md-6">
                <h4 class="text-center">
                    Sách
                </h4>

                <BookList v-if="filteredBooksCount > 0" :books="filteredBooks" v-model:activeIndex="activeIndex" />
                <p v-else class="text-center">Không có sách nào.</p>
                <div class="mt-3 d-flex justify-content-around align-items-center">
                    <button class="btn btn-sm btn-primary px-4 py-2 text-white" @click="refreshList()">
                        <i class="fas fa-redo"></i>
                        Làm mới
                    </button>

                    <button class="btn btn-sm btn-secondary px-4 py-2 text-white" @click="goToAddBook">
                        <i class="fas fa-plus"></i>
                        Thêm mới
                    </button>


                </div>
            </div>
            <div class="mt-3 col-md-1"></div>
            <div class="mt-3 col-md-5">
                <div v-if="activeBook">
                    <h4>
                        Chi tiết Sách
                    </h4>
                    <BookCard :book="activeBook" />
                    <router-link :to="{
                        name: 'book.edit',
                        params: { id: activeBook._id },
                    }">
                        <span class="mt-2 text-secondary">
                            <i class="fas fa-edit"></i> Hiệu chỉnh
                        </span>
                    </router-link>

                </div>
            </div>
        </div>

    </div>

</template>
<script>
import BookCard from "@/components/admin/book/BookCard.vue";
import InputSearch from "@/components/layouts/InputSearch.vue";
import BookList from "@/components/admin/book/BookList.vue";
import BookService from "@/services/book.service";
import AdminNavBar from "@/components/layouts/AdminNavBar.vue";
export default {
    components: {
        BookCard,
        InputSearch,
        BookList,
        AdminNavBar,
    },
    data() {
        return {
            books: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        bookStrings() {
            return this.books.map((book) => {
                const { title, author, category, publisherDetails } = book;
                const publisherName = publisherDetails.name;
                return [title, author, category, publisherName].join("");
            });
        },
        filteredBooks() {
            if (!this.searchText) return this.books;
            return this.books.filter((_book, index) => this.bookStrings[index].includes(this.searchText));
        },
        activeBook() {
            if (this.activeIndex < 0) return null;
            return this.filteredBooks[this.activeIndex];
        },
        filteredBooksCount() {

            return this.filteredBooks.length;
        },
    },

    methods: {
        async retrieveBooks() {
            try {
                const response = await BookService.getAll();
                this.books = response.map((book) => ({
                    ...book,
                    imgUrl: `/uploads/images/${book.img}`,
                }));
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveBooks();
            this.activeIndex = -1;
        },

        goToAddBook() {
            this.$router.push({ name: "book.add" });
        },



    },
    mounted() {
        this.refreshList();
    },
};
</script>
