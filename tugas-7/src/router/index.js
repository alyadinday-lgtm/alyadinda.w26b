import { createRouter, createWebHistory } from "vue-router"

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("../views/HomeView.vue") },
    { path: "/cart", component: () => import("../views/CartView.vue") }
  ],
  scrollBehavior: () => ({ top: 0 })
})

