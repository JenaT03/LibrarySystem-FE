<template>
    <Form @submit="submitPublisher" :validation-schema="publisherFormSchema">
        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label" for="name">Tên</label>
            <Field name="name" type="text" class="form-control" v-model="publisherLocal.name" />
            <ErrorMessage name="name" class="error-feedback text-danger" />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label" for="email">E-mail</label>
            <Field name="email" type="email" class="form-control" v-model="publisherLocal.email" />
            <ErrorMessage name="email" class="error-feedback text-danger" />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label" for="address">Địa chỉ</label>
            <Field name="address" type="text" class="form-control" v-model="publisherLocal.address" />
            <ErrorMessage name="address" class="error-feedback text-danger" />
        </div>

        <div class="col-md-6 offset-md-3 pb-3 my-3">
            <button class="btn btn-primary me-5 text-white">Lưu</button>
            <button v-if="publisherLocal._id" type="button" class="ml-2 btn btn-danger me-5"
                @click="deletePublisher">Xóa</button>
            <button type="button" class="ml-2 btn btn-danger" @click="Cancel">
                Thoát
            </button>
        </div>
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },

    emits: ["submit:publisher", "delete:publisher"],
    props: {
        publisher: { type: Object, required: true }
    },

    data() {
        const publisherFormSchema = yup.object().shape({
            name: yup.string().required("Không được để trống").min(2, "Tên phải ít nhất 2 ký tự.").max(50, "Tên có nhiều nhất 50 ký tự."),
            email: yup.string().email("E-mail không đúng.").max(50, "E-mail tối đa 50 ký tự."),
            address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
        });
        return {
            publisherLocal: this.publisher,
            publisherFormSchema,
        };
    },
    methods: {
        submitPublisher() {
            this.$emit("submit:publisher", this.publisherLocal);
        },
        deletePublisher() {
            this.$emit("delete:publisher", this.publisherLocal.id);
        },
        Cancel() {
            const reply = window.confirm('Bạn chưa lưu thay đổi, bạn có muốn rời đi không?')
            if (!reply) {

                return false
            }
            else this.$router.push({ name: "publishers" });
        }
    },
};
</script>

<style scoped></style>