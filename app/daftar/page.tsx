"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(""); // State untuk pesan notifikasi
  const router = useRouter(); // Inisialisasi router

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Kata sandi dan konfirmasi tidak cocok!");
      return;
    }

    const newUser = { firstName, lastName, email, password };

    // Simpan ke localStorage
    localStorage.setItem("evoste-user", JSON.stringify(newUser));

    setMessage("Pendaftaran berhasil! Mengarahkan ke halaman login...");
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#F8F5EF" }}
    >
      <div className="flex flex-col items-center justify-center p-8 md:p-12 w-full">
        {/* Logo dan Tagline */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold text-gray-800">
            EVOSTE
          </h1>
          <p className="text-md italic font-sans mt-2 text-gray-700">
            Your scent. Their memory. Forever.
          </p>
        </div>

        {/* Form Pendaftaran */}
        <div className="bg-white p-8 md:p-12 shadow-md rounded-none w-full max-w-2xl">
          <form onSubmit={handleRegister} className="space-y-6">
            {/* Pesan Notifikasi */}
            {message && (
              <div
                className={`px-4 py-3 rounded-none relative text-sm text-center ${
                  message.includes("berhasil")
                    ? "bg-green-100 border border-green-400 text-green-700"
                    : "bg-red-100 border border-red-400 text-red-700"
                }`}
              >
                {message}
              </div>
            )}

            {/* First Name Input */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Masukkan nama depan Anda di sini"
                className="w-full px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:ring-1 focus:ring-gray-500"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            {/* Last Name Input */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Masukkan nama belakang Anda di sini"
                className="w-full px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:ring-1 focus:ring-gray-500"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Masukkan alamat email Anda yang valid di sini"
                className="w-full px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:ring-1 focus:ring-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Buat kata sandi baru Anda di sini"
                className="w-full px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:ring-1 focus:ring-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Ulangi Password Input */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Ulangi Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Ulangi kata sandi Anda di sini"
                className="w-full px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:ring-1 focus:ring-gray-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Daftar Button */}
            <button
              type="submit"
              className="w-full bg-[#C9B37E] text-white text-lg font-semibold py-3 rounded-none hover:bg-[#A89467] transition-colors duration-300"
            >
              DAFTAR
            </button>
          </form>

          {/* Link Login */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Sudah Punya Akun?{" "}
            <Link
              href="../login" // Mengarahkan kembali ke halaman login
              className="text-black font-semibold hover:underline"
            >
              Login di Sini!
            </Link>
          </p>

          {/* Separator */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="px-4 text-gray-500 text-sm">Atau</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Sign With Google Button (opsional, bisa dihapus jika tidak diperlukan) */}
          <button className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-semibold py-3 rounded-none hover:bg-gray-50 transition-colors duration-300">
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google icon"
              className="w-5 h-5 mr-3"
            />
            Daftar Dengan Google
          </button>
        </div>
      </div>
    </div>
  );
}
