<script setup>
const props = defineProps({
  id: { type: Number, required: true },
  nama: { type: String, required: true },
  deskripsi: { type: String, required: true },
  harga: { type: Number, required: true },
  stok: { type: Number, default: 0 },
  gambar: { type: String, required: true },
  label: { type: String, default: "PILIHAN SEHAT" }
})

const emit = defineEmits(["beli-produk"])

function handleBeli() {
  if (props.stok > 0) {
    emit("beli-produk", {
      id: props.id,
      nama: props.nama,
      harga: props.harga,
      gambar: props.gambar
    })
  }
}
</script>

<template>
  <article class="product-card">
    <div class="product-art">
      <span class="product-label">{{ label }}</span>
      <img :src="gambar" :alt="`Ilustrasi ${nama}`" class="product-image">
      <span class="art-caption">SEHAT SETIAP HARI</span>
    </div>
    <div class="product-info">
      <div class="product-title">
        <h3>{{ nama }}</h3>
        <span class="stock" :class="{ 'stock-empty': stok === 0 }">
          {{ stok ? `Stok ${stok}` : "Habis" }}
        </span>
      </div>
      <p class="product-description">{{ deskripsi }}</p>
      <div class="product-bottom">
        <strong class="product-price">Rp {{ harga.toLocaleString("id-ID") }}</strong>
        <button class="buy-button" :disabled="stok === 0" @click="handleBeli">
          <span>+</span> {{ stok ? "Tambah" : "Stok habis" }}
        </button>
      </div>
    </div>
  </article>
</template>
