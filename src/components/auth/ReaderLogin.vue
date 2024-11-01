<template>
    <Form @submit="loginReader" :validation-schema="readerFormSchema">
        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label">Số điện thoại</label>
            <Field type="text" name="phone" class="form-control" v-model="readerLocal.phone" />
            <ErrorMessage name="phone" class="text-danger" />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label">Mật khẩu</label>
            <Field type="password" name="password" class="form-control" v-model="readerLocal.password" />
            <ErrorMessage name="password" class="text-danger" />
        </div>

        <div class="my-3">
            <button type="submit" name="submit" class="btn btn-primary text-white text-center col-4 offset-4">Đăng
                nhập</button>
        </div>

        <div class="text-center">
            <p>Nếu chưa có tài khoản? Hãy <router-link :to="{ name: 'register' }"> Đăng ký</router-link></p>
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
    emits: ["submit:reader"],
    props: {
        reader: { type: Object, required: true }
    },
    data() {
        const readerFormSchema = yup.object().shape({
            phone: yup.string().required("Số điện thoại không được để trống"),
            password: yup.string().required("Mật khẩu không được để trống"),
        });
        return {
            readerLocal: { ...this.reader },
            readerFormSchema,
        };
    },
    methods: {
        loginReader() {
            this.$emit("submit:reader", this.readerLocal);
        },
    },
}
</script>
