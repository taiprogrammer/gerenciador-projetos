import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import CreateProject from './pages/CreateProject.vue'

const routes = [
    { path: '/', name: 'Home',  component: Home },
    { path: '/create-project', name: 'Create Project', component: CreateProject }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})