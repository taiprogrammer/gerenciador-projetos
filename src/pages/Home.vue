<script setup lang="ts">
import EmptyState from '../components/EmptyState.vue';
import ProjectList from '../components/ProjectList.vue';

import { onMounted, ref } from 'vue';

import { api } from '../server';
import type { ProjectType } from '../types/project';

const projects = ref<ProjectType[]>([])
const isEmpty = ref<boolean>(true)

function fetchProjects() {
    api.get('/projects')
        .then(({ data }) => {
            if (data.length > 0) {
                data.map((project: ProjectType) => {
                    projects.value.push(project)
                })
                isEmpty.value = false
            }
        })
        .catch((error) => {
            console.error('Error fetching projects:', error);
        });
}

onMounted(() => {
    fetchProjects();
});
</script>
<template>
    <EmptyState v-if="isEmpty" />
    <ProjectList v-else :projects="projects" />
</template>
