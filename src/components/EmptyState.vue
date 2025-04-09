<script setup lang="ts">
import PlusIcon from '../assets/icons/plus.svg'
</script>
<template>
    <main class="bg-white my-[3.75rem] mx-[2.625rem] flex flex-col items-center justify-center gap-6 flex-1 rounded-[0.25rem] p-6 text-center">
        <h4 class="text-purple-700 text-2xl font-semibold">Nenhum projeto</h4>
        <p class="text-gray-300 font-normal">Clique no botão abaixo para criar o primeiro e gerenciá-lo.</p>
        <button class="flex gap-4 items-center text-white bg-purple-300 py-[0.9375rem] px-8 rounded-[1.625rem] cursor-pointer hover:opacity-90 transition-all duration-200">
            <PlusIcon />
            <span>Novo projeto</span>
        </button>
    </main>
</template>