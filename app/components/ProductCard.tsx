// ====================================================================
// file: components/ProductCard.tsx
// ====================================================================
"use client";

import React from "react";
import { useRouter } from "next/navigation";

// Mendefinisikan interface untuk tipe data produk agar konsisten
export interface Product {
  name: string;
  description: string;
  size: string;
  price: string;
  image: string;
  isBestSeller: boolean;
}

// Export default komponen ProductCard
export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const isComingSoon = product.name === "COMING SOON";

  // Fungsi untuk menangani klik pada kartu produk
  const handleCardClick = () => {
    if (!isComingSoon) {
      // Navigasi ke halaman detail produk dengan nama produk sebagai parameter URL
      router.push(
        `/shop/detail-product?productName=${encodeURIComponent(product.name)}`
      );
    }
  };

  // Fungsi untuk menangani klik pada tombol "Add to cart"
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Mencegah event klik memicu handleCardClick

    if (!isComingSoon) {
      // Dapatkan data keranjang yang ada atau inisialisasi array kosong
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

      // Periksa apakah produk sudah ada di keranjang
      const existingItem = cartItems.find(
        (item: any) => item.name === product.name
      );

      if (existingItem) {
        // Jika produk sudah ada, tambahkan kuantitasnya
        existingItem.quantity += 1;
      } else {
        // Jika produk belum ada, tambahkan produk baru ke keranjang
        cartItems.push({
          ...product,
          quantity: 1,
          selectedSize: "30ML", // Default size saat ditambahkan dari homepage
        });
      }

      // Simpan data keranjang yang diperbarui ke localStorage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      // Navigasi ke halaman keranjang
      router.push("/cart");
    }
  };

  if (isComingSoon) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <div className="w-full h-80 bg-gray-200 rounded-md flex items-center justify-center">
          <span className="text-xl font-bold text-gray-500">COMING SOON</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).src =
              "https://placehold.co/400x400/E5E7EB/9CA3AF?text=Product+Image";
          }}
        />
        {product.isBestSeller && (
          <div className="absolute top-4 left-4 bg-black text-white text-xs font-semibold px-2 py-1 rounded-full">
            BEST-SELLER
          </div>
        )}
      </div>

      <div className="p-6 text-center flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mb-2">{product.description}</p>
          <p className="text-sm text-gray-400 mb-4">{product.size}</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900 mb-4">
            {product.price}
          </p>
          <button
            className="w-full bg-black text-white text-lg font-semibold py-3 rounded-full transition-colors duration-300 hover:bg-gray-700"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}
