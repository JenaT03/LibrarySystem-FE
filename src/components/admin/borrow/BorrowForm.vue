<template>
    <Form @submit="submitBorrowBook" :validation-schema="borrowFormSchema">
        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label">Tên sách</label>
            <Field type="text" class="form-control" name="title" :value="bookLocal.title" readonly />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label">Số điện thoại người mượn</label>
            <Field type="text" class="form-control" name="phone" v-model="phone" />
            <p class="text-danger" v-if="message">{{ message }}</p>
            <ErrorMessage name="phone" class="text-danger" />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3" v-if="filteredReader">
            <label class="form-label">Họ và tên người mượn</label>
            <Field type="text" class="form-control" name="name" :value="filteredReader.name" readonly />


        </div>


        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label">Ngày mượn</label>
            <Field type="text" class="form-control" name="borrowDate" :value="borrowDate" readonly />
        </div>
        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label">Ngày trả</label>
            <Field type="text" class="form-control" name="dueDate" :value="dueDate" readonly />
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
import readerService from "@/services/reader.service";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:borrow"],
    props: {
        book: { type: Object, required: true },
        borrow: { type: Object, required: true },
    },
    data() {
        const borrowFormSchema = yup.object().shape({
            phone: yup.string().required("Không được để trống").max(10, "Tối đa 10 chữ số").min(10, "Tối thiểu 10 chữ số"),
        });
        return {
            borrowFormSchema,
            bookLocal: this.book,
            borrowLocal: this.borrow,
            borrowDate: null,
            dueDate: null,
            reader: null,
            phone: "",
            message: ""
        };
    },

    created() {
        this.borrowDate = this.getBorrowDate();
        this.dueDate = this.getDueDate();
    },


    computed: {
        filteredReader() {
            return this.reader;
        }
    },

    watch: {
        phone(newPhone) {
            if (newPhone.length === 10) {
                this.findReader();
            } else {
                this.reader = null;
            }
        }
    },
    methods: {


        async findReader() {
            try {
                const response = await readerService.getByPhone(this.phone);
                if (!response || response.length === 0) {
                    this.message = "Không tìm thấy độc giả có số điện thoại này";
                } else {
                    this.message = "";
                    this.reader = response[0];
                }
            } catch (error) {
                console.log(error);
                this.message = "Có lỗi xảy ra khi tìm kiếm độc giả.";
            }
        },

        getBorrowDate() {
            const today = new Date();
            return this.formatDate(today);
        },

        getDueDate() {
            const today = new Date();
            const dueDate = new Date(today.setDate(today.getDate() + 10));
            return this.formatDate(dueDate);
        },

        formatDate(date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${year}-${month}-${day}`;
        },

        getBorrowBook() {

            this.borrowLocal.bookId = this.bookLocal._id;
            this.borrowLocal.readerId = this.reader ? this.reader._id : null;
            this.borrowLocal.borrowDate = this.borrowDate;
            this.borrowLocal.dueDate = this.dueDate;
        },

        submitBorrowBook() {
            this.getBorrowBook();
            this.$emit("submit:borrow", this.borrowLocal);
        },
    },
};
</script>
