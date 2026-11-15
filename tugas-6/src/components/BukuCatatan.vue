<script setup>
import { computed, ref, watch } from 'vue'

const storageKey = 'ruang-baca-books'
const starterBooks = [
  { id: 1, title: 'Filosofi Teras', category: 'Pengembangan diri', isRead: true },
  { id: 2, title: 'Laut Bercerita', category: 'Novel', isRead: false },
  { id: 3, title: 'Atomic Habits', category: 'Pengembangan diri', isRead: false },
]

function getSavedBooks() {
  try {
    const savedBooks = localStorage.getItem(storageKey)
    return savedBooks ? JSON.parse(savedBooks) : starterBooks
  } catch (error) {
    console.error('Gagal membaca daftar buku dari penyimpanan lokal:', error)
    return starterBooks
  }
}

const books = ref(getSavedBooks())
const title = ref('')
const category = ref('')
const isRead = ref(false)
const activeFilter = ref('Semua')
const categories = ['Novel', 'Pengembangan diri', 'Teknologi', 'Bisnis', 'Lainnya']
const filters = ['Semua', 'Sedang dibaca', 'Selesai']

const completedCount = computed(() => books.value.filter((book) => book.isRead).length)
const visibleBooks = computed(() => {
  if (activeFilter.value === 'Selesai') {
    return books.value.filter((book) => book.isRead)
  }
  if (activeFilter.value === 'Sedang dibaca') {
    return books.value.filter((book) => !book.isRead)
  }
  return books.value
})

watch(
  books,
  (updatedBooks) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(updatedBooks))
    } catch (error) {
      console.error('Gagal menyimpan daftar buku:', error)
    }
  },
  { deep: true },
)

function addBook() {
  const cleanTitle = title.value.trim()
  if (!cleanTitle || !category.value) return

  books.value.unshift({
    id: Date.now(),
    title: cleanTitle,
    category: category.value,
    isRead: isRead.value,
  })

  title.value = ''
  category.value = ''
  isRead.value = false
  activeFilter.value = 'Semua'
}

function removeBook(id) {
  books.value = books.value.filter((book) => book.id !== id)
}
</script>

<template>
  <main class="page-shell">
    <header class="topbar">
      <a class="brand" href="#" aria-label="Ruang Baca, halaman utama">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none">
            <path d="M5 8.5c4.2-1.6 7.8-.9 11 2.1v15c-3.2-3-6.8-3.7-11-2.1v-15Z" />
            <path d="M27 8.5c-4.2-1.6-7.8-.9-11 2.1v15c3.2-3 6.8-3.7 11-2.1v-15Z" />
            <path d="M16 10.6v15" />
          </svg>
        </span>
        <span>ruang<span class="brand-light">baca</span></span>
      </a>
      <span class="topbar-note"><span class="status-dot"></span> JURNAL BACA PRIBADI</span>
    </header>

    <section class="intro">
      <div>
        <p class="eyebrow"><span>01</span> — KOLEKSI PRIBADI</p>
        <h1>Satu Rak,<br /><em>Seribu Cerita.</em></h1>
        <p class="intro-copy">
          Bukan tentang seberapa cepat kamu paham, tapi seberapa keras kamu menolak untuk menyerah.
        </p>
      </div>
      <div class="progress-card">
        <div class="progress-top">
          <span class="progress-label">PROGRES MEMBACA</span>
          <span class="progress-icon" aria-hidden="true">✳</span>
        </div>
        <p class="progress-number">{{ completedCount }}<span> / {{ books.length }}</span></p>
        <div class="progress-track" aria-label="Progres buku selesai dibaca">
          <span :style="{ width: books.length ? `${(completedCount / books.length) * 100}%` : '0%' }"></span>
        </div>
        <p class="progress-caption">buku selesai dibaca</p>
      </div>
    </section>

    <section class="workspace" aria-label="Kelola koleksi buku">
      <aside class="form-panel">
        <div class="panel-heading">
          <span class="step-number">A</span>
          <div>
            <p class="eyebrow">TAMBAHKAN KE RAK</p>
            <h2>Buku baru</h2>
          </div>
        </div>

        <form class="book-form" @submit.prevent="addBook">
          <label for="book-title">Judul buku</label>
          <input
            id="book-title"
            v-model="title"
            type="text"
            placeholder="Contoh: The Midnight Library"
            maxlength="80"
            required
          />

          <label for="book-category">Kategori</label>
          <div class="select-wrap">
            <select id="book-category" v-model="category" required>
              <option disabled value="">Pilih kategori</option>
              <option v-for="item in categories" :key="item" :value="item">{{ item }}</option>
            </select>
            <span class="select-chevron" aria-hidden="true">⌄</span>
          </div>

          <label class="checkbox-row">
            <input v-model="isRead" type="checkbox" />
            <span class="custom-checkbox" aria-hidden="true"></span>
            <span>Sudah selesai dibaca</span>
          </label>

          <button class="add-button" type="submit">
            <span>Tambahkan buku</span>
            <span class="button-arrow" aria-hidden="true">↗</span>
          </button>
        </form>

        <div class="form-footnote">
          <span aria-hidden="true">✦</span>
          Koleksi kecil, perjalanan besar.
        </div>
      </aside>

      <section class="collection-panel" aria-label="Daftar koleksi buku">
        <div class="collection-heading">
          <div class="collection-title">
            <span class="step-number">B</span>
            <div>
              <p class="eyebrow">CATATAN BUKUMU</p>
              <h2>Rak bacaan <span class="book-total">{{ books.length }}</span></h2>
            </div>
          </div>
          <span class="shelf-decoration" aria-hidden="true">✳</span>
        </div>

        <div class="filter-row" aria-label="Filter daftar buku">
          <button
            v-for="filter in filters"
            :key="filter"
            class="filter-chip"
            :class="{ 'is-active': activeFilter === filter }"
            type="button"
            :aria-pressed="activeFilter === filter"
            @click="activeFilter = filter"
          >
            {{ filter }}
          </button>
        </div>

        <div v-if="visibleBooks.length" class="book-list">
          <article v-for="(book, index) in visibleBooks" :key="book.id" class="book-card">
            <button
              class="book-state"
              :class="{ 'is-read': book.isRead }"
              type="button"
              :aria-label="book.isRead ? `Tandai ${book.title} belum selesai` : `Tandai ${book.title} selesai`"
              :aria-pressed="book.isRead"
              @click="book.isRead = !book.isRead"
            >
              <svg v-if="book.isRead" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="m5 10 3.2 3.2L15.5 6" />
              </svg>
              <span v-else>{{ String(index + 1).padStart(2, '0') }}</span>
            </button>
            <div class="book-info">
              <h3 :class="{ 'is-completed': book.isRead }">{{ book.title }}</h3>
              <span class="category-label">{{ book.category }}</span>
            </div>
            <span class="reading-status" :class="{ 'is-completed': book.isRead }">
              {{ book.isRead ? 'SELESAI' : 'DALAM PROGRES' }}
            </span>
            <button class="remove-button" type="button" :aria-label="`Hapus ${book.title}`" @click="removeBook(book.id)">
              ×
            </button>
          </article>
        </div>

        <div v-else class="empty-state">
          <span class="empty-icon" aria-hidden="true">↗</span>
          <h3>Belum ada buku di sini.</h3>
          <p>Tambahkan buku baru atau pilih filter lainnya.</p>
        </div>

        <footer class="collection-footer">
          <span>MENYIMPAN CERITA, SATU BUKU SEKALIGUS</span>
          <span>R.B. / 2026</span>
        </footer>
      </section>
    </section>

    <footer class="page-footer">
      <span>RUANG BACA <span class="footer-divider">/</span> JURNAL BUKU DIGITAL</span>
      <span>DIBUAT UNTUK MENEMANI WAKTU BACA</span>
    </footer>
  </main>
</template>
