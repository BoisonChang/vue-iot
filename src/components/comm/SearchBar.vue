<template>
    <label class="d-flex px-2 mb-0">
        <i class="fas fa-search p-2 me-4"></i> 
        <input @keyup.enter="handSearch($event)"  type="search" class="form-control form-control-sm">
    </label>
</template>

<script setup>
import { defineEmits } from 'vue'
const emit = defineEmits({      
    getSearch: {
        type: String
    }
})

const handSearch = (e) => {
    emit("getSearch", e.target.value)
}
</script>

<style scoped>  

</style>