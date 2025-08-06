// ====================================================================
// file: data/products.ts
// ====================================================================

export interface Product {
  productId: number;
  slug: string;
  name: string;
  description: string;
  size: string;
  price: number;
  isBestSeller: boolean;
  image: string;
}

export const products: Product[] = [
  {
    productId: 1,
    slug: "midnight-cherry",
    name: "MIDNIGHT CHERRY",
    description: "Parfum cherry malam yang elegan dan manis",
    size: "50ml",
    price: 250000,
    isBestSeller: true,
    image: "/images/products/midnight-cherry.jpg",
  },
  {
    productId: 2,
    slug: "or-du-soir",
    name: "OR DU SOIR",
    description: "Parfum malam bernuansa emas yang hangat",
    size: "50ml",
    price: 275000,
    isBestSeller: false,
    image: "/images/products/or-du-soir.jpg",
  },
  {
    productId: 3,
    slug: "citrine-flame",
    name: "CITRINE FLAME",
    description: "Wangian citrus dengan sentuhan hangat",
    size: "50ml",
    price: 260000,
    isBestSeller: true,
    image: "/images/products/citrine-flame.jpg",
  },
];
