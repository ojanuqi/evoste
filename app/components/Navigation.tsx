"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navigation() {
  const pathname = usePathname();

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "SCENT STORYTELLING", href: "/scent-storytelling" },
    { name: "FIND YOUR SCENT", href: "/find-your-scent" },
    { name: "SHOP", href: "/shop" },
    { name: "COMMUNITY", href: "/community" },
    { name: "ABOUT EVOSTE", href: "/about-evoste" },
  ];

  const [isFixed, setIsFixed] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsFixed(currentScrollY > 0);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`
        hidden md:flex justify-center w-full bg-white z-30 shadow transition-transform duration-300 ease-in-out
        ${isFixed ? "fixed top-0 left-0" : "relative"}
        ${showNav ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <ul className="flex space-x-8 items-center py-3 text-sm font-sans">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={`hover:text-gray-600 transition-colors duration-200 ease-in-out ${
                pathname === link.href
                  ? "font-bold border-b-2 border-navy-900 pb-3"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
        {/* Cart Icon */}
        <li className="ml-8">
          <Link href="/cart">
            <img src="/icon-cart.png" alt="Cart" className="w-5 h-5" />
          </Link>
        </li>
        {/* Account Icon (NEW) */}
        <li className="ml-4">
          {" "}
          {/* Menambahkan sedikit margin kiri */}
          <Link href="/profile">
            {/* Ganti src dengan path icon akun Anda setelah menyimpannya di folder public */}
            <img src="/icon-profile.png" alt="Account" className="w-5 h-5" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
