<template>
    <div class="container-fluid vesitable py-5 bg-light-blue">
        <div class="container p-5 bg-white rounded mb-5">
            <h1 class="mb-0">Sách mới nhất năm nay</h1>
            <div class="d-flex justify-content-center mt-3">
                <div v-for="book in latestBooks.slice(0, 5)" :key="book.id"
                    class="border border-primary rounded position-relative vesitable-item mx-3">
                    <div class="vesitable-img">
                        <img :src="book.imgUrl" class="img-fluid w-100 rounded-top" alt="Book Image" />
                    </div>
                    <div class="p-4">
                        <h6 class="product-name">{{ book.title }}</h6>
                        <p class="description-text mb-0">
                            {{ book.author }}
                        </p>
                        <router-link :to="{
                            name: 'bookdetail',
                            params: { id: book._id },
                        }" class="text-primary text-decoration-underline"><span>Xem chi
                                tiết</span></router-link>
                        <div class="text-center mt-3 ">
                            <button v-if="isOutOfStock(book._id)"
                                class="btn border border-secondary rounded-pill px-3 text-primary "
                                style="height: fit-content" disabled>
                                <i class="fa-solid fa-bookmark icon-detail"></i>
                                <span class="text-detail">Hết sách</span></button>

                            <router-link v-else :to="{
                                name: 'borrowbook',
                                params: { id: book._id },
                            }" class="btn border border-secondary rounded-pill px-3 text-primary "
                                style="height: fit-content">
                                <i class="fa-solid fa-bookmark icon-detail"></i>
                                <span class="text-detail">Mượn sách</span></router-link>

                        </div>
                    </div>
                </div>
            </div>

            <div class=" d-flex justify-content-end mt-3"><router-link :to="{ name: 'allbook' }"
                    class="text-decoration-underline fw-bold">Xem Tất
                    Cả
                    Sách</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import BookService from '@/services/book.service';
import borrowedbookService from '@/services/borrowedbook.service';

export default {
    data() {
        return {
            latestBooks: [],
            outOfStockBooks: []
        };
    },
    methods: {
        async getOutOfStockBooks() {
            try {
                const response = await borrowedbookService.getOutOfStockBooks();
                this.outOfStockBooks = response.map((book) => book._id);
            } catch (error) {
                console.log(error);
            }
        },
        isOutOfStock(bookId) {
            return this.outOfStockBooks.includes(bookId);
        },
    },

    async mounted() {
        await this.getOutOfStockBooks();

        try {
            const response = await BookService.getLatestBook();
            this.latestBooks = response.map((book) => ({
                ...book,
                imgUrl: `/uploads/images/${book.img}`,
            }));


        } catch (error) {
            console.error("Lỗi khi tải sách mới nhất:", error);
        }
    },



};


</script>
