<template>
    <AdminNavBar />
    <div v-if="publisher" class="page">
        <h4 class="text-center m-3">Hiệu chỉnh Nhà xuất bản</h4>
        <PublisherForm :publisher="publisher" @submit:publisher="updatePublisher" @delete:publisher="deletePublisher" />
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            publisher: null,
            message: "",
        };
    },
    methods: {
        async getPublisher(id) {
            try {

                this.publisher = await publisherService.get(id);
            } catch (error) {
                console.log(error);
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
        async updatePublisher(data) {
            try {
                await publisherService.update(this.publisher._id, data);
                alert('Nhà xuất bản được cập nhật thành công.');
                this.$router.push({ name: "publishers" });
            } catch (error) {
                console.log(error);
            }
        },
        async deletePublisher() {
            if (confirm("Bạn muốn xóa Nhà xuất bản này?")) {
                try {
                    await publisherService.delete(this.publisher._id);
                    this.$router.push({ name: "publishers" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getPublisher(this.$route.params.id);
        this.message = "";
    },
};
</script>