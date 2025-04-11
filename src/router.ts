import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import CreateProject from './pages/CreateProject.vue'
import EditProject from './pages/EditProject.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/create', name: 'Create Project', component: CreateProject },
    { path: '/edit/:id', name: 'Edit Project', component: EditProject }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})