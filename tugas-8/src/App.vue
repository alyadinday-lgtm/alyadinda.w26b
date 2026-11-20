<script setup>
import { RouterLink, RouterView } from "vue-router"
import { useCartStore } from "./stores/cart"

const cart = useCartStore()
</script>

<template>
  <div class="app-shell">
    <header class="site-header">
      <RouterLink class="brand" to="/" aria-label="Apotek Sehat, beranda">
        <span class="brand-mark" aria-hidden="true">+</span>
        <span>apotek<span class="brand-accent">sehat</span></span>
      </RouterLink>

      <nav class="main-nav" aria-label="Navigasi utama">
        <RouterLink to="/">Katalog</RouterLink>
        <RouterLink to="/keranjang" class="cart-link">
          Keranjang
          <span class="cart-badge">{{ cart.totalItems }}</span>
        </RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

    <footer class="site-footer">
      <strong>apotek<span class="brand-accent">sehat</span></strong>
      <span>Demo pembelajaran Vue 3 · Bukan layanan apotek sungguhan</span>
    </footer>
  </div>
</template>
