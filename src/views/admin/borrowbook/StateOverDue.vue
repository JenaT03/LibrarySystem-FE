<template>
    <AdminNavBar />
    <AdminBorrowNav />


    <div class="container pb-5">
        <div class="col-md-10 mb-3">
            <InputSearch v-model="searchText" />
        </div>
        <div class="row">
            <div class="mt-3 col-md-6">
                <h4 class="text-center">
                    Phiếu mượn đã quá hạn trả
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
                        Chi tiết phiếu mượn
                    </h4>
                    <BorrowCard :borrow="activeBorrow" />
                    <div class="d-flex justify-content-around">
                        <button class="btn btn-primary text-white" @click="returnBook(activeBorrow._id)">
                            <i class="fa-solid fa-thumbs-up"></i>
                            Trả sách</button>

                    </div>


                </div>
            </div>
        </div>

    </div>
</template>

<script>
import borrowedborrowService from '@/services/borrowedbook.service';
import BorrowCard from '@/components/client/BorrowCard.vue';
import BorrowList from '@/components/client/BorrowList.vue';
import InputSearch from '@/components/layouts/InputSearch.vue';
import AdminNavBar from "@/components/layouts/AdminNavBar.vue";
import AdminBorrowNav from '@/components/layouts/AdminBorrowNav.vue';
export default {
    components: {
        BorrowCard,
        BorrowList,
        InputSearch,
        AdminNavBar,
        AdminBorrowNav,
    },

    data() {
        return {
            borrows: [],
            staff: null,
            activeIndex: -1,
            searchText: "",
            staff: null,
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
                const { borrowDate, dueDate, bookDetails, readerDetails, staffDetails, state } = borrow;
                const bookDetailsTitle = bookDetails.title;
                const bookDetailsAuthor = bookDetails.author;
                const bookDetailsCategory = bookDetails.category;
                const readerName = readerDetails.name;
                const readerPhone = readerDetails.phone;
                const staffPhone = staffDetails.phone;
                const staffName = staffDetails.name;
                return [borrowDate, dueDate, state, bookDetailsTitle, bookDetailsAuthor, bookDetailsCategory, readerName, readerPhone, staffPhone, staffName].join("");
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
        async returnBook(id) {
            try {
                const data = { staffId: this.staff._id, state: "returned" }
                await borrowedborrowService.update(id, data);
                alert("Đã trả sách thành công");
                this.refreshList();
            } catch (error) {
                console.log(error);
            }
        },

        async retrieveBorrows() {
            try {
                this.borrows = await borrowedborrowService.getOverDueBorrows();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveBorrows();
            this.activeIndex = -1;
        },
    },
    created() {
        this.staff = JSON.parse(localStorage.getItem('staff'));
        if (!this.staff) {
            this.$router.push({ name: 'staffLogin' });
        }
    },


    mounted() {
        this.refreshList();
    },


};
</script>