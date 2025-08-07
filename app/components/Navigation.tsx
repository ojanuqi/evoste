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
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // scroll hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsFixed(currentY > 0);
      setShowNav(!(currentY > lastScrollY && currentY > 100));
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // client-only flag
  useEffect(() => {
    setMounted(true);
  }, []);

  // setelah mount, baca langsung localStorage setiap render
  const isLoggedIn = mounted && !!localStorage.getItem("evoste-user");

  const profileHref = isLoggedIn ? "/profile" : "/login";

  return (
    <nav
      className={`w-full bg-white z-30 shadow transition-transform duration-300 ease-in-out ${
        isFixed ? "fixed top-0 left-0" : "relative"
      } ${showNav ? "translate-y-0" : "-translate-y-full"}`}
    >
      {/* Desktop Nav */}
      <ul className="hidden md:flex justify-center space-x-12 items-center py-3 text-sm font-sans">
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
        <li className="ml-8">
          <Link href="/cart">
            <img src="/icon-cart.png" alt="Cart" className="w-5 h-5" />
          </Link>
        </li>
        <li>
          <Link href={profileHref}>
            <img src="/icon-profile.png" alt="Account" className="w-5 h-5" />
          </Link>
        </li>
      </ul>

      {/* Mobile Hamburger */}
      <div className="flex md:hidden justify-between items-center px-4 py-3">
        <button onClick={() => setIsOpen(!isOpen)}>
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 shadow">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block py-2 text-sm border-b ${
                pathname === link.href
                  ? "font-bold text-black"
                  : "text-gray-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex space-x-4 mt-4">
            <Link href="/cart" onClick={() => setIsOpen(false)}>
              <img src="/icon-cart.png" alt="Cart" className="w-5 h-5" />
            </Link>
            <Link href={profileHref} onClick={() => setIsOpen(false)}>
              <img src="/icon-profile.png" alt="Account" className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
