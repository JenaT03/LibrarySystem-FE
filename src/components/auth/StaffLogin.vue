<template>
    <Form @submit="loginStaff" :validation-schema="staffFormSchema">
        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label">Email</label>
            <Field type="text" name="email" class="form-control" v-model="staffLocal.email" />
            <ErrorMessage name="email" class="text-danger" />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label">Mật khẩu</label>
            <Field type="password" name="password" class="form-control" v-model="staffLocal.password" />
            <ErrorMessage name="password" class="text-danger" />
        </div>

        <div class="my-3">
            <button type="submit" name="submit" class="btn btn-primary text-white text-center col-4 offset-4">Đăng
                nhập</button>
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
    emits: ["submit:staff"],
    props: {
        staff: { type: Object, required: true }
    },
    data() {
        const staffFormSchema = yup.object().shape({
            email: yup.string().required("Email thoại không được để trống"),
            password: yup.string().required("Mật khẩu không được để trống"),
        });
        return {
            staffLocal: { ...this.staff },
            staffFormSchema,
        };
    },
    methods: {
        loginStaff() {
            this.$emit("submit:staff", this.staffLocal);
        },
    },
}
</script>
