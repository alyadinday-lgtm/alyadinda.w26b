# Apotek Sehat — Demo Toko Apotek dengan Vue 3

Mini-SPA untuk latihan katalog produk dan keranjang belanja menggunakan Vue 3, Vue Router, dan Pinia. Semua produk, harga, dan pesanan hanya data simulasi; aplikasi ini bukan layanan apotek dan bukan saran medis.

## Menjalankan proyek

```sh
npm install
npm run dev
```

Buka URL lokal yang dicetak Vite di terminal. Cek build produksi dengan:

```sh
npm run build
```

## Fitur

- Katalog produk contoh dengan pencarian dan filter kategori.
- Menambahkan produk ke keranjang; jumlah item di navigasi diperbarui otomatis.
- Mengubah jumlah barang dan menghapusnya dari keranjang.
- Menghitung subtotal secara reaktif menggunakan Pinia.
- Simulasi checkout tanpa pembayaran atau transaksi nyata.
- Tampilan responsif dan navigasi SPA dengan Vue Router.

## Konsep Vue yang digunakan

- `src/main.js`: memasang Vue, Pinia, dan router.
- `src/data/products.js`: data katalog contoh.
- `src/stores/cart.js`: state keranjang, aksi, dan nilai turunan `computed`.
- `src/components/ProductCard.vue`: komponen produk memakai props dan emit.
- `src/views/HomeView.vue`: pencarian, filter kategori, dan daftar katalog.
- `src/views/CartView.vue`: pengaturan kuantitas dan ringkasan belanja.
- `src/router/index.js`: rute katalog dan keranjang.

## Cara mencoba

1. Cari produk atau pilih kategori pada halaman katalog.
2. Tekan **Tambah**, lalu buka **Keranjang**.
3. Ubah jumlah dengan tombol `+`/`−`, atau hapus produk.
4. Coba **Buat simulasi pesanan** untuk melihat pesan konfirmasi demo.

## Mengumpulkan ke GitHub

Dari folder utama repositori `HTML`, stage hanya folder tugas ini agar perubahan lain tidak ikut:

```sh
git add "tugas 8"
git commit -m "feat: create pharmacy storefront with Vue"
git push origin main
```

Pastikan repositori GitHub bersifat **Public**, lalu kirim tautannya ke LMS.
