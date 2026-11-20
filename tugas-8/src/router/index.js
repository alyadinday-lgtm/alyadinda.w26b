import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("../views/HomeView.vue") },
    { path: "/keranjang", component: () => import("../views/CartView.vue") }
  ],
  scrollBehavior: () => ({ top: 0 })
})

export default router
