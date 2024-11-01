<template>
    <NavBar />

    <div class="container-fluid fruite container-padding" style="background-image: linear-gradient(#F0FFF0, white);">

        <InputSearch v-model="searchText" />
        <div class="container pb-5 pt-3">
            <div class="row g-4">
                <div class="col-lg-12">
                    <div class="row g-4">
                        <div class="col-lg-12">
                            <div class="row g-4 justify-content-center bg-white mt-2 rounded px-4 py-2">
                                <AllBook v-if="filteredBooksCount > 0" :books="filteredBooks" />
                                <p class="text-center" v-else>Không có sách nào.</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer />
</template>

<script>
import NavBar from '@/components/layouts/NavBar.vue';
import Footer from '@/components/layouts/Footer.vue';
import AllBook from '@/components/AllBook.vue';
import InputSearch from '@/components/layouts/InputSearch.vue';
import BookService from '@/services/book.service';
export default {
    components: {
        NavBar,
        Footer,
        AllBook,
        InputSearch
    },
    data() {
        return {
            searchText: "",
            books: [],

        };
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
                console.error("Lỗi khi tải sách:", error);
            }
        },
    },
    mounted() {
        this.retrieveBooks();
    }


}
</script>
