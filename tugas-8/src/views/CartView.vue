<script setup>
import { ref } from "vue"
import { RouterLink } from "vue-router"
import { useCartStore } from "../stores/cart"

const cart = useCartStore()
const orderSubmitted = ref(false)

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(price)
}

function submitDemoOrder() {
  if (!cart.items.length) return
  cart.clearCart()
  orderSubmitted.value = true
}
</script>

<template>
  <section class="cart-page">
    <div class="section-heading">
      <div>
        <p class="eyebrow">RINGKASAN BELANJA</p>
        <h1>Keranjang <em>belanja</em></h1>
      </div>
      <RouterLink class="back-link" to="/">← Kembali ke katalog</RouterLink>
    </div>

    <div v-if="orderSubmitted" class="success-panel" role="status">
      <span aria-hidden="true">✓</span>
      <h2>Simulasi pesanan berhasil</h2>
      <p>Ini hanya demo, tidak ada transaksi atau pembayaran yang dilakukan.</p>
      <RouterLink class="primary-button" to="/">Kembali ke katalog</RouterLink>
    </div>

    <div v-else-if="cart.items.length" class="cart-layout">
      <div class="cart-items">
        <article v-for="item in cart.items" :key="item.id" class="cart-item">
          <div class="cart-item-icon" aria-hidden="true">{{ item.icon }}</div>
          <div class="cart-item-info">
            <span>{{ item.category }}</span>
            <h2>{{ item.name }}</h2>
            <strong>{{ formatPrice(item.price) }}</strong>
          </div>
          <div class="quantity-control" :aria-label="`Jumlah ${item.name}`">
            <button
              type="button"
              :aria-label="`Kurangi ${item.name}`"
              @click="cart.changeQuantity(item.id, -1)"
            >−</button>
            <span>{{ item.quantity }}</span>
            <button
              type="button"
              :aria-label="`Tambah ${item.name}`"
              @click="cart.changeQuantity(item.id, 1)"
            >+</button>
          </div>
          <button
            class="remove-link"
            type="button"
            :aria-label="`Hapus ${item.name} dari keranjang`"
            @click="cart.removeFromCart(item.id)"
          >
            Hapus
          </button>
        </article>
      </div>

      <aside class="order-summary">
        <h2>Ringkasan</h2>
        <div class="summary-row">
          <span>Total item</span>
          <span>{{ cart.totalItems }}</span>
        </div>
        <div class="summary-row summary-total">
          <strong>Subtotal</strong>
          <strong>{{ formatPrice(cart.subtotal) }}</strong>
        </div>
        <p>Harga dan transaksi pada halaman ini hanya simulasi.</p>
        <button class="primary-button checkout-button" type="button" @click="submitDemoOrder">
          Buat simulasi pesanan
        </button>
      </aside>
    </div>

    <div v-else class="empty-cart">
      <span aria-hidden="true">＋</span>
      <h2>Keranjangmu masih kosong</h2>
      <p>Pilih produk dari katalog untuk mulai mencoba aplikasi.</p>
      <RouterLink class="primary-button" to="/">Jelajahi katalog</RouterLink>
    </div>
  </section>
</template>
