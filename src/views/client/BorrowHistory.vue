<template>
    <NavBar />
    <div class="container-fluid page-header-login-register" style=" padding: 8rem 0 4rem 0; margin-top: 100px;">
        <h1 class="text-center text-white display-5">Lịch sử mượn sách</h1>
    </div>
    <div class="container pb-5">
        <div class="col-md-10 mb-3">
            <InputSearch v-model="searchText" />
        </div>
        <div class="row">
            <div class="mt-3 col-md-6">
                <h4 class="text-center">
                    Lịch sử mượn sách
                </h4>

                <BorrowList v-if="filteredBorrowsCount > 0" :borrows="filteredBorrows"
                    v-model:activeIndex="activeIndex" />
                <p v-else class="text-center">Không có phiếu mượn nào.</p>
                <div class="mt-3 d-flex justify-content-around align-items-center">
                    <button class="btn btn-sm btn-primary px-4 py-2 text-white" @click="refreshList()">
                        <i class="fas fa-redo"></i>
                        Làm mới
                    </button>
                </div>


            </div>
            <div class="mt-3 col-md-1"></div>
            <div class="mt-3 col-md-5">
                <div v-if="activeBorrow">
                    <h4>
                        Chi tiết Lịch sử mượn sách
                    </h4>
                    <BorrowCard :borrow="activeBorrow" />

                </div>
            </div>
        </div>

    </div>
    <Footer />
</template>

<script>
import NavBar from '@/components/layouts/NavBar.vue';
import Footer from '@/components/layouts/Footer.vue';
import borrowedborrowService from '@/services/borrowedbook.service';
import BorrowCard from '@/components/client/BorrowCard.vue';
import BorrowList from '@/components/client/BorrowList.vue';
import InputSearch from '@/components/layouts/InputSearch.vue';


export default {
    components: {
        NavBar,
        Footer,
        BorrowCard,
        BorrowList,
        InputSearch,
    },

    data() {
        return {
            borrows: [],
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
        borrowStrings() {
            return this.borrows.map((borrow) => {
                const { borrowDate, dueDate, bookDetails, state } = borrow;
                const bookDetailsTitle = bookDetails.title;
                const bookDetailsAuthor = bookDetails.author;
                const bookDetailsCategory = bookDetails.category;
                return [borrowDate, dueDate, state, bookDetailsTitle, bookDetailsAuthor, bookDetailsCategory].join("");
            });
        },
        filteredBorrows() {
            if (!this.searchText) return this.borrows;
            return this.borrows.filter((_borrow, index) => this.borrowStrings[index].includes(this.searchText));
        },
        activeBorrow() {
            if (this.activeIndex < 0) return null;
            return this.filteredBorrows[this.activeIndex];
        },
        filteredBorrowsCount() {
            return this.filteredBorrows.length;
        },
    },

    methods: {
        async retrieveBorrows() {
            try {
                this.borrows = await borrowedborrowService.getBorrowsOfReader(this.$route.params.id);
                console.log(this.borrows);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveBorrows();
            this.activeIndex = -1;
        },
    },
    mounted() {
        this.refreshList();
    },
}
</script>
