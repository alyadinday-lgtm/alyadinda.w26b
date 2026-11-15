<script setup>
import { useCartStore } from "../stores/cart"
const cart = useCartStore()
const rupiah = (angka) => new Intl.NumberFormat("id-ID").format(angka)
</script>

<template>
  <section class="page cart-page">
    <div class="cart-heading">
      <div>
        <p class="eyebrow">PILIHAN BAIK BUAT KAMU</p>
        <h1>Keranjang <em>belanja.</em></h1>
      </div>
      <RouterLink to="/" class="back-link">← Lanjut pilih produk</RouterLink>
    </div>

    <div v-if="cart.items.length === 0" class="empty-state">
      <div class="empty-art"><span>♡</span><i>✳</i></div>
      <p class="eyebrow">MASIH KOSONG NIH</p>
      <h2>Keranjangmu lagi istirahat.</h2>
      <p>Yuk, temukan sesuatu yang bikin harimu lebih baik.</p>
      <RouterLink class="hero-button" to="/">Lihat produk <span>↗</span></RouterLink>
    </div>

    <div v-else class="cart-layout">
      <div>
        <div class="list-heading"><h2>Produk pilihanmu</h2><span>{{ cart.totalItem }} item</span></div>
        <div class="cart-items">
          <article v-for="item in cart.items" :key="item.id" class="cart-item">
            <img :src="item.gambar" :alt="item.nama">
            <div class="cart-item-info">
              <h3>{{ item.nama }}</h3>
              <p>Rp {{ rupiah(item.harga) }} <span>per produk</span></p>
            </div>
            <div class="quantity"><small>JUMLAH</small><strong>{{ item.qty }}</strong></div>
            <strong class="subtotal">Rp {{ rupiah(item.harga * item.qty) }}</strong>
            <button
              class="remove-button"
              :aria-label="`Hapus ${item.nama} dari keranjang`"
              @click="cart.hapusItem(item.id)"
            >Hapus</button>
          </article>
        </div>
      </div>
      <aside class="summary">
        <p class="eyebrow">RINGKASAN KECIL</p>
        <h2>Pesananmu</h2>
        <div class="summary-row"><span>Total produk</span><strong>{{ cart.totalItem }} item</strong></div>
        <div class="summary-row"><span>Total harga</span><strong>Rp {{ rupiah(cart.totalHarga) }}</strong></div>
        <p class="summary-note">Terima kasih sudah memilih untuk merawat diri ✳</p>
        <RouterLink to="/" class="summary-link">Tambah produk <span>↗</span></RouterLink>
      </aside>
    </div>
  </section>
</template>
