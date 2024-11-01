<template>
    <Form @submit="submitReader" :validation-schema="readerFormSchema">
        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label" for="name">Họ và Tên</label>
            <Field name="name" type="text" class="form-control" v-model="readerLocal.name" />
            <ErrorMessage name="name" class="error-feedback text-danger" />
        </div>


        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label" for="phone">Số điện thoại</label>
            <Field name="phone" type="text" class="form-control" v-model="readerLocal.phone" />
            <ErrorMessage name="phone" class="error-feedback text-danger" />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label">Năm sinh</label>
            <Field type="text" class="form-control" name="birth" v-model="readerLocal.birth" />
            <ErrorMessage name="birth" class="text-danger" />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <p class="">Giới tính</p>
            <div class="d-flex">
                <Field name="gender" as="input" type="radio" v-model="readerLocal.gender" :value="'Nam'"
                    class=" me-2 form-check-input" />
                <label class="form-label me-4">Nam</label>
                <Field name="gender" as="input" type="radio" v-model="readerLocal.gender" :value="'Nữ'"
                    class="me-2 form-check-input" />
                <label class="form-label me-4">Nữ</label>
            </div>
            <ErrorMessage name="gender" class="text-danger" />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label" for="address">Địa chỉ</label>
            <Field name="address" type="text" class="form-control" v-model="readerLocal.address" />
            <ErrorMessage name="address" class="error-feedback text-danger" />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label">Đặt mật khẩu</label>
            <Field type="password" class="form-control" name="password" v-model="readerLocal.password" />
            <ErrorMessage name="password" class="text-danger" />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label">Nhập lại mật khẩu</label>
            <Field type="password" class="form-control" name="repassword" />
            <ErrorMessage name="repassword" class="text-danger" />
        </div>

        <div class="col-md-6 offset-md-3 pb-3 my-3">
            <button class="btn btn-primary me-5 text-white">Lưu</button>
            <button v-if="readerLocal._id" type="button" class="ml-2 btn btn-danger me-5"
                @click="deleteReader">Xóa</button>
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

    emits: ["submit:reader", "delete:reader"],
    props: {
        reader: { type: Object, required: true }
    },

    data() {
        const readerFormSchema = yup.object().shape({
            name: yup.string().required("Không được để trống").min(2, "Tên phải ít nhất 2 ký tự.").max(50, "Tên có nhiều nhất 50 ký tự."),
            phone: yup.string().required("Không được để trống").matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không hợp lệ."),
            address: yup.string().required("Địa chỉ không được để trống").max(100, "Địa chỉ tối đa 100 ký tự."),
            gender: yup.string().required("Hãy chọn giới tính"),
            birth: yup.string().required("Năm sinh không được để trống").min(4, "Năm sinh không hợp lệ").max(4, "Năm sinh không hợp lệ"),
            password: yup.string().required("Mật khẩu không được để trống").min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
            repassword: yup.string()
                .oneOf([yup.ref('password')], "Mật khẩu không khớp")
                .required("Vui lòng nhập lại mật khẩu")
        });
        return {
            readerLocal: this.reader,
            readerFormSchema,
        };
    },
    methods: {
        submitReader() {
            this.$emit("submit:reader", this.readerLocal);
        },
        deleteReader() {
            this.$emit("delete:reader", this.readerLocal.id);
        },
        Cancel() {
            const reply = window.confirm('Bạn chưa lưu thay đổi, bạn có muốn rời đi không?')
            if (!reply) {

                return false
            }
            else this.$router.push({ name: "readers" });
        }
    },
};
</script>

<style scoped></style>