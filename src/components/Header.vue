<script setup lang="ts">
import SearchIcon from '../assets/icons/search.svg'
// import SearchInput from './SearchInput.vue';
</script>
<template>
    <header class="flex items-center justify-center bg-purple-900">
        <div class="flex items-center gap-3">
            <img src="../assets/images/logo.svg" alt="Gerenciador de Projetos Logo">
            <h5 class="text-white">Gerenciador <br> de Projetos</h5>
        </div>
        <span class="absolute end-16 cursor-pointer text-white">
            <SearchIcon />
        </span>
    </header>
    <!-- <SearchInput /> -->
</template>