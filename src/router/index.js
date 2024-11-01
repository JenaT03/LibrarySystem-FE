import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Contact from "@/views/Contact.vue";
import Introduce from "@/views/Introduce.vue";
import AllBook from "@/views/AllBook.vue";
import Register from "@/views/auth/Register.vue";
import ReaderLogin from "@/views/auth/ReaderLogin.vue";
import BookDetail from "@/views/BookDetail.vue";
import BorrowBook from "@/views/BorrowBook.vue";
import StaffLogin from "@/views/auth/StaffLogin.vue";
import DashBoard from "@/views/admin/DashBoard.vue";
import PublisherAdd from "@/views/admin/publisher/PublisherAdd.vue";
import PublisherEdit from "@/views/admin/publisher/PublisherEdit.vue";
import Publishers from "@/views/admin/publisher/Publishers.vue";
import Staffs from "@/views/admin/staff/Staffs.vue";
import StaffAdd from "@/views/admin/staff/StaffAdd.vue";
import StaffEdit from "@/views/admin/staff/StaffEdit.vue";
import ReaderAdd from "@/views/admin/reader/ReaderAdd.vue";
import ReaderEdit from "@/views/admin/reader/ReaderEdit.vue";
import Readers from "@/views/admin/reader/Readers.vue";
import Books from "@/views/admin/book/Books.vue";
import BookAdd from "@/views/admin/book/BookAdd.vue";
import BookEdit from "@/views/admin/book/BookEdit.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },

  {
    path: "/dashboard",
    name: "dashboard",
    component: DashBoard,
  },

  {
    path: "/:pathMatch(.*)*", //pathMatch(.*)* sử dụng cú pháp của vue-router để khớp mọi đường dẫn không xác định,
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },

  {
    path: "/allbook",
    name: "allbook",
    component: AllBook,
  },

  {
    path: "/contact",
    name: "contact",
    component: Contact,
  },

  {
    path: "/introduce",
    name: "introduce",
    component: Introduce,
  },

  {
    path: "/register",
    name: "register",
    component: Register,
  },

  {
    path: "/reader-login",
    name: "readerlogin",
    component: ReaderLogin,
  },

  {
    path: "/staff-login",
    name: "stafflogin",
    component: StaffLogin,
  },

  {
    path: "/book-detail/:id",
    name: "bookdetail",
    component: BookDetail,
  },

  {
    path: "/borrow-book/:id",
    name: "borrowbook",
    component: BorrowBook,
  },

  {
    path: "/publishers",
    name: "publishers",
    component: Publishers,
  },
  {
    path: "/publishers/:id",
    name: "publisher.edit",
    component: PublisherEdit,
  },

  {
    path: "/publishers",
    name: "publisher.add",
    component: PublisherAdd,
  },

  {
    path: "/staffs",
    name: "staffs",
    component: Staffs,
  },
  {
    path: "/staffs/:id",
    name: "staff.edit",
    component: StaffEdit,
  },

  {
    path: "/staffs",
    name: "staff.add",
    component: StaffAdd,
  },

  {
    path: "/readers",
    name: "readers",
    component: Readers,
  },
  {
    path: "/readers/:id",
    name: "reader.edit",
    component: ReaderEdit,
  },

  {
    path: "/readers",
    name: "reader.add",
    component: ReaderAdd,
  },

  {
    path: "/books",
    name: "books",
    component: Books,
  },
  {
    path: "/books/:id",
    name: "book.edit",
    component: BookEdit,
  },

  {
    path: "/books",
    name: "book.add",
    component: BookAdd,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("reader"); // Kiểm tra trạng thái đăng nhập

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    // Nếu route yêu cầu xác thực và người dùng chưa đăng nhập, chuyển hướng đến trang login
    next({ name: "readerLogin" });
  } else {
    next(); // Cho phép truy cập nếu đã đăng nhập hoặc không yêu cầu xác thực
  }
});
export default router;
