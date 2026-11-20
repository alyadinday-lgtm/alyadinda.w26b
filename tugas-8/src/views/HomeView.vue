<script setup>
import { computed, ref } from "vue"
import ProductCard from "../components/ProductCard.vue"
import { products } from "../data/products"
import { useCartStore } from "../stores/cart"

const cart = useCartStore()
const searchQuery = ref("")
const selectedCategory = ref("Semua")
const categories = [
  "Semua",
  "Vitamin",
  "Perlengkapan",
  "Alat kesehatan",
  "P3K",
  "Perawatan",
  "Ibu & anak",
  "Herbal"
]

const filteredProducts = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase()

  return products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword)
    const matchesCategory =
      selectedCategory.value === "Semua" ||
      product.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })
})

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(price)
}
</script>

<template>
  <div class="page-container">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow"><span class="status-dot"></span> KATALOG APOTEK · DEMO</p>
        <h1>Solusi kesehatan ada,<br><em>untuk setiap hari.</em></h1>
        <p class="hero-description">
          Sediakan perlindungan terbaik bagi keluarga dengan produk kesehatan pilihan berkualitas.   
        </p>
        <a class="hero-button" href="#katalog">Lihat katalog <span aria-hidden="true">↓</span></a>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="hero-circle"></div>
        <span class="hero-plus">+</span>
        <span class="hero-bottle">🧴</span>
        <span class="hero-leaf">✳</span>
      </div>
      <div class="hero-note">
        <strong>Belanja lebih mudah</strong>
        <span>Produk demo · Harga simulasi</span>
      </div>
    </section>

    <section class="benefit-strip" aria-label="Informasi katalog">
      <div class="benefit-item">
        <span class="benefit-icon" aria-hidden="true">✦</span>
        <span><strong>25 pilihan produk</strong><small>Untuk kebutuhan harian</small></span>
      </div>
      <div class="benefit-item">
        <span class="benefit-icon" aria-hidden="true">⌕</span>
        <span><strong>Mudah ditemukan</strong><small>Cari dan filter kategori</small></span>
      </div>
      <div class="benefit-item">
        <span class="benefit-icon" aria-hidden="true">＋</span>
        <span><strong>Belanja praktis</strong><small>Tambahkan ke keranjang</small></span>
      </div>
    </section>

    <section id="katalog" class="catalog-section" aria-labelledby="catalog-title">
      <div class="section-heading">
        <div>
          <p class="eyebrow">PILIHAN UNTUKMU</p>
          <h2 id="catalog-title">Katalog <em>produk</em></h2>
          <p class="catalog-count">{{ filteredProducts.length }} produk tersedia</p>
        </div>
        <label class="search-box">
          <span aria-hidden="true">⌕</span>
          <span class="sr-only">Cari produk</span>
          <input v-model="searchQuery" type="search" placeholder="Cari produk...">
        </label>
      </div>

      <div class="category-list" role="group" aria-label="Filter kategori produk">
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          :class="{ 'category-active': selectedCategory === category }"
          :aria-pressed="selectedCategory === category"
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>

      <div v-if="filteredProducts.length" class="product-grid">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @add-to-cart="cart.addToCart"
        />
      </div>
      <div v-else class="empty-state">
        <span aria-hidden="true">⌕</span>
        <h3>Produk tidak ditemukan</h3>
        <p>Coba kata kunci atau kategori yang berbeda.</p>
      </div>
    </section>

    <aside class="health-notice">
      <span aria-hidden="true">i</span>
      <p>
        Ini hanya proyek demo pembelajaran. Produk dan harga bersifat simulasi,
        bukan saran medis atau layanan penjualan obat sungguhan.
      </p>
    </aside>
  </div>
</template>
