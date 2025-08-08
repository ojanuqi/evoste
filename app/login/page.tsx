"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State untuk pesan notifikasi
  const router = useRouter(); // Inisialisasi router

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setMessage("");

  // Kirim email dan password ke backend untuk login
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (data.token) {
    // Simpan token yang valid ke localStorage setelah login berhasil
    localStorage.setItem("authToken", data.token); // Simpan token dari backend

    setMessage("Login berhasil! Mengarahkan ke halaman utama...");
    setTimeout(() => {
      router.push("/"); // Arahkan ke halaman utama setelah login berhasil
    }, 2000);
  } else {
    setMessage(data.message || "Login failed");
  }
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

        {/* Form Login - diperlebar */}
        <div className="bg-white p-8 md:p-12 shadow-md rounded-none w-full max-w-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
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
                placeholder="Masukkan email kamu"
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
                placeholder="Masukkan password kamu"
                className="w-full px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:ring-1 focus:ring-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#C9B37E] text-white text-lg font-semibold py-3 rounded-none hover:bg-[#A89467] transition-colors duration-300"
            >
              LOGIN
            </button>
          </form>

          {/* Link Daftar */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Belum Punya Akun?{" "}
            <Link
              href="/daftar" // Mengarahkan ke halaman pendaftaran
              className="text-black font-semibold hover:underline"
            >
              Daftar di Sini!
            </Link>
          </p>

          {/* Separator */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="px-4 text-gray-500 text-sm">Atau</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Sign With Google Button */}
          <button className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-semibold py-3 rounded-none hover:bg-gray-50 transition-colors duration-300">
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google icon"
              className="w-5 h-5 mr-3"
            />
            Sign With Google
          </button>
        </div>
      </div>
    </div>
  );
}
