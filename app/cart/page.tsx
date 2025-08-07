"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { addToCart } from "@/lib/cartApi";
// Import Product dari file terpusat (sudah ada)
// import { Product } from "@/app/data/products"; // Ini akan dihapus karena Product sudah didefinisikan di sini

// Mendefinisikan interface untuk tipe data produk
interface Product {
  name: string;
  description: string;
  size: string; // Properti size ini mungkin perlu diubah menjadi sizes: ProductSize[] jika data produk diubah
  price: string; // Properti price ini mungkin perlu diubah jika menggunakan sizes
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

// Interface untuk props komponen ProductCard
interface ProductCardProps {
  product: Product;
}

// Komponen ProductCard (untuk bagian "YOU MAY ALSO LIKE")
const ProductCard = ({ product }: ProductCardProps) => {
  const isComingSoon = product.name === "COMING SOON";

  const handleCardClick = () => {
    if (!isComingSoon) {
      console.log(`Navigating to product detail for: ${product.name}`);
      // Menggunakan window.location.href karena next/navigation/router tidak tersedia di sini
      window.location.href = `/shop/detail-product?productName=${encodeURIComponent(
        product.name
      )}`;
    }
  };

const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.stopPropagation();
  if (!isComingSoon) {
    const cartItems: CartItem[] = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existingItem = cartItems.find((item) => item.name === product.name);

<<<<<<< HEAD
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.push({
          ...product,
          quantity: 1,
          selectedSize: "30ML", // Default size saat ditambahkan dari homepage
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      console.log("Product added to cart:", product.name);
      // Navigasi ke halaman keranjang
      window.location.href = "/cart";
=======
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1, selectedSize: "30ML" });
>>>>>>> main
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Panggil API addToCart
    await addToCart({ ...product, quantity: 1, selectedSize: "30ML" }, localStorage.getItem("token"));

    window.location.href = "/cart";
  }
};

  if (isComingSoon) {
    return (
      <div className="bg-white rounded-none shadow-md p-4 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <div className="w-full h-80 bg-gray-200 rounded-none flex items-center justify-center">
          <span className="text-xl font-bold text-gray-500">COMING SOON</span>
        </div>
      </div>
    );
  }

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

// Interface untuk props komponen ProductGrid
interface ProductGridProps {
  products: Product[];
}

// Komponen ProductGrid
const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

// Komponen utama CartPage
const CartPage = () => {
  // State untuk menyimpan item di keranjang, kode promo, dan jumlah diskon
  const [token, setToken] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState<string>("");
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  const api = {
  addToCart: async (item: CartItem) => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          name: item.name,
          selectedSize: item.selectedSize,
          quantity: item.quantity,
        }),
      });
      return res.ok;
    } catch (err) {
      console.error("API addToCart error:", err);
      return false;
    }
  },
  updateCartItem: async (item: CartItem) => {
    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          name: item.name,
          selectedSize: item.selectedSize,
          quantity: item.quantity,
        }),
      });
      return res.ok;
    } catch (err) {
      console.error("API updateCartItem error:", err);
      return false;
    }
  },
  removeCartItem: async (name: string, selectedSize: string) => {
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          name,
          selectedSize,
        }),
      });
      return res.ok;
    } catch (err) {
      console.error("API removeCartItem error:", err);
      return false;
    }
  },
};


  // Fungsi untuk memperbarui item di keranjang dan localStorage
  const updateCart = (updatedItems: CartItem[]) => {
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  // Fungsi untuk mengubah kuantitas item
const handleQuantityChange = async (
  index: number,
  type: "increment" | "decrement"
) => {
  const updatedItems = [...cartItems];
  if (type === "increment") {
    updatedItems[index].quantity += 1;
  } else {
    updatedItems[index].quantity = Math.max(1, updatedItems[index].quantity - 1);
  }
  updateCart(updatedItems);
  await api.updateCartItem(updatedItems[index]);
};

  // Fungsi untuk menghapus item dari keranjang
const handleRemoveItem = async (index: number) => {
  const removedItem = cartItems[index];
  const updatedItems = cartItems.filter((_, i) => i !== index);
  updateCart(updatedItems);
  await api.removeCartItem(removedItem.name, removedItem.selectedSize);
};

  // Fungsi untuk mengubah ukuran produk
const handleSizeChange = async (index: number, size: string) => {
  const updatedItems = [...cartItems];
  updatedItems[index].selectedSize = size;
  updateCart(updatedItems);
  await api.updateCartItem(updatedItems[index]);
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
    <div className="min-h-screen bg-white py-12 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Konten Utama Keranjang */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Kolom Kiri: Daftar Produk */}
          <div className="lg:w-2/3 space-y-8">
            <h1 className="text-4xl font-serif font-bold text-center lg:text-left text-gray-800">
              SHOPPING CART {/* Mengubah "YOUR CART" menjadi "SHOPPING CART" */}
            </h1>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-6 border-b border-gray-200 py-6 rounded-none" // Mengubah rounded-xl menjadi rounded-none
                >
                  <div className="flex-shrink-0 w-24 h-24">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-none" // Mengubah rounded-lg menjadi rounded-none
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/96x96/E5E7EB/9CA3AF?text=Product";
                      }}
                    />
                  </div>
                  {/* Product Details & Controls */}
                  <div className="flex-grow flex justify-between items-start">
                    <div className="flex flex-col gap-2 text-left">
                      {" "}
                      {/* Menambahkan text-left */}
                      <h3 className="text-xl font-serif text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                      {/* Opsi Ukuran - Dikembalikan */}
                      <div className="flex space-x-2 mt-2">
                        {["30ML", "50ML"].map((size) => (
                          <button
                            key={size}
                            onClick={() => handleSizeChange(index, size)}
                            className={`py-1 px-3 text-xs rounded-full border-2 ${
                              item.selectedSize === size
                                ? "bg-black text-white border-black"
                                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                      {/* Pengatur Kuantitas - Dikembalikan */}
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          className="w-8 h-8 flex items-center justify-center text-lg font-bold"
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
                          className="w-8 h-8 flex items-center justify-center text-lg font-bold"
                          onClick={() =>
                            handleQuantityChange(index, "increment")
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {/* Price & Remove Button */}
                    <div className="flex flex-col items-end gap-2 text-right">
                      <button
                        className="text-gray-400 hover:text-gray-700 transition-colors duration-200"
                        onClick={() => handleRemoveItem(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
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
                      <p className="text-md font-bold text-gray-900 mt-2">
                        {getFormattedPrice(
                          getUnitPrice(item.selectedSize) * item.quantity
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
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
          <div className="lg:w-1/3 p-6 h-fit lg:sticky lg:top-24 self-start bg-white shadow-md rounded-none">
            {" "}
            {/* Mengubah rounded-xl menjadi rounded-none */}
            <div className="space-y-4">
              <div className="flex justify-between text-lg text-gray-600 font-serif">
                <span>Subtotal</span>
                <span>{getFormattedPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-lg text-green-600 font-semibold">
                  <span>Diskon</span>
                  <span>- {getFormattedPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg text-gray-600 font-serif">
                <span>TOTAL</span>
                <span>{getFormattedPrice(finalTotal)}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Tax and shipping costs will be calculated according to your
              delivery address.
            </p>
            <div className="mt-8">
              <h3 className="text-md text-gray-800 mb-2 font-serif">
                ENTER PROMOTION CODE
              </h3>
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
              onClick={handleCheckout}
              className="w-full bg-black text-white text-lg font-semibold py-4 mt-8 rounded-none transition-colors duration-300 hover:bg-gray-700 font-serif" // Mengubah rounded-full menjadi rounded-none
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>

        {/* Bagian Baru: Produk Rekomendasi */}
        <div className="mt-20">
          <h2 className="text-3xl font-serif font-bold text-center text-gray-800 mb-8">
            YOU MAY ALSO LIKE
          </h2>
          <ProductGrid products={products} />
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalMessage}
      </Modal>
    </div>
  );
};

// Komponen utama yang akan dirender
export default function App() {
  return <CartPage />;
}