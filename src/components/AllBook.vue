<template>


    <div v-for="book in books" :key="book.id" class="col-6 col-md-4 col-xl-3">
        <div class="rounded position-relative fruite-item">

            <div class="border border-secondary rounded">
                <div class="fruite-img">
                    <img :src="book.imgUrl" class="img-fluid w-100 rounded-top" alt="" />
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
    </div>
</template>

<script>
import BookService from "@/services/book.service";
import borrowedbookService from "@/services/borrowedbook.service";

export default {
    props: {
        books: { type: Array, default: [] },
    },

    data() {
        return { outOfStockBooks: [] };
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
    },
};
</script>
