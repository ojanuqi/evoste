"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // isSearchOpen dan setIsSearchOpen telah dihapus
  const pathname = usePathname();

  const navLinks = [
    { name: "SCENT STORYTELLING", href: "/scent-storytelling" },
    { name: "FIND YOUR SCENT", href: "/find-your-scent" },
    { name: "SHOP", href: "/shop" },
    { name: "COMMUNITY", href: "/community" },
    { name: "ABOUT EVOSTE", href: "/about-evoste" },
  ];

  return (
    <header className="bg-white text-navy-900 shadow-md relative">
      {" "}
      {/* Tambahkan `relative` di sini */}
      {/* Baris Atas: Logo, Hamburger, dan Cart */}
      <div className="flex justify-center items-center py-4 relative px-4 md:px-8">
        {/* Tombol Hamburger (Hanya Tampil di Layar Mobile) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-2xl absolute left-4 top-1/2 transform -translate-y-1/2"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

        {/* Logo (TETAP DI TENGAH) - Diubah menjadi Link */}
        <Link href="/" className="flex flex-col items-center cursor-pointer">
          <h1 className="text-3xl font-bold font-serif">EVOSTE</h1>
          <p className="text-xs italic font-sans mt-1">
            Your scent. Their memory. Forever.
          </p>
        </Link>

        {/* Tombol Cart (di posisi yang sama dengan Search sebelumnya) */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 text-sm">
          <Link href="/cart">
            <img src="/icon-cart.png" alt="Cart" className="w-5 h-5" />
          </Link>
        </div>
      </div>
      {/* Navigasi Desktop (Tampil di Layar Besar) */}
      <nav className="hidden md:flex justify-center pb-4 text-sm font-sans w-full relative">
        <ul className="flex space-x-8">
          {navLinks.map((link) => (
            <li
              key={link.name}
              className={link.name === "SHOP" ? "relative" : ""}
            >
              <Link
                href={link.href}
                className={`
                  hover:text-gray-600 transition-colors duration-200 ease-in-out
                  ${
                    pathname === link.href
                      ? "font-bold border-b-2 border-navy-900 pb-1"
                      : ""
                  }
                `}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* Navigasi Mobile (Tampil di Layar Kecil) */}
      <div
        className={`fixed inset-x-0 top-[70px] bg-white transition-transform duration-300 ease-in-out z-20 md:hidden shadow-lg ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-center py-8 space-y-4 text-lg">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`
                  hover:text-gray-600 transition-colors duration-200 ease-in-out
                  ${pathname === link.href ? "font-bold" : ""}
                `}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
