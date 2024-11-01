<template>

    <!-- Footer Start -->
    <div class="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
        <div class="container py-5">
            <div class="pb-4 mb-4" style="border-bottom: 1px solid rgba(255, 255, 255, 0.5)">
                <div class="row g-4">
                    <div class="col-lg-3">
                        <router-link :to="{ name: 'home' }">
                            <h1 class="text-secondary mb-0">BEE</h1>
                        </router-link>
                    </div>
                    <div class="col-lg-6"></div>
                    <div class="col-lg-3">
                        <div class="d-flex justify-content-end pt-3">
                            <a class="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href=""><i
                                    class="fab fa-twitter"></i></a>
                            <a class="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href=""><i
                                    class="fab fa-facebook-f"></i></a>
                            <a class="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href=""><i
                                    class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row g-5">
                <div class="col-lg-3 col-md-6">
                    <div class="footer-item">
                        <h4 class="text-light mb-3">Thành lập năm 2012</h4>
                        <p class="mb-4">
                            Cùng tiêu chí không ngừng hoàn thiện, nâng cao chất lượng sản phẩm, dịch vụ, Thư viên BEE
                            cam kết mang đến cho
                            độc giả trải nghiệm mua sắm trực tuyến an toàn, tiện lợi: cách đặt hàng đơn giản, phương
                            thức thanh toán đa dạng,
                            dịch vụ chăm sóc độc giả tận tình, chu đáo.
                        </p>

                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="d-flex flex-column text-start footer-item">
                        <h4 class="text-light mb-3">Thông tin thư viên</h4>
                        <a class="btn-link" href="">Tất cả sách</a>
                        <a class="btn-link" href="">Giới thiệu</a>
                        <a class="btn-link" href="">Liên hệ</a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="d-flex flex-column text-start footer-item">
                        <h4 class="text-light mb-3">Tài khoản</h4>
                        <a class="btn-link" href="">Độc giả</a>
                        <a class="btn-link" href="">Nhân viên</a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="footer-item">
                        <h4 class="text-light mb-3">Liên hệ</h4>
                        <p>
                            Địa chỉ: Đường 3/2, P. Xuân Khách, Q. Ninh Kiều, TP. Cần Thơ
                        </p>
                        <p>Email:nhib2111857@student.ctu.edu.vn</p>
                        <p>Phone: +84 0359999999</p>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Footer End -->

    <!-- Copyright Start -->
    <div class="container-fluid copyright bg-dark py-4">
        <div class="container">
            <div class="row">
                <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
                    <span class="text-light"><router-link :to="{ name: 'home' }"><i
                                class="fas fa-copyright text-light me-2"></i>Trần Yến
                            Nhi</router-link>, 2024</span>
                </div>
            </div>
        </div>
    </div>
    <!-- Copyright End -->


</template>