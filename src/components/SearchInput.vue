<script setup lang="ts">
import SearchIcon from '../assets/icons/search.svg'
import { nextTick, ref, watch } from 'vue'
import { useSearchStore } from '../stores/search'

const rootRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const search = ref('')

const searchStore = useSearchStore()

defineExpose({ rootRef })

watch(search, (value) => {
  searchStore.setTerm(value)
})

const handleAfterEnter = async () => {
  await nextTick()
  inputRef.value?.focus()
}
</script>

<template>
  <transition name="fade-scale" mode="out-in" @after-enter="handleAfterEnter">
    <div class="bg-white absolute top-0 left-0 w-full max-h-[20rem] rounded-2xl border-2 border-purple-300"
      ref="rootRef">
      <div class="flex items-center gap-4 p-4 text-purple-300">
        <SearchIcon />
        <input ref="inputRef" v-model="search" type="text" placeholder="Digite o nome do projeto..."
          class="w-full text-purple-900 placeholder:text-gray-400 focus:outline-none" />
      </div>
    </div>
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