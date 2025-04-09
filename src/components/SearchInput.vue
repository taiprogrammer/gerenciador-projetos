<script setup lang="ts">
import SearchIcon from '../assets/icons/search.svg'
import ClockBackIcon from '../assets/icons/clock-back.svg'
import CloseIcon from '../assets/icons/close.svg'
</script>
<template>
    <div class="bg-white absolute top-0 left-0 w-full max-h-[20rem] rounded-2xl border-2 border-purple-300">
        <div class="flex items-center gap-4 p-4 text-purple-300">
            <SearchIcon />
            <input type="text" placeholder="Digite o nome do projeto..."
                class="w-full text-purple-900 placeholder:text-gray-400 focus:outline-none">
        </div>
        <ul>
            <li
                class="flex items-center gap-4 justify-between py-4 px-6 border-t-1 border-purple-200 text-gray-300 cursor-pointer">
                <div class="flex items-center gap-4 hover:opacity-60 transition-all duration-200">
                    <ClockBackIcon />
                    <span>Teste</span>
                </div>
                <CloseIcon class="hover:opacity-60 transition-all duration-200"/>
            </li>
            <li
                class="flex items-center gap-4 justify-between py-4 px-6 border-t-1 border-purple-200 text-gray-300 cursor-pointer">
                <div class="flex items-center gap-4 hover:opacity-60 transition-all duration-200">
                    <ClockBackIcon />
                    <span>Teste</span>
                </div>
                <CloseIcon class="hover:opacity-60 transition-all duration-200"/>
            </li>
            <li
                class="flex items-center gap-4 justify-between py-4 px-6 border-t-1 border-purple-200 text-gray-300 cursor-pointer">
                <div class="flex items-center gap-4 hover:opacity-60 transition-all duration-200">
                    <ClockBackIcon />
                    <span>Teste</span>
                </div>
                <CloseIcon class="hover:opacity-60 transition-all duration-200"/>
            </li>
        </ul>
    </div>
</template>