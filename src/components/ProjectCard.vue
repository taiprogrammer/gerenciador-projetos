<script setup lang="ts">
import Cover from './Cover.vue';
import DotsIcon from '../assets/icons/dots.svg'
import StarIcon from '../assets/icons/star.svg'
// import StarFilledIcon from '../assets/icons/star-filled.svg'
import CalendarDayIcon from '../assets/icons/calendar-day.svg'
import CalendarCheckIcon from '../assets/icons/calendar-check.svg'
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useSearchStore } from '../stores/search';

const props = defineProps({
    projectId: {
        type: Number,
        required: true,
        default: 1
    },
    projectTitle: {
        type: String,
        required: true,
    },
    clientName: {
        type: String,
    },
    startDate: {
        type: String,
        default: '01 de setembro de 2024'
    },
    endDate: {
        type: String,
        default: '12 de dezembro de 2024'
    },
    isFavorite: {
        type: Boolean,
        default: false
    }
});

// const favorite = ref(props.isFavorite);
const menuOpen = ref(false);
const searchStore = useSearchStore()

// const toggleFavorite = () => {
//   favorite.value = !favorite.value;
//   emit('toggleFavorite', {
//     projectId: props.projectId,
//     isFavorite: favorite.value
//   });
// };

const highlightedTitle = computed(() => {
  const term = searchStore.term.trim()
  if (!term) return props.projectTitle

  const regex = new RegExp(`(${term})`, 'gi')
  return props.projectTitle.replace(regex, '<span class="bg-yellow-500 text-white font-bold rounded">$1</span>')
})

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
  if (menuOpen.value) {
    emit('openMenu', props.projectId);
  }
};

const editProject = () => {
  menuOpen.value = false;
  emit('editProject', props.projectId);
};

const deleteProject = () => {
  menuOpen.value = false;
  emit('deleteProject', props.projectId);
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement | null;
  if (target && !target.closest('.relative') && menuOpen.value) {
    menuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside as (event: MouseEvent) => void);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const emit = defineEmits(['toggleFavorite', 'openMenu', 'openProject', 'deleteProject', 'shareProject', 'editProject']);
</script>
<template>
    <div class="rounded-3xl overflow-hidden shadow-md max-w-80">
        <div class="bg-purple-300 h-60 relative flex justify-center items-center">
            <Cover />

            <div class="absolute bottom-4 right-4 flex items-center space-x-4">
                <button class="cursor-pointer">
                    <StarIcon />
                </button>
                <button
                    @click="toggleMenu"
                    class="bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer">
                    <DotsIcon />
                </button>
                <div v-show="menuOpen"
                    class="absolute right-0 top-11 w-48 bg-white rounded-lg shadow-lg py-1 z-10 transform origin-top-right transition-all duration-200 ease-out"
                    :class="menuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'">
                    <a href="#" @click.prevent="editProject"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">Editar projeto</a>
                    <div class="border-t border-gray-100"></div>
                    <a href="#" @click.prevent="deleteProject"
                        class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Excluir</a>
                </div>
            </div>
        </div>

        <div class="bg-white p-6">
            <h2 class="text-[20px] font-bold text-purple-700 mb-1" v-html="highlightedTitle"></h2>

            <div class="flex items-center mb-6 gap-2">
                <span class="text-gray-300 font-bold">Cliente:</span>
                <span class="text-gray-300">{{ clientName }}</span>
            </div>

            <div class="border-t border-gray-200 pt-4">

                <div class="flex items-center mb-4">
                    <div class="text-gray-300 mr-3">
                        <CalendarDayIcon />
                    </div>
                    <span class="text-gray-600">01 de setembro de 2024</span>
                </div>

                <div class="flex items-center">
                    <div class="text-gray-300 mr-3">
                        <CalendarCheckIcon />
                    </div>
                    <span class="text-gray-600">12 de dezembro de 2024</span>
                </div>
            </div>
        </div>
    </div>
</template>