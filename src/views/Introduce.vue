<template>

    <NavBar />

    <div class="container-fluid page-header-login-register" style=" padding: 8rem 0 4rem 0; margin-top: 100px;">

        <h1 class="text-center text-white display-5">Giới thiệu về BEE</h1>
    </div>

    <!-- Content -->
    <div class=" container mt-5">
        <h4 class="text-primary">GIỚI THIỆU CHUNG</h4>
        <hr>
        <p>Trung tâm Học liệu được Tổ chức từ thiện Atlantic Philanthropies (Mỹ) tài trợ xây dựng trong khuôn viên 7.560
            m2. Tọa
            lạc tại Cổng A Khu II Trường Đại học Cần Thơ, tòa nhà Trung tâm Học liệu gồm 4 tầng với diện tích sử dụng là
            7.200 m2.</p>

        <p>Trung tâm Học liệu có sức chứa 1000 chỗ ngồi, 4 phòng thảo luận nhóm và 1 phòng nghiên cứu sau đại học với 12
            phòng học
            cá nhân phục vụ nghiên cứu độc lập, được trang bị hệ thống điều hòa, mạng internet, wifi, 296 máy vi tính và
            trang thiết
            bị hiện đại đáp ứng nhu cầu nghiên cứu, giảng dạy, học tập tại Trường Đại học Cần Thơ.</p>

        <p>Quá trình hình thành:</p>
        <p>Thư viện Viện Đại học Cần Thơ được thành lập theo Nghị định số 636-GDTN/PC/NĐ ngày 05/4/1969;
            Năm 1991, thư viện là đơn vị trực thuộc Phòng Quản trị theo Quyết định số 263/TCCB ngày 30/7/1991;
            Năm 1992, thư viện thuộc Trung tâm Thông tin – Khoa học và Công nghệ theo Quyết định số 186/TCCB ngày
            17/8/1992;
            Năm 1995, thư viện là đơn vị trực thuộc Ban Giám hiệu trường Đại học Cần Thơ theo Quyết định số
            147/ĐHCT.TCCB.95 ngày
            06/10/1995;
            Đến năm 2006, thư viện được đổi tên thành Trung tâm Học liệu theo Quyết định số 482/QĐ-ĐHCT ngày 16/5/2006.
        </p>
        <h4 class="text-primary">CHỨC NĂNG</h4>
        <hr>
        <p>Trung tâm Học liệu có chức năng và nhiệm vụ quản lý, khai thác, phục vụ và phát triển các nguồn học liệu liên
            quan đến
            hoạt động học thuật, nghiên cứu và quản lý của Trường; hỗ trợ và liên kết hoạt động thư viện với các cơ sở
            giáo dục và
            thư viện các địa phương nhằm phát triển và khai thác nguồn học liệu hiệu quả.</p>
        <h4 class="text-primary">SỨ MỆNH</h4>
        <hr>
        <p>Phát triển nguồn tài nguyên học thuật và cung cấp dịch vụ thư viện có chất lượng, hỗ trợ quá trình giảng dạy,
            học tập và
            nghiên cứu của Đại học Cần Thơ, cộng đồng đại học trong nước và quốc tế.</p>


    </div>
    <!-- End Content -->

    <Footer />
</template>

<script>
import NavBar from '@/components/layouts/NavBar.vue';
import Footer from '@/components/layouts/Footer.vue';
export default {
    components: {
        NavBar,
        Footer,

    },

}
</script>