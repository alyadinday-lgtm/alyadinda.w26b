<script setup>
import { useCartStore } from "./stores/cart"
const cart = useCartStore()
</script>

<template>
  <div class="app">
    <header class="header">
      <RouterLink class="brand" to="/">
        <span class="brand-icon">+</span>
        sehat<span>mart</span>
      </RouterLink>
      <nav aria-label="Navigasi utama">
        <RouterLink to="/">Katalog</RouterLink>
        <RouterLink to="/cart" class="nav-cart">
          <span class="bag-icon">▱</span> Keranjang
          <span class="cart-count">{{ cart.totalItem }}</span>
        </RouterLink>
      </nav>
    </header>
    <main><RouterView /></main>
    <footer>
      <strong>sehat<span>mart</span></strong>
      <span>Praktikum Pemrograman Web · Vue 3, Router & Pinia</span>
    </footer>
  </div>
</template>
