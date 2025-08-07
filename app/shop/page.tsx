"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Product, products } from "@/app/data/products";

// Komponen untuk menampilkan satu kartu produk
const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();
  const isComingSoon = product.name === "COMING SOON";

  const handleCardClick = () => {
    if (!isComingSoon) {
      router.push(
        `/shop/detail-product?productName=${encodeURIComponent(product.name)}`
      );
    }
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isComingSoon) {
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

      const existingItem = cartItems.find(
        (item: any) => item.name === product.name
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.push({
          ...product,
          quantity: 1,
          selectedSize: product.size === "100ML" ? "50ML" : "30ML",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
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
          <p className="text-sm text-gray-400 mb-2">SUMMER LIMITED EDITION</p>
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
            className="w-full bg-[#C9B37E] text-white text-lg font-semibold py-3 rounded-full transition-colors duration-300 hover:bg-[#B9A567]"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

// Komponen grid produk
const ProductGrid = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

// Halaman utama toko
export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 font-sans">
      <div className="max-w-6xl w-full">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-navy-900 mb-4">
            CHOOSE YOUR FRAGRANCE
          </h1>
          <div className="flex justify-center items-center space-x-4 text-gray-600"></div>
        </header>

        <ProductGrid products={products} />
      </div>
    </div>
  );
}
