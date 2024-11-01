<template>
    <AdminNavBar />
    <div v-if="reader" class="page">
        <h4 class="text-center m-3">Hiệu chỉnh Độc giả</h4>
        <ReaderForm :reader="reader" @submit:reader="updateReader" @delete:reader="deleteReader" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import ReaderForm from "@/components/admin/reader/ReaderForm.vue";
import readerService from "@/services/reader.service";
import AdminNavBar from "@/components/layouts/AdminNavBar.vue";

export default {
    components: {
        ReaderForm,
        AdminNavBar,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            reader: null,
            message: "",
        };
    },
    methods: {
        async getReader(id) {
            try {

                this.reader = await readerService.get(id);
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
        async updateReader(data) {
            try {
                await readerService.update(this.reader._id, data);
                alert('Độc giả được cập nhật thành công.');
                this.$router.push({ name: "readers" });
            } catch (error) {
                console.log(error);
            }
        },
        async deleteReader() {
            if (confirm("Bạn muốn xóa Độc giả này?")) {
                try {
                    await readerService.delete(this.reader._id);
                    this.$router.push({ name: "readers" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getReader(this.$route.params.id);
        this.message = "";
    },
};
</script>