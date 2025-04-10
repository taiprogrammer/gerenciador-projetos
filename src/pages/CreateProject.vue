<script setup lang="ts">
import ArrowLeftIcon from "../assets/icons/arrow-left.svg";
import UploadIcon from "../assets/icons/upload.svg";
import CalendarCheckIcon from "../assets/icons/calendar-check.svg";
import { useRouter } from "vue-router";

const router = useRouter();

function navigateToHome() {
  router.push("/");
}
</script>

<template>
  <main class="mx-10 my-[4.1875rem]">
    <header class="flex flex-col gap-2">
      <button
        @click="navigateToHome"
        class="flex items-center gap-2 text-purple-300 cursor-pointer hover:opacity-80 transition-all duration-200"
      >
        <ArrowLeftIcon />
        <span>Voltar</span>
      </button>
      <h4 class="text-purple-700 text-2xl font-semibold">Novo projeto</h4>
    </header>
    <div
      class="flex items-center justify-center mt-8 rounded-[0.5rem] border-[0.0625rem] border-gray-100 p-[3.25rem]"
    >
      <form class="flex flex-col gap-8">
        <div class="flex flex-col gap-1">
          <label for="name" class="text-purple-300 text-[1.125rem] font-medium">
            Nome do projeto
            <span class="text-[0.875rem] text-gray-300 font-normal"
              >(Obrigatório)</span
            >
          </label>
          <input
            type="text"
            id="name"
            class="rounded-[0.25rem] border-[0.0625rem] border-gray-300 bg-white focus:outline-0 p-[0.25rem] text-gray-300"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label
            for="customer"
            class="text-purple-300 text-[1.125rem] font-medium"
          >
            Cliente
            <span class="text-[0.875rem] text-gray-300 font-normal">
              (Obrigatório)
            </span>
          </label>
          <input
            type="text"
            id="customer"
            class="rounded-[0.25rem] border-[0.0625rem] border-gray-300 bg-white focus:outline-0 p-[0.25rem] text-gray-300"
          />
        </div>
        <div class="flex gap-8 justify-between w-full">
          <div class="flex flex-col gap-1 w-1/2">
            <label
              for="initialDate"
              class="text-purple-300 text-[1.125rem] font-medium"
              >Data de Início
              <span class="text-[0.875rem] text-gray-300 font-normal"
                >(Obrigatório)</span
              >
            </label>
            <div class="relative w-full">
              <input
                type="date"
                id="initialDate"
                class="rounded-[0.25rem] w-full border-[0.0625rem] border-gray-300 bg-white focus:outline-0 p-[0.25rem] pr-10 text-gray-300 date-input"
              />
              <div
                class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-300"
              >
                <CalendarCheckIcon />
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <label
              for="endDate"
              class="text-purple-300 text-[1.125rem] font-medium"
              >Data Final
              <span class="text-[0.875rem] text-gray-300 font-normal">
                (Obrigatório)
              </span>
            </label>
            <div class="relative w-full">
              <input
                type="date"
                id="endDate"
                class="rounded-[0.25rem] w-full border-[0.0625rem] border-gray-300 bg-white focus:outline-0 p-[0.25rem] pr-10 text-gray-300 date-input"
              />
              <div
                class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-300"
              >
                <CalendarCheckIcon />
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-purple-300 text-[1.125rem] font-medium"
            >Capa do projeto</span
          >
          <div
            class="rounded-[4px] border-dashed border-[1px] border-gray-300 flex flex-col items-center justify-center gap-4 p-6"
          >
            <input type="file" id="cover" class="hidden" />
            <UploadIcon class="text-gray-300" />
            <p class="text-gray-300">
              Escolha uma imagem .jpg ou .png no seu dispositivo
            </p>
            <label
              for="cover"
              class="bg-white text-purple-300 border-[1px] border-purple-300 py-2 px-8 rounded-3xl cursor-pointer hover:opacity-85 transition-all duration-200"
              >Selecionar</label
            >
          </div>
        </div>
        <button
          disabled
          class="bg-purple-300 text-white py-3.5 rounded-3xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Salvar projeto
        </button>
      </form>
    </div>
  </main>
</template>

<style scoped>
/* Remove apenas o ícone do calendário, mantendo a funcionalidade */
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
