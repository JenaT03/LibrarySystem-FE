<template>
    <AdminNavBar />
    <div class="container">
        <h4 class="text-center m-3">Thêm nhà xuất bản</h4>
        <PublisherForm :publisher="publisher" @submit:publisher="createPublisher" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import PublisherForm from "@/components/admin/publisher/PublisherForm.vue";
import publisherService from "@/services/publisher.service";
import AdminNavBar from "@/components/layouts/AdminNavBar.vue";
export default {
    components: {
        PublisherForm,
        AdminNavBar,
    },

    data() {
        return {
            publisher: {},
            message: "",
        }
    },

    methods: {
        async createPublisher(data) {
            try {
                await publisherService.create(data);
                alert('Nhà xuất bản được thêm thành công');
                this.$router.push({ name: "publishers" })
            } catch (error) {
                console.log(error)
            }
        }
    }

}

</script>