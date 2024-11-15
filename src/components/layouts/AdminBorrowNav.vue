<template>
    <div class="row g-0 pt-3 bg-white">
        <router-link :to="{ name: 'booklistborrow.admin' }" class="col-2 text-center py-2 "
            active-class="border-cus fw-bold">MƯỢN
            SÁCH</router-link>
        <router-link :to="{ name: 'pendingBorrows' }" class="col-2 text-center py-2"
            active-class="border-cus fw-bold">ĐANG CHỜ
            DUYỆT</router-link>
        <router-link :to="{ name: 'borrowedBorrows' }" class="col-2 text-center py-2 "
            active-class="border-cus fw-bold">ĐANG
            MƯỢN</router-link>
        <router-link :to="{ name: 'returnedBorrows' }" class="col-2 text-center py-2"
            active-class="border-cus fw-bold">ĐÃ TRẢ</router-link>
        <router-link :to="{ name: 'overdueBorrows' }" class="col-2 text-center py-2"
            active-class="border-cus fw-bold">QUÁ HẠN</router-link>
        <router-link :to="{ name: 'rejectedBorrows' }" class="col-2 text-center py-2"
            active-class="border-cus fw-bold">TỪ CHỐI</router-link>

    </div>
</template>