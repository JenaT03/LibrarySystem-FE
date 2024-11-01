<script>
export default {
    props: {
        modelValue: { type: String, default: "" }, // prop nhận dữ liệu từ component cha. Prop này có kiểu dữ liệu là String, và mặc định là một chuỗi rỗng ""
    },
    emits: ["submit", "update:modelValue"], // sự kiện submit và sự kiện update:modelValue 
    methods: {
        updateModelValue(e) {
            this.$emit("update:modelValue", e.target.value); // khi thay đổi value của input nó sẽ emit sự kiện update:modelValue và giá trị e.target.value giúp cập nhật giá trị cho modelValue ở component cha.
        },
        submit() {
            this.$emit("submit");
        },
    },
};
</script>

<template>
    <div class=" offset-sm-3 col-sm-12 mt-4">
        <div class="d-flex ms-5 search-form" role="search">
            <input class="form-control me-2 rounded-pill" type="search" placeholder="Tìm kiếm" aria-label="Search"
                :value="modelValue" @input="updateModelValue" @keyup.enter="submit" />
            <button type=" submit" class="btn btn-primary border-0 border-secondary rounded-pill text-white"
                @click="submit">
                <i class="icon_search fa-solid fa-magnifying-glass"></i>
            </button>
        </div>
    </div>
</template>