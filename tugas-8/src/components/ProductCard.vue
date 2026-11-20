<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(["add-to-cart"])

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(price)
}
</script>

<template>
  <article class="product-card">
    <div class="product-visual" :class="`product-visual-${((product.id - 1) % 6) + 1}`">
      <span class="product-badge">{{ product.badge }}</span>
      <span class="product-emoji" aria-hidden="true">{{ product.icon }}</span>
    </div>
    <div class="product-info">
      <span class="product-category">{{ product.category }}</span>
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <div class="product-buy-row">
        <strong>{{ formatPrice(product.price) }}</strong>
        <button
          class="add-button"
          type="button"
          :aria-label="`Tambah ${product.name} ke keranjang`"
          @click="emit('add-to-cart', product)"
        >
          <span aria-hidden="true">+</span> Tambah
        </button>
      </div>
    </div>
  </article>
</template>
