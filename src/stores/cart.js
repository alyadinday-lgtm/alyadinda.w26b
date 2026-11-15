import { computed, ref } from "vue"
import { defineStore } from "pinia"

export const useCartStore = defineStore("cart", () => {
  const items = ref([])
  const totalItem = computed(() =>
    items.value.reduce((sum, item) => sum + item.qty, 0)
  )
  const totalHarga = computed(() =>
    items.value.reduce((sum, item) => sum + item.harga * item.qty, 0)
  )

  function tambahItem(produk) {
    const itemAda = items.value.find((item) => item.id === produk.id)
    if (itemAda) itemAda.qty += 1
    else items.value.push({ ...produk, qty: 1 })
  }

  function hapusItem(id) {
    items.value = items.value.filter((item) => item.id !== id)
  }

  return { items, totalItem, totalHarga, tambahItem, hapusItem }
})
