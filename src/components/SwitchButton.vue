<script setup lang="ts">
import { ref } from 'vue';

const isFavoriteOnly = ref(false);

const toggleFavorites = () => {
    isFavoriteOnly.value = !isFavoriteOnly.value;
    emit('update:modelValue', isFavoriteOnly.value);
};

const emit = defineEmits(['update:modelValue']);
</script>
<template>
    <div class="flex items-center cursor-pointer select-none" @click="toggleFavorites">
        <div class="relative w-[50px] h-[26px] rounded-full p-[2px] flex items-center transition-colors duration-300"
            :class="isFavoriteOnly ? 'bg-yellow-500' : 'bg-gray-350'">
            <div class="absolute w-[20px] h-[20px] rounded-full transition-all duration-300" :class="isFavoriteOnly
                ? 'left-[calc(100%-22px)] bg-white'
                : 'left-[2px] bg-white'"></div>
        </div>
    </div>
</template>