<script>
export default {
    data() {
        return {
            readerName: null,
        };
    },
    created() {
        const reader = JSON.parse(localStorage.getItem('reader'));
        if (reader && reader.name) {
            this.readerName = reader.name;
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('reader');
            this.readerName = null;
            this.$router.push({ name: 'home' });
        }
    }
};
</script>

<template>
    <div class="container-fluid fixed-top box-shadow-bottom">
        <div class="container px-0">
            <nav class="navbar-light bg-white navbar-expand-xl">
                <div class="d-flex">
                    <router-link :to="{ name: 'home' }" class="navbar-brand d-flex align-items-center">
                        <img src="@/assets/images/logo.png" alt="logo" class="logo me-2" />
                        <div class="text-center">
                            <h5 class="text-primary display-7 m-0">Thư viện</h5>
                            <h1 class="text-primary display-6">BEE</h1>
                        </div>
                    </router-link>
                </div>

                <div class="collapse navbar-collapse bg-white" id="navbarCollapse">
                    <div class="navbar-nav mx-auto justify-content-around">
                        <router-link :to="{ name: 'home' }" class="nav-item nav-link" active-class="active"><i
                                class="fa-solid fa-house"></i></router-link>
                        <router-link :to="{ name: 'allbook' }" class="nav-item nav-link ms-5" active-class="active">Tất
                            cả sách</router-link>
                        <router-link :to="{ name: 'introduce' }" class="nav-item nav-link ms-5"
                            active-class="active">Giới thiệu</router-link>
                        <router-link :to="{ name: 'contact' }" class="nav-item nav-link ms-5" active-class="active">Liên
                            hệ</router-link>
                    </div>

                    <!-- Nếu reader đã đăng nhập, hiển thị tên và tùy chọn đăng xuất -->
                    <div v-if="readerName" class="d-flex m-3 me-0">
                        <a class="text-primary dropdown-toggle fs-5" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <i class="fa-regular fa-user" style="margin-right: 10px;"></i>{{ readerName }}
                        </a>
                        <ul class="dropdown-menu text-center">
                            <li><a class="dropdown-item" @click="logout">Đăng xuất</a></li>
                        </ul>
                    </div>

                    <!-- Nếu reader chưa đăng nhập, hiển thị tùy chọn đăng nhập và đăng ký -->
                    <div v-else class="d-flex m-3 me-0">
                        <a class="text-primary dropdown-toggle fs-5" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <i class="fa-regular fa-user" style="margin-right: 10px;"></i>Tài khoản
                        </a>
                        <ul class="dropdown-menu text-center">
                            <li><router-link class="dropdown-item" :to="{ name: 'readerlogin' }">Đăng nhập tài khoản độc
                                    giả</router-link></li>
                            <li><router-link class="dropdown-item" :to="{ name: 'stafflogin' }">Đăng nhập tài khoản nhân
                                    viên</router-link></li>
                            <li><router-link class="dropdown-item" :to="{ name: 'register' }">Đăng ký</router-link></li>
                        </ul>
                    </div>
                </div>
                <button class="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse">
                    <span class="fa fa-bars text-primary"></span>
                </button>
            </nav>
        </div>
    </div>
</template>
