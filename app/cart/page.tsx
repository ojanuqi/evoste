"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Modal from "@/app/components/modal"; // Import komponen Modal kustom
import { Product } from "@/app/data/products"; // Import dari file terpusat

// Antarmuka untuk item di keranjang
interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export default function CartPage() {
  // State untuk menyimpan item di keranjang, kode promo, dan jumlah diskon
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState<string>("");
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    // Ambil item dari localStorage saat komponen dimuat
    const savedCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(savedCart);
  }, []);

  // Fungsi untuk memperbarui item di keranjang dan localStorage
  const updateCart = (updatedItems: CartItem[]) => {
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  // Fungsi untuk mengubah kuantitas item
  const handleQuantityChange = (
    index: number,
    type: "increment" | "decrement"
  ) => {
    const updatedItems = [...cartItems];
    if (type === "increment") {
      updatedItems[index].quantity += 1;
    } else {
      updatedItems[index].quantity = Math.max(
        1,
        updatedItems[index].quantity - 1
      );
    }
    updateCart(updatedItems);
  };

  // Fungsi untuk menghapus item dari keranjang
  const handleRemoveItem = (index: number) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    updateCart(updatedItems);
  };

  // Fungsi untuk mengubah ukuran produk
  const handleSizeChange = (index: number, size: string) => {
    const updatedItems = [...cartItems];
    updatedItems[index].selectedSize = size;
    updateCart(updatedItems);
  };

  // Fungsi untuk mendapatkan harga per unit berdasarkan ukuran
  const getUnitPrice = (size: string) => {
    if (size === "30ML") return 199000;
    if (size === "50ML") return 299000;
    return 0; // Default price, should not happen
  };

  // Menggunakan useMemo untuk menghindari perhitungan ulang subtotal yang tidak perlu
  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + getUnitPrice(item.selectedSize) * item.quantity,
      0
    );
  }, [cartItems]);

  const getFormattedPrice = (price: number) => {
    return `RP ${price.toLocaleString("id-ID")}`;
  };

  // Fungsi untuk menerapkan kode promo
  const handleApplyPromoCode = () => {
    if (promoCode.toLowerCase() === "diskon") {
      setDiscountAmount(100000);
      setModalMessage(
        "Kode promo berhasil diterapkan! Anda mendapatkan potongan harga RP 100,000."
      );
    } else {
      setDiscountAmount(0);
      setModalMessage("Kode promo tidak valid atau tidak ditemukan.");
    }
    setIsModalOpen(true);
  };

  // Hitung total akhir setelah diskon
  const finalTotal = Math.max(0, subtotal - discountAmount);

  // Fungsi untuk checkout
  const handleCheckout = () => {
    console.log("Melakukan checkout dengan item:", cartItems);
    console.log("Promo Code:", promoCode);
    console.log("Total Akhir:", finalTotal);

    setModalMessage(
      "Proses checkout dimulai! Anda akan diarahkan ke halaman pembayaran."
    );
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-center mb-12">
          YOUR CART
        </h1>
        <div className="flex flex-col md:flex-row gap-12">
          {/* Kolom Kiri: Daftar Produk */}
          <div className="md:w-2/3 space-y-6">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row items-center gap-6"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/96x96/E5E7EB/9CA3AF?text=Product";
                      }}
                    />
                  </div>
                  <div className="flex-grow flex flex-col sm:flex-row items-center justify-between w-full text-center sm:text-left">
                    <div className="flex-grow mb-4 sm:mb-0">
                      <h3 className="text-xl font-bold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-md text-gray-500">
                        {item.description}
                      </p>
                      <p className="text-lg font-bold text-gray-900 mt-2">
                        {getFormattedPrice(
                          getUnitPrice(item.selectedSize) * item.quantity
                        )}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                      {/* Opsi Ukuran */}
                      <div className="flex space-x-2">
                        {["30ML", "50ML"].map((size) => (
                          <button
                            key={size}
                            className={`py-1 px-4 text-sm rounded-full border-2 ${
                              item.selectedSize === size
                                ? "bg-black text-white border-black"
                                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                            }`}
                            onClick={() => handleSizeChange(index, size)}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                      {/* Pengatur Kuantitas */}
                      <div className="flex items-center space-x-2">
                        <button
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-md font-bold hover:bg-gray-300"
                          onClick={() =>
                            handleQuantityChange(index, "decrement")
                          }
                        >
                          -
                        </button>
                        <span className="text-md font-bold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-md font-bold hover:bg-gray-300"
                          onClick={() =>
                            handleQuantityChange(index, "increment")
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {/* Tombol Hapus */}
                    <button
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-12 bg-white rounded-xl shadow-md">
                <p className="text-xl text-gray-500">Keranjang Anda kosong.</p>
                <Link
                  href="/shop"
                  className="mt-4 inline-block text-blue-500 hover:underline"
                >
                  Mulai berbelanja
                </Link>
              </div>
            )}
          </div>

          {/* Kolom Kanan: Ringkasan Keranjang */}
          <div className="md:w-1/3 bg-white rounded-xl shadow-md p-6 h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              ORDER SUMMARY
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between text-lg text-gray-600">
                <span>Subtotal</span>
                <span>{getFormattedPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-lg text-gray-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-lg text-green-600 font-semibold">
                  <span>Diskon</span>
                  <span>- {getFormattedPrice(discountAmount)}</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-4 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>{getFormattedPrice(finalTotal)}</span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Enter promotion code
              </h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  className="flex-grow border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-900"
                  placeholder="Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button
                  onClick={handleApplyPromoCode}
                  className="bg-gray-200 text-gray-800 font-semibold rounded-full px-4 py-2 hover:bg-gray-300 transition-colors duration-200"
                >
                  APPLY
                </button>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white text-lg font-semibold py-4 mt-8 rounded-full transition-colors duration-300 hover:bg-gray-700"
            >
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalMessage}
      </Modal>
    </div>
  );
}
