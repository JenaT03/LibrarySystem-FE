<template>
    <Form @submit="submitBook" :validation-schema="bookFormSchema">
        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label" for="title">Tựa sách</label>
            <Field name="title" type="text" class="form-control" v-model="bookLocal.title" />
            <ErrorMessage name="title" class="error-feedback text-danger" />
        </div>


        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label" for="author">Tác giả</label>
            <Field name="author" type="text" class="form-control" v-model="bookLocal.author" />
            <ErrorMessage name="author" class="error-feedback text-danger" />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label">Thể loại</label>
            <Field type="text" class="form-control" name="category" v-model="bookLocal.category" />
            <ErrorMessage name="category" class="text-danger" />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label">Số lượng</label>
            <Field type="number" class="form-control" name="quantity" v-model="bookLocal.quantity" />
            <ErrorMessage name="quantity" class="text-danger" />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <p class="">Nhà xuất bản</p>
            <select v-if="bookLocal._id" name="publisherId" class="form-control bg-white"
                v-model="bookLocal.publisherDetails._id">
                <option v-for="publisher in publishers" :key="publisher._id" :value="publisher._id">{{ publisher.name }}
                </option>
            </select>
            <select v-else name="publisherId" class="form-control bg-white" v-model="bookLocal.publisherId">
                <option v-for="publisher in publishers" :key="publisher._id" :value="publisher._id">{{ publisher.name }}
                </option>
            </select>
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label">Năm xuất bản</label>
            <Field type="text" class="form-control" name="year" v-model="bookLocal.year" />
            <ErrorMessage name="year" class="text-danger" />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label">Giá</label>
            <Field type="number" class="form-control" name="price" v-model="bookLocal.price" />
            <ErrorMessage name="price" class="text-danger" />
        </div>

        <div class="form-item col-md-6 offset-md-3 pb-3 my-3">
            <label class="form-label">Ảnh bìa</label>
            <Field type="file" accept="image/*" class="form-control" name="img" @change="handleFileChange" />
            <ErrorMessage name="img" class="text-danger" />
            <span v-if="isHasImg" class="text-warning">Hãy chọn ảnh bìa</span>

            <div v-if="bookLocal.img && typeof bookLocal.img === 'string'" class="mt-3">
                <img :src="bookLocal.imgUrl" alt="Hình ảnh" style="width: 100px; height: auto;">
            </div>

        </div>
        <div class="col-md-6 offset-md-3 pb-3 my-3">
            <button class="btn btn-primary me-5 text-white">Lưu</button>
            <button v-if="bookLocal._id" type="button" class="ml-2 btn btn-danger me-5" @click="deleteBook">Xóa</button>
            <button type="button" class="ml-2 btn btn-danger" @click="Cancel">
                Thoát
            </button>
        </div>
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import publisherService from "@/services/publisher.service";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },

    emits: ["submit:book", "delete:book"],
    props: {
        book: { type: Object, required: true },

    },
    data() {
        const bookFormSchema = yup.object().shape({
            title: yup.string().required("Không được để trống").max(100, "Tên có nhiều nhất 100 ký tự."),
            author: yup.string().required("Không được để trống").max(50, "Tên tác giả có nhiều nhất 50 ký tự."),
            category: yup.string().required("Không được để trống").max(50, "Thể loại có nhiều nhất 50 ký tự."),
            quantity: yup.number().nullable().required("Không được để trống").min(1, "Số lượng phải lớn hơn 0"),
            year: yup.string().required("Năm xuất bản không được để trống").min(4, "Năm xuất bản không hợp lệ").max(4, "Năm xuất bản không hợp lệ"),
            price: yup.number().nullable().required("Không được để trống").min(0, "Giá phải là sô dương"),
            img: yup
                .mixed()
                .test("fileType", "Chỉ chấp nhận ảnh", (value) => {
                    // Kiểm tra loại file là ảnh
                    return !value || (value && value.type && value.type.startsWith("image/"));
                }),

        });
        return {
            bookLocal: this.book,
            bookFormSchema,
            publishers: [],
        };
    },

    computed: {
        // Hàm kiểm tra xem img đã được chọn hay chưa
        isHasImg() {
            return !this.bookLocal.img; // Trả về true nếu img chưa có (bắt buộc), ngược lại là false
        },
    },

    methods: {

        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.bookLocal.img = file; // Cập nhật giá trị ảnh bìa
            }
        },

        async retrievePublishers() {
            try {
                this.publishers = await publisherService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        submitBook() {
            this.$emit("submit:book", this.bookLocal);
        },
        deleteBook() {
            this.$emit("delete:book", this.bookLocal.id);
        },
        Cancel() {
            const reply = window.confirm('Bạn chưa lưu thay đổi, bạn có muốn rời đi không?')
            if (!reply) {

                return false
            }
            else this.$router.push({ name: "books" });
        }
    },

    created() {
        this.retrievePublishers();
    }
};
</script>
