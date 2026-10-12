import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../shared/presentation/components/app-layout.vue'
import Home from '../animals/presentation/views/home.vue'
import NewAnimalIntake from '../animals/presentation/views/new-animal-intake.vue'
import PageNotFound from '../shared/presentation/views/page-not-found.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home'
        },

        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: 'home',
                    name: 'home',
                    component: Home
                },

                {
                    path: 'shelter/animals/new',
                    name: 'new-animal-intake',
                    component: NewAnimalIntake
                }
            ]
        },

        {
            path: '/:pathMatch(.*)*',
            name: 'page-not-found',
            component: PageNotFound
        }
    ]
})

export default router