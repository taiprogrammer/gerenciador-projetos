<script setup lang="ts">
import Cover from './Cover.vue';
import DotsIcon from '../assets/icons/dots.svg'
import StarIcon from '../assets/icons/star.svg'
import StarFilledIcon from '../assets/icons/star-filled.svg'
import CalendarDayIcon from '../assets/icons/calendar-day.svg'
import CalendarCheckIcon from '../assets/icons/calendar-check.svg'
import EditIcon from '../assets/icons/edit.svg'
import TrashIcon from '../assets/icons/trash.svg'


import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useSearchStore } from '../stores/search';
import type { ProjectType } from '../types/project';
import { formatDate } from '../utils/formartDate';
import { api } from '../server';

const props = defineProps({
    project: {
        type: Object as () => ProjectType,
        required: true,
    },
})

const favorite = ref(props.project.favorite);
const menuOpen = ref(false);
const searchStore = useSearchStore()

function handleFavorite() {
    api.put(`/projects/${props.project.id}`, {
        ...props.project,
        favorite: !favorite.value
    })
        .then(() => {
            favorite.value = !favorite.value;
        }).catch((error) => {
            console.error('Error updating project:', error);
        });
}

const highlightedTitle = computed(() => {
    const term = searchStore.term.trim()
    if (!term) return props.project.name

    const regex = new RegExp(`(${term})`, 'gi')
    return props.project.name.replace(regex, '<span class="bg-yellow-500 text-white font-bold rounded">$1</span>')
})

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
    if (menuOpen.value) {
        emit('openMenu', props.project.id);
    }
};

const editProject = () => {
    menuOpen.value = false;
    emit('editProject', props.project.id);
};

const deleteProject = () => {
    menuOpen.value = false;
    emit('deleteProject', props.project);
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
    <div class="rounded-3xl overflow-hidden shadow-md max-w-80 bg-white">
        <div class="bg-purple-300 h-60 relative flex justify-center items-center">
            <Cover :image-url="project.imageUrl" :name="project.name" />

            <div class="absolute bottom-4 right-4 flex items-center space-x-4">
                <button class="cursor-pointer">
                    <StarFilledIcon v-if="favorite" @click="handleFavorite" />
                    <StarIcon v-else @click="handleFavorite" />
                </button>
                <button @click="toggleMenu"
                    class="bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer">
                    <DotsIcon />
                </button>
                <div v-show="menuOpen"
                    class="absolute right-0 top-11 w-48 bg-white rounded-lg shadow-lg py-1 z-10 transform origin-top-right transition-all duration-200 ease-out"
                    :class="menuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'">
                    <button @click.prevent="editProject"
                        class="px-5 py-3.5 text-purple-300 flex items-center gap-3 hover:bg-indigo-50 w-full cursor-pointer">
                        <EditIcon />
                        <span>Editar</span>
                    </button>
                    <div class="border-t border-gray-100"></div>
                    <button @click.prevent="deleteProject"
                    class="px-5 py-3.5 text-purple-300 flex items-center gap-3 hover:bg-indigo-50 w-full cursor-pointer">
                        <TrashIcon />
                        <span>Remover</span>
                </button>
                </div>
            </div>
        </div>

        <div class="bg-white p-6">
            <h2 class="text-[20px] font-bold text-purple-700 mb-1" v-html="highlightedTitle"></h2>

            <div class="flex items-center mb-6 gap-2">
                <span class="text-gray-300 font-bold">Cliente:</span>
                <span class="text-gray-300">{{ props.project.customer }}</span>
            </div>

            <div class="border-t border-gray-200 pt-4">

                <div class="flex items-center mb-4">
                    <div class="text-gray-300 mr-3">
                        <CalendarDayIcon />
                    </div>
                    <span class="text-gray-600">{{ formatDate(props.project.startDate) }}</span>
                </div>

                <div class="flex items-center">
                    <div class="text-gray-300 mr-3">
                        <CalendarCheckIcon />
                    </div>
                    <span class="text-gray-600">{{ formatDate(props.project.endDate) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>