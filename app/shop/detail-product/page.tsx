"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Product, products } from "@/app/data/products"; // Import dari file terpusat

export default function DetailProductPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productName = searchParams.get("productName");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("30ML"); // Inisialisasi dengan string kosong
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    // Cari produk berdasarkan nama dari URL
    const product = products.find((p) => p.name === productName);
    setSelectedProduct(product || null);
  }, [productName]);

  if (!selectedProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-bold text-gray-700">
          Produk tidak ditemukan!
        </p>
      </div>
    );
  }

  // Fungsi untuk mendapatkan harga per unit berdasarkan ukuran yang dipilih
  const getUnitPrice = () => {
    if (selectedSize === "30ML") return 199000;
    if (selectedSize === "50ML") return 299000;
    return 0;
  };

  const getFormattedPrice = (price: number) => {
    return `RP ${price.toLocaleString("id-ID")}`;
  };

  const totalPrice = getUnitPrice() * quantity;

  const handleQuantityChange = (type: "increment" | "decrement") => {
    setQuantity((prev) =>
      type === "increment" ? prev + 1 : prev > 1 ? prev - 1 : 1
    );
  };

  const handleAddToCart = () => {
    // Dapatkan data keranjang yang ada atau inisialisasi array kosong
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

    // Periksa apakah produk sudah ada di keranjang dengan ukuran yang sama
    const existingItem = cartItems.find(
      (item: any) =>
        item.name === selectedProduct.name && item.selectedSize === selectedSize
    );

    if (existingItem) {
      // Jika produk sudah ada, tambahkan kuantitasnya
      existingItem.quantity += quantity;
    } else {
      // Jika produk belum ada, tambahkan produk baru ke keranjang
      cartItems.push({
        ...selectedProduct,
        quantity,
        selectedSize,
        price: totalPrice,
      });
    }

    // Simpan data keranjang yang diperbarui ke localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Navigasi ke halaman keranjang
    router.push("/cart");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 font-sans">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Kolom Kiri: Gambar Produk */}
        {/* Menambahkan h-full pada div parent untuk memungkinkan gambar mengisi tinggi */}
        <div className="flex justify-center items-center h-full">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            // Mengubah kelas agar gambar mengisi tinggi dan lebarnya menyesuaikan
            className="w-full h-full object-cover rounded-lg shadow-xl"
            onError={(e) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src =
                "https://placehold.co/600x600/E5E7EB/9CA3AF?text=Product+Image";
            }}
          />
        </div>

        {/* Kolom Kanan: Detail Produk */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
            {selectedProduct.name}
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {selectedProduct.description}
          </p>
          <p className="text-3xl font-bold text-gray-900 mb-6">
            {getFormattedPrice(totalPrice)}
          </p>

          {/* Opsi Ukuran */}
          <div className="mb-6">
            <h4 className="text-xl font-bold text-gray-800 mb-2">
              Pilih Ukuran
            </h4>
            <div className="flex justify-center md:justify-start space-x-4">
              {["30ML", "50ML"].map((size) => (
                <button
                  key={size}
                  className={`py-2 px-6 rounded-full border-2 transition-colors duration-200 ${
                    selectedSize === size
                      ? "bg-[#C9B37E] text-white "
                      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Kuantitas */}
          <div className="mb-8">
            <h4 className="text-xl font-bold text-gray-800 mb-2">Kuantitas</h4>
            <div className="flex items-center justify-center md:justify-start space-x-4">
              <button
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold hover:bg-gray-300"
                onClick={() => handleQuantityChange("decrement")}
              >
                -
              </button>
              <span className="text-xl font-bold text-gray-800">
                {quantity}
              </span>
              <button
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold hover:bg-gray-300"
                onClick={() => handleQuantityChange("increment")}
              >
                +
              </button>
            </div>
          </div>

          {/* Tombol */}
          <div>
            <button
              className="w-full md:w-auto bg-[#C9B37E] text-white text-lg font-semibold py-4 px-12 rounded-full hover:bg-[#A89467]"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
