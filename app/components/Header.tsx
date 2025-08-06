"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white text-navy-900 relative z-40">
      <div className="flex justify-center items-center pt-10 pb-4 px-4 md:px-8">
        <Link href="/" className="flex flex-col items-center cursor-pointer">
          <h1 className="text-3xl font-bold font-serif">EVOSTE</h1>
          <p className="text-xs italic font-sans mt-1">
            Your scent. Their memory. Forever.
          </p>
        </Link>
      </div>
    </header>
  );
}
