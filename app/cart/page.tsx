"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";

// Mendefinisikan interface untuk tipe data produk
interface Product {
  name: string;
  description: string;
  size: string;
  price: string;
  image: string;
  isBestSeller: boolean;
}

// Data produk untuk ditampilkan (gambar diperbarui ke path lokal)
const products: Product[] = [
  {
    name: "Midnight Cherry",
    description: "Aroma buah, manis, menggoda, cocok untuk malam hari.",
    size: "50ML",
    price: "RP 299.000",
    image: "/parfum/Midnight Cherry.jpg", // Path gambar lokal
    isBestSeller: true,
  },
  {
    name: "Ivory Bloom",
    description: "Aroma floral, ringan, elegan, cocok untuk siang hari.",
    size: "50ML",
    price: "RP 299.000",
    image: "/parfum/Ivory Bloom.jpg", // Path gambar lokal
    isBestSeller: false,
  },
  {
    name: "Citrine Flame",
    description: "Aroma citrus, segar, energik, cocok untuk aktivitas.",
    size: "50ML",
    price: "RP 299.000",
    image: "/parfum/Citrine Flame.jpg", // Path gambar lokal
    isBestSeller: true,
  },
  {
    name: "Oud Legendaire",
    description: "Aroma woody, kuat, mewah, cocok untuk acara formal.",
    size: "50ML",
    price: "RP 299.000",
    image: "/parfum/Oud Legendaire.jpg", // Path gambar lokal
    isBestSeller: false,
  },
  {
    name: "Or du Soir",
    description:
      "Aroma oriental/spicy, sensual, eksotis, cocok untuk malam & pesta.",
    size: "50ML",
    price: "RP 299.000",
    image: "/parfum/Or du Soir.jpg", // Path gambar lokal
    isBestSeller: true,
  },
];

// Interface untuk item di keranjang
interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

// Interface untuk props komponen Modal
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// Komponen Modal kustom
const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
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
        <p className="text-center font-serif text-lg text-gray-800 mt-4">
          {children}
        </p>
      </div>
    </div>
  );
};

// Komponen utama CartPage
const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  // Mendapatkan cart items dari localStorage atau API
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Ambil token dari localStorage
        const res = await fetch("/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`, // Kirim token untuk autentikasi
          },
        });

        if (!res.ok) {
          const savedCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
          setCartItems(savedCart);
        } else {
          const data = await res.json();
          setCartItems(data.items);
        }
      } catch (error) {
        const savedCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
        setCartItems(savedCart);
      }
    };

    fetchCart();
  }, []);

  // Mengupdate cartItems dan localStorage
  const updateCart = (updatedItems: CartItem[]) => {
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems)); // Simpan ke localStorage
    // Kirim ke API
    const token = localStorage.getItem("authToken");
    fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({ items: updatedItems }),
    });
  };

  // Fungsi untuk mengubah kuantitas item
  const handleQuantityChange = (index: number, type: "increment" | "decrement") => {
    const updatedItems = [...cartItems];
    if (type === "increment") {
      updatedItems[index].quantity += 1;
    } else if (type === "decrement") {
      updatedItems[index].quantity = Math.max(1, updatedItems[index].quantity - 1);
    }
    updateCart(updatedItems);
  };

  // Fungsi untuk mengubah ukuran produk
  const handleSizeChange = (index: number, size: string) => {
    const updatedItems = [...cartItems];
    updatedItems[index].selectedSize = size;
    updateCart(updatedItems);
  };

  // Fungsi untuk menghapus item dari keranjang
  const handleRemoveItem = (index: number) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    updateCart(updatedItems);
  };

  // Fungsi untuk menambahkan item ke keranjang (Add to Cart)
  const handleAddToCart = (product: Product) => {
    const cartItems: CartItem[] = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existingItem = cartItems.find(
      (item: CartItem) => item.name === product.name
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({
        ...product,
        quantity: 1,
        selectedSize: "30ML", // Default size saat ditambahkan
      });
    }

    updateCart(cartItems); // Update cart di localStorage dan API
  };

  // Menghitung subtotal
  const getUnitPrice = (size: string) => {
    if (size === "30ML") return 199000;
    if (size === "50ML") return 299000;
    return 0;
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + getUnitPrice(item.selectedSize) * item.quantity, 0);
  }, [cartItems]);

  const getFormattedPrice = (price: number) => {
    return `RP ${price.toLocaleString("id-ID")}`;
  };

  const handleApplyPromoCode = () => {
    if (promoCode.toLowerCase() === "diskon") {
      setDiscountAmount(100000);
      setModalMessage("Kode promo berhasil diterapkan! Anda mendapatkan potongan harga RP 100,000.");
    } else {
      setDiscountAmount(0);
      setModalMessage("Kode promo tidak valid atau tidak ditemukan.");
    }
    setIsModalOpen(true);
  };

  const finalTotal = Math.max(0, subtotal - discountAmount);

  return (
    <div className="min-h-screen bg-white py-12 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3 space-y-8">
            <h1 className="text-4xl font-serif font-bold text-center lg:text-left text-gray-800">
              SHOPPING CART
            </h1>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} className="flex items-start gap-6 border-b border-gray-200 py-6 rounded-none">
                  <div className="flex-shrink-0 w-24 h-24">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-none" />
                  </div>
                  <div className="flex-grow flex justify-between items-start">
                    <div className="flex flex-col gap-2 text-left">
                      <h3 className="text-xl font-serif text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                      <div className="flex space-x-2 mt-2">
                        {["30ML", "50ML"].map((size) => (
                          <button
                            key={size}
                            onClick={() => handleSizeChange(index, size)}
                            className={`py-1 px-3 text-xs rounded-full border-2 ${item.selectedSize === size ? "bg-black text-white border-black" : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          className="w-8 h-8 flex items-center justify-center text-lg font-bold"
                          onClick={() => handleQuantityChange(index, "decrement")}
                        >
                          -
                        </button>
                        <span className="text-md font-bold text-gray-800">{item.quantity}</span>
                        <button
                          className="w-8 h-8 flex items-center justify-center text-lg font-bold"
                          onClick={() => handleQuantityChange(index, "increment")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 text-right">
                      <button className="text-gray-400 hover:text-gray-700 transition-colors duration-200" onClick={() => handleRemoveItem(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <p className="text-md font-bold text-gray-900 mt-2">
                        {getFormattedPrice(getUnitPrice(item.selectedSize) * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-500">Keranjang Anda kosong.</p>
                <Link href="/shop" className="mt-4 inline-block text-blue-500 hover:underline">
                  Mulai berbelanja
                </Link>
              </div>
            )}
          </div>

          <div className="lg:w-1/3 p-6 h-fit lg:sticky lg:top-24 self-start bg-white shadow-md rounded-none">
            <div className="space-y-4">
              <div className="flex justify-between text-lg text-gray-600 font-serif">
                <span>Subtotal</span>
                <span>{getFormattedPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-lg text-gray-600 font-serif">
                <span>TOTAL</span>
                <span>{getFormattedPrice(finalTotal)}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Tax and shipping costs will be calculated according to your delivery address.
            </p>
            <div className="mt-8">
              <h3 className="text-md text-gray-800 mb-2 font-serif">ENTER PROMOTION CODE</h3>
              <div className="flex border-b border-gray-400 pb-2">
                <input
                  type="text"
                  className="flex-grow bg-transparent focus:outline-none placeholder-gray-400 font-serif"
                  placeholder=""
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button
                  onClick={handleApplyPromoCode}
                  className="text-gray-800 font-semibold ml-2 text-sm"
                >
                  APPLY
                </button>
              </div>
            </div>
            <button
              onClick={() => {}}
              className="w-full bg-black text-white text-lg font-semibold py-4 mt-8 rounded-none transition-colors duration-300 hover:bg-gray-700 font-serif"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-serif font-bold text-center text-gray-800 mb-8">
            YOU MAY ALSO LIKE
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="flex flex-col bg-white shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer rounded-none"
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
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{product.description}</p>
                  <p className="text-sm text-gray-400 mb-4">{product.size}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-4">
                    {product.price}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-black text-white text-lg font-semibold py-3 rounded-none transition-colors duration-300 hover:bg-gray-700"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalMessage}
      </Modal>
    </div>
  );
};

export default CartPage;
