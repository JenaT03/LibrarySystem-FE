<script>
export default {
    props: {
        reader: { type: Object, required: true }, // nếu component cha không truyền reader, Vue sẽ cảnh báo lỗi
    },
};
</script>
<template>
    <div class="border rounded py-2 px-1 mb-3">
        <div class="p-1">
            <strong>Họ và Tên:</strong>
            {{ reader.name }}
        </div>
        <div class="p-1">
            <strong>Năm sinh:</strong>
            {{ reader.birth }}
        </div>
        <div class="p-1">
            <strong>Số điện thoại:</strong>
            {{ reader.phone }}
        </div>
        <div class="p-1">
            <strong>Giới tính:</strong>
            {{ reader.gender }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ reader.address }}
        </div>
        <div class="p-1">
            <strong>Trạng thái tài khoản:</strong>
            {{ reader.state }}
        </div>

    </div>
</template>