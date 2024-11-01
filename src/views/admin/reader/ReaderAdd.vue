<template>
    <AdminNavBar />
    <div class="container">
        <h4 class="text-center m-3">Thêm Độc giả</h4>
        <ReaderForm :reader="reader" @submit:reader="createReader" />
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

    data() {
        return {
            reader: {},
            message: "",
        }
    },

    methods: {
        async createReader(data) {
            try {
                await readerService.create(data);
                alert('Độc giả được thêm thành công');
                this.$router.push({ name: "readers" })
            } catch (error) {
                console.log(error)
            }
        }
    }

}

</script>