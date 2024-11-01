<script>
export default {
    props: {
        book: { type: Object, required: true }, // nếu component cha không truyền book, Vue sẽ cảnh báo lỗi
    },
};
</script>
<template>
    <div class="border rounded py-2 px-1 mb-3">
        <div class="p-1 text-center">
            <img :src="book.imgUrl" class="img-card rounded-top" alt="" />
        </div>
        <div class="p-1">
            <strong>Tựa đề:</strong>
            {{ book.title }}
        </div>
        <div class="p-1">
            <strong>Tác giả:</strong>
            {{ book.author }}
        </div>
        <div class="p-1">
            <strong>Thể loại:</strong>
            {{ book.category }}
        </div>
        <div class="p-1">
            <strong>Số lượng:</strong>
            {{ book.quantity }}
        </div>

        <div class="p-1">
            <strong>Nhà xuất bản:</strong>
            {{ book.publisherDetails.name }}
        </div>
        <div class="p-1">
            <strong>Năm xuất bản:</strong>
            {{ book.year }}
        </div>
        <div class="p-1">
            <strong>Giá:</strong>
            {{ book.price }}
        </div>

    </div>
</template>