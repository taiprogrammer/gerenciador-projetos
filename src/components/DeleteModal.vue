<script setup lang="ts">
import { ref } from 'vue';
import TrashIcon from '../assets/icons/trash.svg'

defineProps({
    name: {
        type: String,
        required: true
    }
})

const isOpen = ref(false);

const close = () => {
    isOpen.value = false;
    document.body.classList.add('overflow-hidden')
};

defineExpose({
    open() {
        isOpen.value = true;
        document.body.classList.add('overflow-hidden')
    },
    close
});

function deleteProjectConfirm() {
    emit('deleteProjectConfirm');
}

const emit = defineEmits(['deleteProjectConfirm']);
</script>
<template>
    <transition name="fade-scale" mode="out-in">
        <main v-show="isOpen"
            class="z-20 h-screen w-full bg-[#181818E5] backdrop-blur-[0.3125rem] fixed top-0 left-0 flex items-center justify-center">
            <div class="bg-white rounded-lg p-8 flex items-center justify-center flex-col">
                <div class="bg-purple-300 p-5 rounded-full text-white mt-[-55px]">
                    <TrashIcon />
                </div>
                <div class="flex flex-col items-center justify-center">
                    <h4 class="text-purple-700 text-2xl font-semibold">Remover projeto</h4>
                    <hr class="bg-gray-400 mt-6 w-full">
                    <p class="text-gray-300 mt-8">Essa ação removerá definitivamente o projeto:</p>
                    <h3 class="text-purple-900 text-2xl font-medium mt-3">{{ name }}</h3>
                    <div class="mt-8 flex items-center gap-8">
                        <button @click="close"
                            class="text-purple-300 border-1 border-purple-300 py-3.5 px-14 rounded-3xl cursor-pointer hover:opacity-85 transition-all duration-200">Cancelar</button>
                        <button @click="deleteProjectConfirm"
                            class="bg-purple-300 text-white py-3.5 px-14 rounded-3xl cursor-pointer hover:opacity-85 transition-all duration-200">Confirmar</button>
                    </div>
                </div>
            </div>
        </main>
    </transition>
</template>
<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
    transition: all 0.2s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

.fade-scale-enter-to,
.fade-scale-leave-from {
    opacity: 1;
    transform: scale(1);
}
</style>