<script>
export default {
    props: {
        borrow: { type: Object, required: true }, // nếu component cha không truyền book, Vue sẽ cảnh báo lỗi
    },
};
</script>
<template>
    <div class="border rounded py-2 px-1 mb-3">
        <div class="p-1">
            <strong>Tựa đề:</strong>
            {{ borrow.bookDetails.title }}
        </div>
        <div class="p-1">
            <strong>Tác giả:</strong>
            {{ borrow.bookDetails.author }}
        </div>
        <div class="p-1">
            <strong>Thể loại:</strong>
            {{ borrow.bookDetails.category }}
        </div>
        <div v-if="borrow.readerDetails" class="p-1">
            <strong>Tên người mượn:</strong>
            {{ borrow.readerDetails.name }}
        </div>

        <div v-if="borrow.readerDetails" class="p-1">
            <strong>Số điện thoại người mượn:</strong>
            {{ borrow.readerDetails.phone }}
        </div>

        <div v-if="borrow.staffDetails" class="p-1">
            <strong>Nhân viên xét duyệt:</strong>
            {{ `${borrow.staffDetails.name} - ${borrow.staffDetails.phone}` }}
        </div>

        <div class="p-1">
            <strong>Ngày mượn:</strong>
            {{ borrow.borrowDate }}
        </div>

        <div class="p-1">
            <strong>Ngày trả:</strong>
            {{ borrow.dueDate }}
        </div>

        <div class="p-1">
            <strong>Trạng thái phiếu mượn:</strong>
            {{ borrow.state }}
        </div>

    </div>
</template>