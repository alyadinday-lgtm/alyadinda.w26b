const transaksi = [
    { id: 1, barang: "Kertas lipat", harga: 5000, qty: 3, kategori: "ATK" },
    { id: 2, barang: "Tipe x", harga: 8000, qty: 2, kategori: "ATK" },
    { id: 3, barang: "Pensil", harga: 2000, qty: 5, kategori: "ATK" },
    { id: 4, barang: "Sabun", harga: 4000, qty: 2, kategori: "Kebutuhan" },
    { id: 5, barang: "Sampo", harga: 12000, qty: 1, kategori: "Kebutuhan" },
    { id: 6, barang: "Penggaris", harga: 2000, qty: 4, kategori: "ATK" }
];

const hasilFilter = transaksi.filter(
    ({ kategori }) => kategori === "ATK"
);

const hasilMap = hasilFilter.map(
    ({ id, barang, harga, qty, kategori }) => ({
        id,
        barang,
        harga,
        qty,
        kategori,
        subtotal: harga * qty
    })
);

const total = hasilMap.reduce(
    (jumlah, { subtotal }) => jumlah + subtotal,
    0
);

console.log("=== DATA TRANSAKSI KATEGORI ATK ===");
console.log(hasilMap);

console.log("\n=== TOTAL KESELURUHAN ===");
console.log("Rp" + total.toLocaleString("id-ID"));