<template>
    <Form @submit="submitStaff" :validation-schema="staffFormSchema">
        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label" for="name">Họ và Tên</label>
            <Field name="name" type="text" class="form-control" v-model="staffLocal.name" />
            <ErrorMessage name="name" class="error-feedback text-danger" />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label" for="email">E-mail</label>
            <Field name="email" type="text" class="form-control" v-model="staffLocal.email" />
            <ErrorMessage name="email" class="error-feedback text-danger" />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label" for="phone">Số điện thoại</label>
            <Field name="phone" type="text" class="form-control" v-model="staffLocal.phone" />
            <ErrorMessage name="phone" class="error-feedback text-danger" />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label">Năm sinh</label>
            <Field type="text" class="form-control" name="birth" v-model="staffLocal.birth" />
            <ErrorMessage name="birth" class="text-danger" />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <p class="">Giới tính</p>
            <div class="d-flex">
                <Field name="gender" as="input" type="radio" v-model="staffLocal.gender" :value="'Nam'"
                    class=" me-2 form-check-input" />
                <label class="form-label me-4">Nam</label>
                <Field name="gender" as="input" type="radio" v-model="staffLocal.gender" :value="'Nữ'"
                    class="me-2 form-check-input" />
                <label class="form-label me-4">Nữ</label>
            </div>
            <ErrorMessage name="gender" class="text-danger" />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label" for="address">Địa chỉ</label>
            <Field name="address" type="text" class="form-control" v-model="staffLocal.address" />
            <ErrorMessage name="address" class="error-feedback text-danger" />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label" for="position">Chức vụ</label>
            <Field name="position" type="text" class="form-control" v-model="staffLocal.position" />
            <ErrorMessage name="position" class="error-feedback text-danger" />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label">Đặt mật khẩu</label>
            <Field type="password" class="form-control" name="password" v-model="staffLocal.password" />
            <ErrorMessage name="password" class="text-danger" />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label">Nhập lại mật khẩu</label>
            <Field type="password" class="form-control" name="repassword" />
            <ErrorMessage name="repassword" class="text-danger" />
        </div>

        <div class="col-md-6 offset-md-3 pb-3 my-3">
            <button class="btn btn-primary me-5 text-white">Lưu</button>
            <button v-if="staffLocal._id" type="button" class="ml-2 btn btn-danger me-5"
                @click="deleteStaff">Xóa</button>
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

    emits: ["submit:staff", "delete:staff"],
    props: {
        staff: { type: Object, required: true }
    },

    data() {
        const staffFormSchema = yup.object().shape({
            name: yup.string().required("Không được để trống").min(2, "Tên phải ít nhất 2 ký tự.").max(50, "Tên có nhiều nhất 50 ký tự."),
            email: yup.string().required("Email không được để trống").email("E-mail không đúng.").max(50, "E-mail tối đa 50 ký tự."),
            phone: yup.string().required("Không được để trống").matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không hợp lệ."),
            address: yup.string().required("Địa chỉ không được để trống").max(100, "Địa chỉ tối đa 100 ký tự."),
            gender: yup.string().required("Hãy chọn giới tính"),
            position: yup.string().required("Chức vụ không được để trống"),
            birth: yup.string().required("Năm sinh không được để trống").min(4, "Năm sinh không hợp lệ").max(4, "Năm sinh không hợp lệ"),
            password: yup.string().required("Mật khẩu không được để trống").min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
            repassword: yup.string()
                .oneOf([yup.ref('password')], "Mật khẩu không khớp")
                .required("Vui lòng nhập lại mật khẩu")
        });
        return {
            staffLocal: this.staff,
            staffFormSchema,
        };
    },
    methods: {
        submitStaff() {
            this.$emit("submit:staff", this.staffLocal);
        },
        deleteStaff() {
            this.$emit("delete:staff", this.staffLocal.id);
        },
        Cancel() {
            const reply = window.confirm('Bạn chưa lưu thay đổi, bạn có muốn rời đi không?')
            if (!reply) {

                return false
            }
            else this.$router.push({ name: "staffs" });
        }
    },
};
</script>

<style scoped></style>