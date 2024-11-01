<script>
export default {
    props: {
        staff: { type: Object, required: true }, // nếu component cha không truyền staff, Vue sẽ cảnh báo lỗi
    },
};
</script>
<template>
    <div class="border rounded py-2 px-1 mb-3">
        <div class="p-1">
            <strong>Họ và Tên:</strong>
            {{ staff.name }}
        </div>
        <div class="p-1">
            <strong>Năm sinh:</strong>
            {{ staff.birth }}
        </div>
        <div class="p-1">
            <strong>E-mail:</strong>
            {{ staff.email }}
        </div>
        <div class="p-1">
            <strong>Số điện thoại:</strong>
            {{ staff.phone }}
        </div>
        <div class="p-1">
            <strong>Giới tính:</strong>
            {{ staff.gender }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ staff.address }}
        </div>
        <div class="p-1">
            <strong>Chức vụ:</strong>
            {{ staff.position }}
        </div>

    </div>
</template>