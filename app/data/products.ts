// Mendefinisikan interface untuk tipe data produk
export interface Product {
  name: string;
  description: string;
  size: string;
  price: string;
  image: string;
  isBestSeller: boolean;
  category?: string; // Menambahkan kategori produk untuk fitur rekomendasi (opsional)
  stock?: number;    // Menambahkan stok produk jika diperlukan
  rating?: number;   // Menambahkan rating untuk produk jika diperlukan
}

// Data produk untuk ditampilkan di halaman toko
export const products: Product[] = [
  {
    name: "Midnight Cherry",
    description: "Aroma buah, manis, menggoda, cocok untuk malam hari.",
    size: "50ML",
    price: "RP 299.000",
    image: "/parfum/Midnight Cherry.jpg",
    isBestSeller: true,
    category: "Fruity",  // Kategori aroma, bisa digunakan untuk filter atau rekomendasi
    stock: 50,           // Menambahkan stok produk
    rating: 4.5,         // Rating produk, bisa digunakan untuk menampilkan ulasan
  },
  {
    name: "Ivory Bloom",
    description: "Aroma floral, ringan, elegan, cocok untuk siang hari.",
    size: "50ML",
    price: "RP 299.000",
    image: "/parfum/Ivory Bloom.jpg",
    isBestSeller: false,
    category: "Floral",
    stock: 40,
    rating: 4.0,
  },
  {
    name: "Citrine Flame",
    description: "Aroma citrus, segar, energik, cocok untuk aktivitas.",
    size: "50ML",
    price: "RP 299.000",
    image: "/parfum/Citrine Flame.jpg",
    isBestSeller: true,
    category: "Citrus",
    stock: 60,
    rating: 4.7,
  },
  {
    name: "Oud Legendaire",
    description: "Aroma woody, kuat, mewah, cocok untuk acara formal.",
    size: "50ML",
    price: "RP 299.000",
    image: "/parfum/Oud Legendaire.jpg",
    isBestSeller: false,
    category: "Woody",
    stock: 30,
    rating: 4.2,
  },
  {
    name: "Or du Soir",
    description:
      "Aroma oriental/spicy, sensual, eksotis, cocok untuk malam & pesta.",
    size: "50ML",
    price: "RP 299.000",
    image: "/parfum/Or du Soir.jpg",
    isBestSeller: true,
    category: "Spicy",
    stock: 70,
    rating: 4.8,
  },
];
