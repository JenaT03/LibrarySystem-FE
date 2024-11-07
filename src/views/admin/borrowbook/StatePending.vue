<template>
    <AdminNavBar />
    <div class="row g-0 pt-3 bg-white">
        <router-link :to="{ name: 'booklistborrow.admin' }" class="col-2 text-center py-2 ">MƯỢN SÁCH</router-link>
        <router-link :to="{ name: 'pendingBorrows' }" class="col-2 text-center py-2 border-cus fw-bold">ĐANG CHỜ
            DUYỆT</router-link>
        <router-link :to="{ name: 'borrowedBorrows' }" class="col-2 text-center py-2 ">ĐANG
            MƯỢN</router-link>
        <router-link :to="{ name: 'returnedBorrows' }" class="col-2 text-center py-2">ĐÃ TRẢ</router-link>
        <router-link :to="{ name: 'overdueBorrows' }" class="col-2 text-center py-2">QUÁ HẠN</router-link>
        <router-link :to="{ name: 'rejectedBorrows' }" class="col-2 text-center py-2">TỪ CHỐI</router-link>

    </div>


    <div class="container pb-5">
        <div class="col-md-10 mb-3">
            <InputSearch v-model="searchText" />
        </div>
        <div class="row">
            <div class="mt-3 col-md-6">
                <h4 class="text-center">
                    Phiếu mượn đang chờ duyệt
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
                        <button class="btn btn-primary text-white" @click="accept(activeBorrow._id)">
                            <i class="fa-solid fa-circle-check"></i>
                            Duyệt</button>

                        <button class="btn btn-danger text-white" @click="reject(activeBorrow._id)">
                            <i class="fa-solid fa-circle-xmark"></i>
                            Từ chối</button>

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
export default {
    components: {
        BorrowCard,
        BorrowList,
        InputSearch,
        AdminNavBar,
    },

    data() {
        return {
            borrows: [],
            staff: null,
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
                const { borrowDate, dueDate, bookDetails, readerDetails, state } = borrow;
                const bookDetailsTitle = bookDetails.title;
                const bookDetailsAuthor = bookDetails.author;
                const bookDetailsCategory = bookDetails.category;
                const readerName = readerDetails.name;
                const readerPhone = readerDetails.phone;
                return [borrowDate, dueDate, state, bookDetailsTitle, bookDetailsAuthor, bookDetailsCategory, readerName, readerPhone].join("");
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
        async accept(id) {
            try {
                const data = { staffId: this.staff._id, state: "borrowed" }
                await borrowedborrowService.update(id, data);
                alert("Đã phê duyệt phiếu mượn thành công");
                this.refreshList();
            } catch (error) {
                console.log(error);
            }
        },

        async reject(id) {
            try {
                const data = { staffId: this.staff._id, state: "rejected" }
                await borrowedborrowService.update(id, data);
                alert("Đã từ chối phiếu mượn");
                this.refreshList();
            } catch (error) {
                console.log(error);
            }
        },

        async retrieveBorrows() {
            try {
                this.borrows = await borrowedborrowService.getByState('pending');
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