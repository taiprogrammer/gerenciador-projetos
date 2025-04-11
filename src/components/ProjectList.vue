<script setup lang="ts">
import SelectInput from "./SelectInput.vue";
import ProjectCard from "./ProjectCard.vue";
import DeleteModal from "./DeleteModal.vue";
import NotFound from "./NotFound.vue";

import SwitchButton from "./SwitchButton.vue";
import PlusIcon from "../assets/icons/plus.svg";

import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  computed,
  watch,
} from "vue";
import { useSearchStore } from "../stores/search";

import type { ProjectType } from "../types/project";
import { router } from "../router";
import { api } from "../server";

const props = defineProps({
  projects: {
    type: Array as () => ProjectType[],
    required: true,
  },
});
const selectInputRef = ref<InstanceType<typeof SelectInput> | null>(null);
const deleteModalRef = ref<InstanceType<typeof DeleteModal> | null>(null);

const searchStore = useSearchStore();
const projectIdSelected = ref<string>("");
const projectNameSelected = ref<string>("");
const projectsToShow = ref<ProjectType[]>([]);

const filteredProjects = computed(() => {
  return props.projects.filter((project) =>
    project.name.toLowerCase().includes(searchStore.term.toLowerCase())
  );
});

function goToCreateProject() {
  router.push("/create");
}

function handleClickOutside(event: MouseEvent) {
  const root = selectInputRef.value?.rootRef;
  const isOpen = true;
  if (isOpen && root && !root.contains(event.target as Node)) {
    selectInputRef.value?.close();
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    selectInputRef.value?.close();
  }
}

function deleteProject(project: ProjectType) {
  projectIdSelected.value = project.id;
  projectNameSelected.value = project.name;
  deleteModalRef.value?.open();
}

function handleDeleteProject() {
  api
    .delete(`/projects/${projectIdSelected.value}`)
    .then(() => {
      deleteModalRef.value?.close();
      projectsToShow.value = projectsToShow.value.filter(
        (project) => project.id !== projectIdSelected.value
      );
    })
    .catch((error) => {
      console.error("Error deleting project:", error);
    });
}

function editProject(id: string) {
  router.push(`/edit/${id}`);
}

function handleSearch(value: string) {
  searchStore.setTerm(value);
}

function filterAlphabetically() {
  projectsToShow.value = [...filteredProjects.value].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

function filterRecents() {
  projectsToShow.value = [...filteredProjects.value].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
}

function filterEndDate() {
  projectsToShow.value = [...filteredProjects.value].sort(
    (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
  );
}

function handleGetFavorites(isFavoriteOnly: boolean) {
  if (isFavoriteOnly) {
    projectsToShow.value = filteredProjects.value.filter(
      (project) => project.favorite
    );
  } else {
    projectsToShow.value = [...filteredProjects.value];
  }
}

function filterProjectBy(option: { value: string }) {
  switch (option.value) {
    case "Ordem alfabética":
      filterAlphabetically();
      break;
    case "Iniciados mais recentes":
      filterRecents();
      break;
    case "Prazo mais próximo":
      filterEndDate();
      break;
    default:
      projectsToShow.value = filteredProjects.value;
  }
}

watch(
  filteredProjects,
  (newValue) => {
    projectsToShow.value = [...newValue];
  },
  { immediate: true }
);

onMounted(() => {
  nextTick(() => {
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
  });
  filterAlphabetically()
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <header class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6 px-4 sm:px-10 mt-10">
      <h4 class="text-purple-700 text-2xl font-semibold">
        Projetos
        <span class="text-purple-300 font-normal text-base">({{ filteredProjects.length }})</span>
      </h4>

      <div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 w-full md:w-auto md:max-w-3xl justify-end">
        <div class="flex items-center gap-2">
          <SwitchButton @get-favorites="handleGetFavorites" />
          <span class="text-purple-900 text-sm sm:text-base whitespace-nowrap">Apenas Favoritos</span>
        </div>
        <SelectInput ref="selectInputRef" class="w-full sm:w-[250px]" @search="handleSearch" @change="filterProjectBy" />
        <button @click="goToCreateProject"
          class="flex items-center justify-center text-white bg-purple-300 py-2 px-6 rounded-3xl text-sm sm:text-base whitespace-nowrap cursor-pointer hover:opacity-80 transition-all duration-200">
          <PlusIcon />
          <span class="ml-1">Novo projeto</span>
        </button>
      </div>
    </header>

  <main class="my-6 mx-4 sm:mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8">
    <template v-if="projectsToShow.length > 0">
      <ProjectCard v-for="project in projectsToShow" :key="project.id" :project="project"
        @delete-project="deleteProject" @edit-project="editProject" />
    </template>
      <NotFound v-else/>
  </main>

  <DeleteModal ref="deleteModalRef" @delete-project-confirm="handleDeleteProject" :name="projectNameSelected" />
</template>
