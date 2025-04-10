<script setup lang="ts">
import SelectInput from './SelectInput.vue';
import SwitchButton from './SwitchButton.vue';
import PlusIcon from '../assets/icons/plus.svg';
import { nextTick, onBeforeUnmount, onMounted, ref, computed } from 'vue';
import ProjectCard from './ProjectCard.vue';
import DeleteModal from './DeleteModal.vue';
import { useSearchStore } from '../stores/search';

const selectInputRef = ref<InstanceType<typeof SelectInput> | null>(null)
const deleteModalRef = ref<InstanceType<typeof DeleteModal> | null>(null)

const projects = ref([
  { id: 1, title: 'Projeto 01', client: 'Clicksign', start: '01 de setembro de 2024', end: '12 de dezembro de 2024' },
  { id: 2, title: 'Projeto 02', client: 'Rocketseat', start: '01 de outubro de 2024', end: '20 de dezembro de 2024' },
  { id: 3, title: 'Landingpage Z', client: 'XPTO Corp', start: '10 de setembro de 2024', end: '11 de novembro de 2024' },
])

const searchStore = useSearchStore()

const filteredProjects = computed(() => {
  return projects.value.filter(p =>
    p.title.toLowerCase().includes(searchStore.term.toLowerCase())
  )
})

const handleClickOutside = (event: MouseEvent) => {
  const root = selectInputRef.value?.rootRef
  const isOpen = true
  if (isOpen && root && !root.contains(event.target as Node)) {
    selectInputRef.value?.close()
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    selectInputRef.value?.close()
  }
}

const deleteProject = (projectId: number) => {
  deleteModalRef.value?.open()
}

const handleSearch = (value: string) => {
  searchStore.setTerm(value)
}

onMounted(() => {
  nextTick(() => {
    document.addEventListener('click', handleClickOutside)
    window.addEventListener('keydown', handleKeyDown)
  })
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 px-4 sm:px-10 mt-10">
    <h4 class="text-purple-700 text-2xl font-semibold">
      Projetos
      <span class="text-purple-300 font-normal text-base">({{ filteredProjects.length }})</span>
    </h4>

    <div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full sm:w-auto sm:max-w-3xl justify-end">
      <div class="flex items-center gap-2">
        <SwitchButton />
        <span class="text-purple-900 text-sm sm:text-base whitespace-nowrap">Apenas Favoritos</span>
      </div>
      <SelectInput ref="selectInputRef" class="w-full sm:w-[250px]" @search="handleSearch" />
      <button
        class="flex items-center justify-center text-white bg-purple-300 py-2 px-6 rounded-3xl text-sm sm:text-base whitespace-nowrap">
        <PlusIcon />
        <span class="ml-1">Novo projeto</span>
      </button>
    </div>
  </header>

  <main class="my-6 mx-4 sm:mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8">
    <ProjectCard v-for="project in filteredProjects" :key="project.id" :project-id="project.id"
      :project-title="project.title" :client-name="project.client" :start-date="project.start" :end-date="project.end"
      @delete-project="deleteProject" />
  </main>

  <DeleteModal ref="deleteModalRef" />
</template>
