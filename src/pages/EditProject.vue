<script setup lang="ts">
import ArrowLeftIcon from "../assets/icons/arrow-left.svg";
import UploadIcon from "../assets/icons/upload.svg";
import CalendarCheckIcon from "../assets/icons/calendar-check.svg";
import EditIcon from "../assets/icons/edit.svg";

import { useRouter } from "vue-router";
import { api } from "../server";
import { onMounted, ref } from "vue";
import { toBase64 } from "../utils/fileToBase64";

const router = useRouter();
const today = new Date();
const todayString = today.toISOString().split("T")[0];

const id: string = router.currentRoute.value.params.id as string;

const project = ref({
  name: "",
  customer: "",
  startDate: "",
  endDate: "",
  imageUrl: "",
  favorite: false
})
const newCover = ref<string>("")
const errors = ref({
  name: "",
  customer: "",
});

function navigateToHome() {
  router.push("/");
}

function validateFields() {
  const wordsInName = project.value.name.trim().split(/\s+/);
  errors.value.name =
    wordsInName.length >= 2 ? "" : "Digite ao menos duas palavras para o nome";

  errors.value.customer = project.value.customer.trim()
    ? ""
    : "Informe o nome do cliente";
}

async function handleSubmit(event: Event) {
  event.preventDefault();

  validateFields();

  const hasErrors = Object.values(errors.value).some((msg) => msg);
  if (hasErrors) return;

  try {
    const response = await api.put(`/projects/${router.currentRoute.value.params.id}`, {
      id: router.currentRoute.value.params.id,
      name: project.value.name,
      customer: project.value.customer,
      startDate: project.value.startDate,
      endDate: project.value.endDate,
      favorite: project.value.favorite,
      imageUrl: newCover.value ? newCover.value : project.value.imageUrl
    });

    if (response.data && response.data.id) {
      router.push("/");
    }
  } catch (err) {
    console.error("Erro ao enviar:", err);
  }
}

function getProjectInformations() {
  api.get(`/projects/${id}`)
    .then(({ data }) => {
      project.value = { ...data }
    })
    .catch((error) => {
      console.error("Error fetching project:", error);
    });
}

async function handleCover() {
  const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
  const file = fileInput.files?.[0]

  if (file) {
    newCover.value = await toBase64(file)
  }
}

onMounted(() => {
  getProjectInformations()
})
</script>

<template>
  <main class="mx-4 md:mx-10 my-[4.1875rem]">
    <header class="flex flex-col gap-2">
      <button @click="navigateToHome"
        class="flex items-center gap-2 text-purple-300 cursor-pointer hover:opacity-80 transition-all duration-200">
        <ArrowLeftIcon />
        <span>Voltar</span>
      </button>
      <h4 class="text-purple-700 text-2xl font-semibold">Editar projeto</h4>
    </header>

    <div class="flex items-center justify-center mt-8 rounded-lg border border-gray-100 p-6 sm:p-12">
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-8 w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl">

        <div class="flex flex-col gap-1">
          <label for="name" class="text-lg font-medium" :class="errors.name ? 'text-red-500' : 'text-purple-300'">
            Nome do projeto
            <span class="text-sm font-normal"
              :class="errors.name ? 'text-red-500' : 'text-gray-300'">(Obrigatório)</span>
          </label>
          <input v-model="project.name" type="text" id="name"
            :class="errors.name ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-300'"
            class="rounded border bg-white focus:outline-0 p-2" />
          <span v-if="errors.name" class="text-red-500 text-sm mt-1">{{
            errors.name
          }}</span>
        </div>

        <div class="flex flex-col gap-1">
          <label for="customer" class="text-lg font-medium"
            :class="errors.customer ? 'text-red-500' : 'text-purple-300'">
            Cliente
            <span class="text-sm font-normal"
              :class="errors.customer ? 'text-red-500' : 'text-gray-300'">(Obrigatório)</span>
          </label>
          <input v-model="project.customer" type="text" id="customer"
            :class="errors.customer ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-300'"
            class="rounded border bg-white focus:outline-0 p-2" />
        </div>

        <div class="flex flex-col sm:flex-row gap-6 justify-between w-full">
          <div class="flex flex-col gap-1 w-full">
            <label for="startDate" class="text-purple-300 text-lg font-medium">Data de Início
              <span class="text-sm text-gray-300 font-normal">(Obrigatório)</span>
            </label>
            <div class="relative w-full">
              <input v-model="project.startDate" type="date" id="startDate" :min="todayString"
                class="rounded w-full border border-gray-300 bg-white focus:outline-0 p-2 pr-10 text-gray-300 date-input" />
              <div class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-300">
                <CalendarCheckIcon />
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-1 w-full">
            <label for="endDate" class="text-purple-300 text-lg font-medium">Data Final
              <span class="text-sm text-gray-300 font-normal">(Obrigatório)</span>
            </label>
            <div class="relative w-full">
              <input v-model="project.endDate" type="date" id="endDate" :min="todayString"
                class="rounded w-full border border-gray-300 bg-white focus:outline-0 p-2 pr-10 text-gray-300 date-input" />
              <div class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-300">
                <CalendarCheckIcon />
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <span class="text-purple-300 text-lg font-medium">Capa do projeto</span>
          <div v-if="project.imageUrl" class="relative rounded-lg w-full h-96 flex items-center justify-center">
            <img :src="newCover ? newCover : project.imageUrl" :alt="project.name"
              class="rounded-lg w-full h-full object-cover" />
            <label for="new-cover"
              class="absolute top-6 right-6 bg-white rounded-full p-1.5 text-purple-300 cursor-pointer hover:opacity-70 transition-all duration-200">
              <EditIcon />
            </label>
            <input @change="() => handleCover()" type="file" id="new-cover" class="hidden" />
          </div>
          <div v-else
            class="rounded border-dashed border border-gray-300 flex flex-col items-center justify-center gap-4 p-6">
            <input type="file" id="cover" class="hidden" />
            <UploadIcon class="text-gray-300" />
            <p class="text-gray-300 text-center text-sm">
              Escolha uma imagem .jpg ou .png no seu dispositivo
            </p>
            <label for="cover"
              class="bg-white text-purple-300 border border-purple-300 py-2 px-8 rounded-3xl cursor-pointer hover:opacity-85 transition-all duration-200">
              Selecionar
            </label>
          </div>
        </div>

        <button type="submit"
          class="bg-purple-300 text-white py-3.5 rounded-3xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
          Salvar projeto
        </button>
      </form>
    </div>
  </main>
</template>

<style scoped>
.date-input::-webkit-calendar-picker-indicator {
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>
