<template>
    <AdminNavBar />
    <div class="container-fluid featurs mt-4">
        <div class="container py-2">
            <div class="row d-flex justify-content-around mb-4">
                <router-link :to="{ name: 'booklistborrow.admin' }" href="#" class="btn btn-primary col-6 py-4 mb-3">
                    <p class="text-white ms-4 mb-0 text-center" style="font-size: 1.25rem;">Mượn sách</p>
                </router-link>
            </div>

            <div class="row d-flex justify-content-around mb-4">
                <router-link :to="{ name: 'books' }" class="btn btn-primary col-5 py-3">
                    <p class="text-white ms-4 mb-0 text-center" style="font-size: 1.25rem;">Sách</p>
                </router-link>

                <router-link :to="{ name: 'publishers' }" href="#" class="btn btn-primary col-5 py-3">
                    <p class="text-white ms-4 mb-0 text-center" style="font-size: 1.25rem;">Nhà xuất bản</p>
                </router-link>


            </div>

            <div class="row d-flex justify-content-around mb-4">
                <router-link :to="{ name: 'staffs' }" class="btn btn-primary col-5 py-3">
                    <p class="text-white ms-4 mb-0 text-center" style="font-size: 1.25rem;">Nhân viên</p>
                </router-link>
                <router-link :to="{ name: 'readers' }" href="#" class="btn btn-primary col-5 py-3">
                    <p class="text-white ms-4 mb-0 text-center" style="font-size: 1.25rem;">Độc giả</p>
                </router-link>


            </div>


        </div>
    </div>


</template>

<script>
import AdminNavBar from '@/components/layouts/AdminNavBar.vue';
export default {
    components: {
        AdminNavBar,
    },
    created() {
        const staff = JSON.parse(localStorage.getItem('staff'));
        if (!staff) {
            this.$router.push({ name: 'staffLogin' });
        }
    }
}
</script>
