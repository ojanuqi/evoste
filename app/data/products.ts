// Mendefinisikan interface untuk tipe data produk
export interface Product {
  name: string;
  description: string;
  size: string;
  price: string;
  image: string;
  isBestSeller: boolean;
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
  },
  {
    name: "Ivory Bloom",
    description: "Aroma floral, ringan, elegan, cocok untuk siang hari.",
    size: "50ML",
    price: "RP 299.000",
    image: "/parfum/Ivory Bloom.jpg",
    isBestSeller: false,
  },
  {
    name: "Citrine Flame",
    description: "Aroma citrus, segar, energik, cocok untuk aktivitas.",
    size: "50ML",
    price: "RP 299.000",
    image: "/parfum/Citrine Flame.jpg",
    isBestSeller: true,
  },
  {
    name: "Oud Legendaire",
    description: "Aroma woody, kuat, mewah, cocok untuk acara formal.",
    size: "50ML",
    price: "RP 299.000",
    image: "/parfum/Oud Legendaire.jpg",
    isBestSeller: false,
  },
  {
    name: "Or du Soir",
    description:
      "Aroma oriental/spicy, sensual, eksotis, cocok untuk malam & pesta.",
    size: "50ML",
    price: "RP 299.000",
    image: "/parfum/Or du Soir.jpg",
    isBestSeller: true,
  },
];
