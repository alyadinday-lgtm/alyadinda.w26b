import { computed, ref } from "vue"
import { defineStore } from "pinia"

export const useCartStore = defineStore("cart", () => {
  const items = ref([])

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )
  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  function addToCart(product) {
    const existingItem = items.value.find((item) => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
      return
    }

    items.value.push({ ...product, quantity: 1 })
  }

  function changeQuantity(productId, amount) {
    const item = items.value.find((product) => product.id === productId)
    if (!item) return

    item.quantity += amount
    if (item.quantity <= 0) {
      removeFromCart(productId)
    }
  }

  function removeFromCart(productId) {
    items.value = items.value.filter((item) => item.id !== productId)
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    totalItems,
    subtotal,
    addToCart,
    changeQuantity,
    removeFromCart,
    clearCart
  }
})
