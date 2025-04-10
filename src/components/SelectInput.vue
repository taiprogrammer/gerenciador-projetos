<script setup lang="ts">
import { ref } from 'vue';
import ChevronDownIcon from '../assets/icons/chevron-down.svg';

interface Option {
    value: 'Ordem alfabética' | 'Iniciados mais recentes' | 'Prazo mais próximo';
}

const options: Option[] = [
    { value: 'Ordem alfabética' },
    { value: 'Iniciados mais recentes' },
    { value: 'Prazo mais próximo' }
];

const selectedOption = ref('Ordem alfabética');
const isOpen = ref(false);

const selectOption = (option: Option) => {
    selectedOption.value = option.value;
    isOpen.value = false;
    emit('change', option);
};

const close = () => {
    isOpen.value = false;
};

const rootRef = ref<HTMLElement | null>(null)

const emit = defineEmits(['change']);

defineExpose({ rootRef, isOpen, close })
</script>
<template>
    <div class="relative" ref="rootRef">
            <button @click="isOpen = !isOpen"
                class="w-full flex items-center justify-between px-4 py-3 text-lg text-gray-800 bg-white border border-indigo-300 rounded-lg shadow-sm focus:outline-none cursor-pointer">
                <span>{{ selectedOption }}</span>
                <ChevronDownIcon class="transition-transform duration-200" :class="isOpen ? 'rotate-180' : ''" />
            </button>

            <div v-if="isOpen"
                class="absolute z-10 w-full mt-1 bg-white border border-indigo-300 rounded-lg shadow-lg overflow-hidden">
                <div v-for="(option, index) in options" :key="index" @click="selectOption(option)"
                    class="px-4 py-3 text-lg text-gray-800 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-b-0">
                    {{ option.value }}
                </div>
            </div>
        </div>
</template>