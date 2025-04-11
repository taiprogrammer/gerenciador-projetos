<script setup lang="ts">
defineProps({
    imageUrl: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
})
</script>
<template>
    <div class="text-yellow-100" v-if="!imageUrl">
        <div class="relative">
            <div class="w-24 h-16 border-2 border-yellow-100 absolute -top-4 -right-4"></div>
            <div class="w-24 h-16 border-2 border-yellow-100 absolute -top-2 -right-2"></div>
            <div class="w-24 h-16 border-2 border-yellow-100 relative"></div>
        </div>
    </div>
    <div v-else class="relative w-full h-60 overflow-hidden rounded-t-3xl">
        <img :src="imageUrl" :alt="name" class="absolute inset-0 h-full w-full object-cover">
    </div>
</template>