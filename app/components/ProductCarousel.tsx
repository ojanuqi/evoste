"use client"; // Pastikan ini ada karena kita menggunakan state dan ref

import { useRef } from "react";
import ProductCard from "./ProductCard";

// Data produk yang diperbarui berdasarkan gambar
const products = [
  {
    name: "Midnight Cherry",
    type: "Black Cherry | Vanilla",
    price: "Rp 329,000",
  },
  { name: "Ivory Bloom", type: "Lychee | Vanilla", price: "Rp 319,000" },
  { name: "Citrine Flame", type: "Bergamot | Vetiver", price: "Rp 349,000" },
  {
    name: "Oud Legendaire",
    type: "Passionfruit | Agarwood",
    price: "Rp 379,000",
  },
  {
    name: "Or du Soir",
    type: "Amaretto | Bourbon Vanilla",
    price: "Rp 369,000",
  },
];

export default function ProductCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (scrollOffset: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <div className="relative group">
      {/* Tombol Scroll Kiri */}
      <button
        onClick={() => scroll(-300)}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-4"
      >
        &#9664;
      </button>

      {/* Kontainer Produk yang Bisa di Scroll */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-4 p-4 scrollbar-hide justify-center"
      >
        {products.map((product, index) => (
          <div key={index} className="snap-center flex-shrink-0">
            <ProductCard
              name={product.name}
              type={product.type}
              price={product.price}
            />
          </div>
        ))}
      </div>

      {/* Tombol Scroll Kanan */}
      <button
        onClick={() => scroll(300)}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-4"
      >
        &#9654;
      </button>
    </div>
  );
}
