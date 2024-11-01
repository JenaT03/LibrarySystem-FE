<script>
export default {
    props: {
        publisher: { type: Object, required: true }, // nếu component cha không truyền publisher, Vue sẽ cảnh báo lỗi
    },
};
</script>
<template>
    <div class="border rounded py-2 px-1 mb-3">
        <div class="p-1">
            <strong>Tên:</strong>
            {{ publisher.name }}
        </div>
        <div class="p-1">
            <strong>E-mail:</strong>
            {{ publisher.email }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ publisher.address }}
        </div>

    </div>
</template>