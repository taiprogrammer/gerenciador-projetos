<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue';
import SearchIcon from '../assets/icons/search.svg'
import SearchInput from './SearchInput.vue';

const showSearchInput = ref(false);
const searchInputRef = ref<InstanceType<typeof SearchInput> | null>(null);

const handleClickOutside = (event: MouseEvent) => {
    const root = searchInputRef.value?.rootRef;
    if (root && !root.contains(event.target as Node)) {
        showSearchInput.value = false;
    }
};

const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        showSearchInput.value = false;
    }
};

watch(showSearchInput, async (visible) => {
    if (visible) {
        await nextTick();
        setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
            window.addEventListener('keydown', handleKeyDown);
        });
    } else {
        document.removeEventListener('click', handleClickOutside);
        window.removeEventListener('keydown', handleKeyDown);
    }
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
    window.removeEventListener('keydown', handleKeyDown);
});

</script>
<template>
    <header class="flex items-center justify-center bg-purple-900">
        <div class="flex items-center gap-3">
            <img src="../assets/images/logo.svg" alt="Gerenciador de Projetos Logo">
            <h5 class="text-white">Gerenciador <br> de Projetos</h5>
        </div>
        <span class="absolute end-16 cursor-pointer text-white" @click="showSearchInput = !showSearchInput">
            <SearchIcon />
        </span>
    </header>
    <SearchInput v-show="showSearchInput" ref="searchInputRef" />
</template>