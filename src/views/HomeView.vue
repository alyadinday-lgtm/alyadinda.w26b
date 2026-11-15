<script setup>
import ProductCard from "../components/ProductCard.vue"
import jeruk from "../assets/jeruk.svg"
import madu from "../assets/madu.svg"
import skincare from "../assets/skincare.svg"
import { useCartStore } from "../stores/cart"

const cart = useCartStore()
const products = [
  {
    id: 1,
    nama: "Vitamin C Ceria",
    deskripsi: "Vitamin C untuk menemani rutinitas sehatmu.",
    harga: 28000,
    stok: 12,
    label: "BEST SELLER",
    gambar: jeruk
  },
  {
    id: 2,
    nama: "Madu Hutan Asli",
    deskripsi: "Manis alami pilihan untuk melengkapi hari.",
    harga: 45000,
    stok: 8,
    label: "NATURAL",
    gambar: madu
  },
  {
    id: 3,
    nama: "Daily Glow Serum",
    deskripsi: "Perawatan simpel agar kulit terasa segar.",
    harga: 68000,
    stok: 5,
    label: "FAVORIT",
    gambar: skincare
  }
]

function tambahKeCart(produk) {
  cart.tambahItem(produk)
}
</script>

<template>
  <div class="page">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow"><i></i> YOUR DAILY WELLNESS STORE</p>
        <h1>Sehat itu terasa <em>menyenangkan.</em></h1>
        <p class="hero-description">
          Temukan teman kecil untuk rutinitas sehatmu. Pilihan praktis, hati
          lebih tenang, hari terasa lebih ringan.
        </p>
        <a class="hero-button" href="#produk">Jelajahi produk <span>↘</span></a>
        <p class="hero-note"><span>★★★★★</span> Pilihan kecil, kebiasaan baik.</p>
      </div>
      <div class="hero-art">
        <div class="sun"></div>
        <div class="orbit orbit-one"></div>
        <div class="orbit orbit-two"></div>
        <img :src="jeruk" alt="Ilustrasi jeruk vitamin C" class="hero-fruit">
        <div class="sticker"><small>TAKE A</small><strong>good<br>care!</strong></div>
        <span class="spark spark-one">✳</span>
        <span class="spark spark-two">✦</span>
        <span class="side-note">A LITTLE LOVE FOR YOU</span>
      </div>
    </section>

    <section id="produk" class="catalog">
      <div class="catalog-heading">
        <div>
          <p class="eyebrow">PILIHAN BUAT KAMU</p>
          <h2>Good things, <em>good feeling.</em></h2>
        </div>
        <span>0{{ products.length }} PRODUK PILIHAN</span>
      </div>
      <div class="product-grid">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          v-bind="product"
          @beli-produk="tambahKeCart"
        />
      </div>
    </section>

    <aside class="note">
      <span>✳</span>
      <p>Pelan-pelan saja. Merawat diri juga sebuah pencapaian.</p>
      <small>A NOTE TO YOU</small>
    </aside>
  </div>
</template>
