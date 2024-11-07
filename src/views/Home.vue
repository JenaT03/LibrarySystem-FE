<template>
    <NavBar />
    <!-- Hero Start -->
    <div class="container-fluid pb-5 hero-header">
        <div class="container py-5">
            <div class="row g-5 align-items-center">

                <div class="col-md-12">
                    <div id="carouselId" class="carousel slide position-relative" data-bs-ride="carousel">
                        <div class="carousel-inner" role="listbox">
                            <div class="carousel-item active rounded">
                                <img src="@/assets/images/banner1.jpg" class="img-fluid w-100 h-50 bg-secondary rounded"
                                    alt="First slide" />
                                <!-- <a href="#" class="btn px-4 py-2 text-white rounded">Fruites</a> -->
                            </div>
                            <div class="carousel-item rounded">
                                <img src="@/assets/images/banner2.jpg" class="img-fluid w-100 h-50 rounded"
                                    alt="Second slide" />
                                <!-- <a href="#" class="btn px-4 py-2 text-white rounded">Vesitables</a> -->
                            </div>
                            <div class="carousel-item rounded">
                                <img src="@/assets/images/banner3.jpg" class="img-fluid w-100 h-50 rounded"
                                    alt="Third slide" />
                                <!-- <a href="#" class="btn px-4 py-2 text-white rounded">Vesitables</a> -->
                            </div>
                            <div class="carousel-item rounded">
                                <img src="@/assets/images/banner4.jpg" class="img-fluid w-100 h-50 rounded"
                                    alt="Third slide" />
                                <!-- <a href="#" class="btn px-4 py-2 text-white rounded">Vesitables</a> -->
                            </div>
                            <div class="carousel-item rounded">
                                <img src="@/assets/images/banner5.jpg" class="img-fluid w-100 h-50 rounded"
                                    alt="Third slide" />
                                <!-- <a href="#" class="btn px-4 py-2 text-white rounded">Vesitables</a> -->
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselId"
                            data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselId"
                            data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Hero End -->

    <!-- Featurs Section Start -->
    <div class="container-fluid featurs">
        <div class="container py-5">
            <h3 class="text-primary text-center display-4">
                Thư viện BEE - CHÂN TRỜI TRI THỨC
            </h3>
        </div>
    </div>
    <!-- Featurs Section End -->

    <!-- Borrowed Book History -->
    <div v-if="reader" class="container-fluid featurs">
        <div class="container py-5">
            <router-link :to="{ name: 'borrowhistory', params: { id: this.reader._id } }" v-if="reader"
                class="btn d-flex btn-primary col-12 col-lg-6 offset-lg-3 py-4 justify-content-center">
                <i class="fa-solid fa-scroll text-white" style="font-size: 2rem"></i>
                <p class="text-white ms-4 mb-0" style="font-size: 1.5rem">
                    LỊCH SỬ MƯỢN SÁCH CỦA BẠN
                </p>
            </router-link>
        </div>
    </div>
    <!-- End Borrowed Book History -->


    <!-- Latest Book -->
    <LatestBook />
    <!-- Latest Book End -->

    <!-- Introduce Banner -->
    <div class="container-fluid banner bg-secondary">
        <div class="container py-5">
            <div class="row g-4 align-items-center">
                <div class="col-lg-6">
                    <div class="py-4">
                        <h1 class="display-3 text-white">Thư viên BEE</h1>
                        <p class="fw-normal display-3 text-dark mb-4">
                            thành lập năm 2012
                        </p>
                        <p class="mb-4 text-dark">
                            Cùng tiêu chí không ngừng hoàn thiện, nâng cao chất lượng sản phẩm, dịch vụ, Thư viên BEE
                            cam kết mang đến cho
                            độc giả trải nghiệm mua sắm trực tuyến an toàn, tiện lợi: cách đặt hàng đơn giản, phương
                            thức thanh toán đa dạng,
                            dịch vụ chăm sóc độc giả tận tình, chu đáo.
                        </p>

                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="position-relative">
                        <img src="@/assets/images/banner11.jpg" class="img-fluid w-100 rounded" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Introduce Banner End -->

    <!-- Publisher -->
    <div class="container-fluid py-5">
        <div class="text-center mx-auto mb-5" style="max-width: 700px">
            <h1 class="display-4">Nhà Xuất Bản</h1>
        </div>
        <div class="container">
            <div class="bg-light p-5 rounded">
                <div class="row g-4 justify-content-center">
                    <div class="col-md-6 col-lg-6 col-xl-3">
                        <div class="counter bg-white rounded p-5">
                            <img src="@/assets/images/nxb1.png" alt="" />
                            <h5>Stellapharm</h5>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6 col-xl-3">
                        <div class="counter bg-white rounded p-5">
                            <img src="@/assets/images/nxb2.png" alt="" />
                            <h5>Merck Sharp & Dohme</h5>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6 col-xl-3">
                        <div class="counter bg-white rounded p-5">
                            <img src="@/assets/images/nxb3.png" alt="" />
                            <h5>NUCOS </h5>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6 col-xl-3">
                        <div class="counter bg-white rounded p-5">
                            <img src="@/assets/images/nxb4.png" alt="" />
                            <h5>ALCON LABORATORIES</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Publisher End -->

    <!-- Tastimonial Start -->
    <div class="container-fluid testimonial py-5">
        <div class="container py-5">
            <div class="testimonial-header text-center">
                <h4 class="text-primary"><i class="fa-solid fa-quote-left"></i></h4>
                <h1 class="display-5 mb-5 text-dark">
                    Trích dẫn hay
                </h1>
            </div>
            <div class="owl-carousel testimonial-carousel">
                <div class="testimonial-item img-border-radius bg-light rounded p-4">
                    <div class="position-relative">
                        <i class="fa fa-quote-right fa-2x text-secondary position-absolute"
                            style="bottom: 30px; right: 0"></i>
                        <div class="mb-4 pb-4 border-bottom border-secondary">
                            <p class="mb-0">
                                Sách của một kẻ hành khất còn giá trị hơn là dòng máu của kẻ quý tộc.
                            </p>
                        </div>
                        <div class="d-flex align-items-center flex-nowrap">
                            <div class="ms-4 d-block">
                                <p class="m-0 pb-3">Shakespeare</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="testimonial-item img-border-radius bg-light rounded p-4">
                    <div class="position-relative">
                        <i class="fa fa-quote-right fa-2x text-secondary position-absolute"
                            style="bottom: 30px; right: 0"></i>
                        <div class="mb-4 pb-4 border-bottom border-secondary">
                            <p class="mb-0">
                                Sách của một kẻ hành khất còn giá trị hơn là dòng máu của kẻ quý tộc.
                            </p>
                        </div>
                        <div class="d-flex align-items-center flex-nowrap">
                            <div class="ms-4 d-block">
                                <p class="m-0 pb-3">Shakespeare</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="testimonial-item img-border-radius bg-light rounded p-4">
                    <div class="position-relative">
                        <i class="fa fa-quote-right fa-2x text-secondary position-absolute"
                            style="bottom: 30px; right: 0"></i>
                        <div class="mb-4 pb-4 border-bottom border-secondary">
                            <p class="mb-0">
                                Sách của một kẻ hành khất còn giá trị hơn là dòng máu của kẻ quý tộc.
                            </p>
                        </div>
                        <div class="d-flex align-items-center flex-nowrap">
                            <div class="ms-4 d-block">
                                <p class="m-0 pb-3">Shakespeare</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="testimonial-item img-border-radius bg-light rounded p-4">
                    <div class="position-relative">
                        <i class="fa fa-quote-right fa-2x text-secondary position-absolute"
                            style="bottom: 30px; right: 0"></i>
                        <div class="mb-4 pb-4 border-bottom border-secondary">
                            <p class="mb-0">
                                Sách là nguồn của cải quý báu của thế giới và là di sản xứng đáng của các thế hệ và các
                                quốc gia.
                            </p>
                        </div>
                        <div class="d-flex align-items-center flex-nowrap">
                            <div class="ms-4 d-block">
                                <p class="m-0 pb-3">Henry David Thoreau</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="testimonial-item img-border-radius bg-light rounded p-4">
                    <div class="position-relative">
                        <i class="fa fa-quote-right fa-2x text-secondary position-absolute"
                            style="bottom: 30px; right: 0"></i>
                        <div class="mb-4 pb-4 border-bottom border-secondary">
                            <p class="mb-0">
                                Một tác phẩm kinh điển là một cuốn sách không bao giờ nói hết những gì cần phải nói.
                            </p>
                        </div>
                        <div class="d-flex align-items-center flex-nowrap">
                            <div class="ms-4 d-block">
                                <p class="m-0 pb-3">Italo Calvino</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="testimonial-item img-border-radius bg-light rounded p-4">
                    <div class="position-relative">
                        <i class="fa fa-quote-right fa-2x text-secondary position-absolute"
                            style="bottom: 30px; right: 0"></i>
                        <div class="mb-4 pb-4 border-bottom border-secondary">
                            <p class="mb-0">
                                Sách phá vỡ xiềng xích của thời gian và là minh chứng rõ ràng cho việc con người có thể
                                tạo ra điều kỳ diệu.
                            </p>
                        </div>
                        <div class="d-flex align-items-center flex-nowrap">
                            <div class="ms-4 d-block">
                                <p class="m-0 pb-3">Carl Sagan</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- Tastimonial End -->

    <Footer />
</template>
<script>
import NavBar from '@/components/layouts/NavBar.vue';
import Footer from '@/components/layouts/Footer.vue';
import LatestBook from '@/components/LatestBook.vue';
import ReaderService from '@/services/reader.service';
export default {
    components: {
        NavBar,
        Footer,
        LatestBook,
    },

    data() {
        return { reader: null, };
    },
    created() {
        const staff = JSON.parse(localStorage.getItem('staff'));
        const reader = JSON.parse(localStorage.getItem('reader'));
        if (staff) {
            this.$router.push({ name: 'dashboard' });
        }
        if (reader) {
            this.reader = reader;
        }
    }

}
</script>

<style></style>