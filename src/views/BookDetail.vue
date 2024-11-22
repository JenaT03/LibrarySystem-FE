<template>
    <NavBar />
    <div v-if="book">
        <!-- Single Product Start -->
        <div class="container-fluid py-5 mt-5">
            <div class="container pb-5 container-padding">
                <div class="row mb-5">
                    <div class="col-12">
                        <div class="row g-4">
                            <div class="col-lg-6">
                                <div class="border rounded">
                                    <a href="#">
                                        <img :src="book.imgUrl" class="img-fluid rounded" alt="Image">
                                    </a>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <h4 class="fw-bold mb-3">{{ book.title }}</h4>
                                <p class="mb-3">Thể loại: {{ book.category }}</p>
                                <p class="mb-3">Nhà xuất bản: {{ book.publisherDetails.name }}</p>
                                <p class="text-dark fw-bold mb-0 mb-2 font-size-p">
                                    <span style="color: red">{{ book.price }}đ</span>
                                </p>
                                <button v-if="isOutOfStock(book._id)"
                                    class="btn border border-secondary rounded-pill px-5 mt-3 text-primary " disabled>
                                    <span class="text-primary">Hết sách</span></button>

                                <router-link v-else :to="{
                                    name: 'borrowbook',
                                    params: { id: book._id },
                                }" class="btn border border-secondary rounded-pill px-5 mt-3 text-primary ">
                                    <span class="text-primary">Mượn sách</span></router-link>
                            </div>


                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
    <!-- Single Product End -->
    <Footer />
</template>

<script>
import NavBar from '@/components/layouts/NavBar.vue';
import Footer from '@/components/layouts/Footer.vue';
import BookService from '@/services/book.service';
import borrowedbookService from '@/services/borrowedbook.service';
export default {
    components: {
        NavBar,
        Footer,
    },

    data() {
        return {
            book: null,
            outOfStockBooks: []
        };
    },

    methods: {
        async getBook(id) {
            try {
                const response = await BookService.get(id);
                this.book = {
                    ...response,
                    imgUrl: `/uploads/images/${response.img}`, // tạo URL tĩnh, khi được gọi trong tempalte thì trình duyệt tự động gửi yêu cầu HTTP đến server để tải tài nguyên từ URL đó.
                };
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
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
        await this.getBook(this.$route.params.id);
    },

}
</script>