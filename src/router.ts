import DatasetView from './pages/DatasetView.vue'
import DocumentationView from './pages/DocumentationView.vue'
import DashboardView from './pages/DashboardView.vue'
import * as VueRouter from 'vue-router'

const routes = [
    { path: '/', component: DatasetView },
    { path: '/dashboard', component: DashboardView },
    { path: '/documentation', component: DocumentationView },
]

const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We
    // are using the hash history for simplicity here.
    history: VueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
})

export default router
