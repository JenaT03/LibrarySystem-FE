import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Contact from "@/views/Contact.vue";
import Introduce from "@/views/Introduce.vue";
import AllBook from "@/views/AllBook.vue";
import Register from "@/views/auth/Register.vue";
import ReaderLogin from "@/views/auth/ReaderLogin.vue";
import BookDetail from "@/views/BookDetail.vue";
import BorrowBook from "@/views/client/BorrowBook.vue";
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
import BorrowHistory from "@/views/client/BorrowHistory.vue";

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
    meta: { requiresStaffAuth: true },
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
    meta: { requiresReaderAuth: true },
  },

  {
    path: "/borrow-history/:id",
    name: "borrowhistory",
    component: BorrowHistory,
    meta: { requiresReaderAuth: true },
  },

  {
    path: "/publishers",
    name: "publishers",
    component: Publishers,
    meta: { requiresStaffAuth: true },
  },
  {
    path: "/publishers/:id",
    name: "publisher.edit",
    component: PublisherEdit,
    meta: { requiresStaffAuth: true },
  },

  {
    path: "/publishers",
    name: "publisher.add",
    component: PublisherAdd,
    meta: { requiresStaffAuth: true },
  },

  {
    path: "/staffs",
    name: "staffs",
    component: Staffs,
    meta: { requiresStaffAuth: true },
  },
  {
    path: "/staffs/:id",
    name: "staff.edit",
    component: StaffEdit,
    meta: { requiresStaffAuth: true },
  },

  {
    path: "/staffs",
    name: "staff.add",
    component: StaffAdd,
    meta: { requiresStaffAuth: true },
  },

  {
    path: "/readers",
    name: "readers",
    component: Readers,
    meta: { requiresStaffAuth: true },
  },
  {
    path: "/readers/:id",
    name: "reader.edit",
    component: ReaderEdit,
    meta: { requiresStaffAuth: true },
  },

  {
    path: "/readers",
    name: "reader.add",
    component: ReaderAdd,
    meta: { requiresStaffAuth: true },
  },

  {
    path: "/books",
    name: "books",
    component: Books,
    meta: { requiresStaffAuth: true },
  },
  {
    path: "/books/:id",
    name: "book.edit",
    component: BookEdit,
    meta: { requiresStaffAuth: true },
  },

  {
    path: "/books",
    name: "book.add",
    component: BookAdd,
    meta: { requiresStaffAuth: true },
  },

  {
    path: "/admin-borrow-book",
    name: "booklistborrow.admin",
    component: () => import("@/views/admin/borrowbook/BookList.vue"),
    meta: { requiresStaffAuth: true },
  },
  {
    path: "/admin-borrow-book/:id",
    name: "borrowbook.admin",
    component: () => import("@/views/admin/borrowbook/Borrow.vue"),
    meta: { requiresStaffAuth: true },
  },
  {
    path: "/admin-borrow-book/pending",
    name: "pendingBorrows",
    component: () => import("@/views/admin/borrowbook/StatePending.vue"),
    meta: { requiresStaffAuth: true },
  },

  {
    path: "/admin-borrow-book/borrowed",
    name: "borrowedBorrows",
    component: () => import("@/views/admin/borrowbook/StateBorrowed.vue"),
    meta: { requiresStaffAuth: true },
  },

  {
    path: "/admin-borrow-book/returned",
    name: "returnedBorrows",
    component: () => import("@/views/admin/borrowbook/StateReturned.vue"),
    meta: { requiresStaffAuth: true },
  },

  {
    path: "/admin-borrow-book/rejected",
    name: "rejectedBorrows",
    component: () => import("@/views/admin/borrowbook/StateRejected.vue"),
    meta: { requiresStaffAuth: true },
  },

  {
    path: "/admin-borrow-book/overdue",
    name: "overdueBorrows",
    component: () => import("@/views/admin/borrowbook/StateOverDue.vue"),
    meta: { requiresStaffAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const reader = JSON.parse(localStorage.getItem("reader"));
  const staff = JSON.parse(localStorage.getItem("staff"));

  if (to.matched.some((record) => record.meta.requiresReaderAuth)) {
    // Nếu route yêu cầu đăng nhập độc giả mà không tìm thấy reader, chuyển đến trang đăng nhập độc giả
    if (!reader) {
      return next({ name: "readerlogin" });
    }
  }

  if (to.matched.some((record) => record.meta.requiresStaffAuth)) {
    // Nếu route yêu cầu đăng nhập nhân viên mà không tìm thấy staff, chuyển đến trang đăng nhập nhân viên
    if (!staff) {
      return next({ name: "stafflogin" });
    }
  }

  next(); // Nếu đã đăng nhập, cho phép tiếp tục
});
export default router;
