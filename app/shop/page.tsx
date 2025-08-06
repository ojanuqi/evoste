"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Product, products } from "@/app/data/products"; // Import dari file terpusat

// Komponen untuk menampilkan satu kartu produk
const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();

  // Fungsi untuk menangani klik pada kartu produk
  const handleCardClick = () => {
    // Navigasi ke halaman detail produk dengan nama produk sebagai parameter URL
    router.push(
      `/shop/detail-product?productName=${encodeURIComponent(product.name)}`
    );
  };

  // Fungsi untuk menangani klik pada tombol "Add to cart"
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Mencegah event klik memicu handleCardClick
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
        selectedSize: product.size === "100ML" ? "50ML" : "30ML", // Default size
      });
    }

    // Simpan data keranjang yang diperbarui ke localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Navigasi ke halaman keranjang
    router.push("/cart");
  };

  // Tampilan normal untuk produk
  return (
    <div
      className="flex flex-col bg-white shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer rounded-none" // Mengubah rounded-xl menjadi rounded-none
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

      <div className="p-6 text-left flex-grow flex flex-col justify-between">
        {" "}
        {/* Mengubah text-center menjadi text-left */}
        <div>
          <p className="text-sm text-gray-400 mb-2">SUMMER LIMITED EDITION</p>{" "}
          {/* Menambahkan teks "SUMMER LIMITED EDITION" */}
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mb-2">{product.description}</p>{" "}
          {/* Mengubah mb-1 menjadi mb-2 */}
          <p className="text-sm text-gray-400 mb-4">{product.size}</p>{" "}
          {/* Mengubah mb-2 menjadi mb-4 */}
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900 mb-4">
            {product.price}
          </p>
          <button
            className="w-full bg-black text-white text-lg font-semibold py-3 rounded-none transition-colors duration-300 hover:bg-gray-700" // Mengubah rounded-full menjadi rounded-none
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

// Komponen untuk menampung grid produk
const ProductGrid = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

// Komponen utama halaman toko
export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 font-sans">
      <div className="max-w-6xl w-full">
        {/* Header dan menu navigasi */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-navy-900 mb-4">
            CHOOSE YOUR FRAGRANCE
          </h1>
          <div className="flex justify-center items-center space-x-4 text-gray-600"></div>
        </header>

        {/* Komponen grid produk */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
