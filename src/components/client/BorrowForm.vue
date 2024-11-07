<template>
    <Form @submit="submitBorrowBook">
        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label">Tên sách</label>
            <Field type="text" class="form-control" name="title" :value="bookLocal.title" readonly />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label">Họ và tên người mượn</label>
            <Field type="text" class="form-control" name="name" :value="readerLocal.name" readonly />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label">Số điện thoại người mượn</label>
            <Field type="text" class="form-control" name="phone" :value="readerLocal.phone" readonly />
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

export default {
    components: {
        Form,
        Field,
    },
    emits: ["submit:borrow"],
    props: {
        reader: { type: Object, required: true },
        book: { type: Object, required: true },
        borrow: { type: Object, required: true },
    },
    data() {
        return {
            bookLocal: this.book,
            readerLocal: this.reader,
            borrowLocal: this.borrow,
            borrowDate: null,
            dueDate: null,
        };
    },

    created() {
        this.borrowDate = this.getBorrowDate();
        this.dueDate = this.getDueDate();
    },
    methods: {

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
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần +1
            const year = date.getFullYear();
            return `${year}-${month}-${day}`;
        },

        getBorrowBook() {
            this.borrowLocal.bookId = this.bookLocal._id,
                this.borrowLocal.readerId = this.readerLocal._id,
                this.borrowLocal.borrowDate = this.borrowDate,
                this.borrowLocal.dueDate = this.dueDate
        },
        submitBorrowBook() {
            this.getBorrowBook();
            this.$emit("submit:borrow", this.borrowLocal);
        },
    },
}
</script>
