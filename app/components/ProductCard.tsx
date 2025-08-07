// ====================================================================
// file: components/ProductCard.tsx
// ====================================================================
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export interface Product {
  productId?: number; // penting untuk backend
  name: string;
  description: string;
  size: string;
  price: string;
  image: string;
  isBestSeller: boolean;
}

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const isComingSoon = product.name === "COMING SOON";

  const handleCardClick = () => {
    if (!isComingSoon) {
      router.push(
        `/shop/detail-product?productName=${encodeURIComponent(product.name)}`
      );
    }
  };

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isComingSoon) return;

    // 1️⃣ Simpan ke localStorage dulu
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existingItem = cartItems.find((item: any) => item.name === product.name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({
        ...product,
        quantity: 1,
        selectedSize: "30ML",
      });
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // 2️⃣ Sync ke backend
    try {
      await api.addToCart(product.productId || cartItems.length, "30ML", 1);
      console.log("Item berhasil ditambahkan ke server cart");
    } catch (err: any) {
      console.error("Gagal sync ke server:", err.message);
    }

    // 3️⃣ Redirect ke cart page
    router.push("/cart");
  };

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
          <h3 className="text-xl font-bold text-gray-800 mb-1">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{product.description}</p>
          <p className="text-sm text-gray-400 mb-4">{product.size}</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900 mb-4">{product.price}</p>
          <button
            className="w-full bg-[#C9B37E]  text-white text-lg font-semibold py-3 rounded-full transition-colors duration-300 hover:bg-[#B9A567]"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}
