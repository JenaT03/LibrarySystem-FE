<template>
    <Form @submit="submitBorrowBook" :validation-schema="borrowFormSchema" :validate-on-mount="false">
        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label">Tên sách</label>
            <Field type="text" class="form-control" name="title" v-model="borrowLocal.title" />
            <ErrorMessage name="title" class="text-danger" />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label">Họ và tên người mượn</label>
            <Field type="text" class="form-control" name="name" v-model="borrowLocal.name" />
            <ErrorMessage name="name" class="text-danger" />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label">Số điện thoại người mượn</label>
            <Field type="text" class="form-control" name="phone" v-model="borrowLocal.phone" />
            <ErrorMessage name="phone" class="text-danger" />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label">Ngày mượn</label>
            <Field type="date" class="form-control" name="borrowDate" v-model="borrowLocal.borrowDate" />
            <ErrorMessage name="borrowDate" class="text-danger" />
        </div>



        <div class="my-3 mx-4 d-flex justify-content-center">
            <button class="btn btn-primary text-white text-center"
                style="padding: 15px 45px; font-size: 1.25rem;">Mượn</button>
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
    emits: ["submit:borrow"],
    props: {
        borrow: { type: Object, required: true }
    },
    data() {
        const readerFormSchema = yup.object().shape({
            title: yup.string().required("Không được để trống"),
            name: yup.string().required("Không được để trống"),
            phone: yup.string().required("Không được để trống").matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không hợp lệ."),
            borrowDate: yup.date().required("Không được để trống"),
        });
        return {
            borrowLocal: this.borrow,
            borrowFormSchema,
        };
    },
    methods: {
        submitBorrow() {
            this.$emit("submit:borrow", this.borrowLocal);
        },
    },
}
</script>
