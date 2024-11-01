<template>
    <div class="container-fluid page-header-login-register" style="padding: 1rem 0 1rem 0;">

        <h1 class="text-center text-white display-5">Quản lý</h1>
        <div class="d-flex justify-content-between">
            <router-link :to="{ name: 'dashboard' }"><i
                    class="fa-solid fa-house text-white rounded-circle ms-5 back-icon"></i></router-link>
            <div class=" text-end me-5">
                <a class=" text-white dropdown-toggle fs-5 " role="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="fa-regular fa-user" style="margin-right: 10px;"></i>
                    {{ staffName }}</a>
                <ul class="dropdown-menu fs-5 text-center">
                    <li><a lass="dropdown-item" @click="logout">Đăng xuất</a></li>

                </ul>
            </div>
        </div>

    </div>

</template>

<script>
export default {
    data() {
        return {
            staffName: null,
        };
    },
    created() {
        const staff = JSON.parse(localStorage.getItem('staff'));
        if (staff && staff.name) {
            this.staffName = staff.name;
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('staff');
            this.staffName = null;
            this.$router.push({ name: 'home' });
        }
    }
}
</script>