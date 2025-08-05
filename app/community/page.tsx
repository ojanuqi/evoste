"use client";

import React from "react";
// Menggunakan kembali komponen Image dari next/image karena gambar akan berasal dari direktori 'public'
import Image from "next/image";
import Link from "next/link";

// Komponen untuk menampilkan satu Community Story
// Ditambahkan properti `isReversed` untuk mengatur tata letak selang-seling
const CommunityStory = ({
  name,
  review,
  author,
  imageSrc,
  isReversed = false,
}: {
  name: string;
  review: string;
  author: string;
  imageSrc: string;
  isReversed?: boolean;
}) => (
  // Menggunakan kelas kondisional untuk membalikkan tata letak pada layar yang lebih besar
  <div
    className={`flex flex-col items-center p-6 rounded-xl space-y-4 sm:space-y-0 sm:space-x-8 ${
      isReversed ? "sm:flex-row-reverse sm:space-x-reverse" : "sm:flex-row"
    }`}
  >
    <div className="w-28 h-28 sm:w-48 sm:h-48 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden">
      {/* Menggunakan kembali komponen Image dari Next.js untuk gambar lokal */}
      <Image
        src={imageSrc}
        alt={name}
        width={192}
        height={192}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-grow text-center sm:text-left">
      <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">
        {name}
      </h3>
      <p className="text-lg italic text-gray-600 mb-4">&quot;{review}&quot;</p>
      <p className="text-md text-gray-500 font-semibold">&mdash; {author}</p>
    </div>
  </div>
);

export default function CommunityPage() {
  const communityStories = [
    {
      name: "Ivory Bloom & Kenangan Musim Semi",
      review:
        "Aku memakai Ivory Bloom di hari wisuda. Aroma lychee dan Turkish rose-nya langsung membawaku kembali ke pagi hari saat aku menunggu pengumuman kelulusan. Sekarang setiap kali aku menyemprotkannya, aku merasa percaya diri seperti hari itu.",
      author: "Rani, 23 tahun – Bandung",
      imageSrc: "/user1.png", // Menggunakan jalur relatif ke public
    },
    {
      name: "Ivory Bloom & Kenangan Musim Semi",
      review:
        "Aku memakai Ivory Bloom di hari wisuda. Aroma lychee dan Turkish rose-nya langsung membawaku kembali ke pagi hari saat aku menunggu pengumuman kelulusan. Sekarang setiap kali aku menyemprotkannya, aku merasa percaya diri seperti hari itu.",
      author: "Rani, 23 tahun – Bandung",
      imageSrc: "/user2.png", // Menggunakan jalur relatif ke public
    },
    {
      name: "Ivory Bloom & Kenangan Musim Semi",
      review:
        "Aku memakai Ivory Bloom di hari wisuda. Aroma lychee dan Turkish rose-nya langsung membawaku kembali ke pagi hari saat aku menunggu pengumuman kelulusan. Sekarang setiap kali aku menyemprotkannya, aku merasa percaya diri seperti hari itu.",
      author: "Rani, 23 tahun – Bandung",
      imageSrc: "/user3.png", // Menggunakan jalur relatif ke public
    },
    {
      name: "Ivory Bloom & Kenangan Musim Semi",
      review:
        "Aku memakai Ivory Bloom di hari wisuda. Aroma lychee dan Turkish rose-nya langsung membawaku kembali ke pagi hari saat aku menunggu pengumuman kelulusan. Sekarang setiap kali aku menyemprotkannya, aku merasa percaya diri seperti hari itu.",
      author: "Rani, 23 tahun – Bandung",
      imageSrc: "/user4.png", // Menggunakan jalur relatif ke public
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Halaman */}
        <h1 className="text-4xl font-serif font-bold text-center mb-12">
          COMMUNITY & STORIES
        </h1>

        {/* Bagian Community Stories */}
        <div className="bg-white rounded-xl shadow-md p-8 md:p-12 mb-16 space-y-12">
          {communityStories.map((story, index) => (
            <React.Fragment key={index}>
              {/* Memberikan prop `isReversed` berdasarkan indeks */}
              <CommunityStory {...story} isReversed={index % 2 !== 0} />
              {index < communityStories.length - 1 && (
                <hr className="border-gray-200 my-8" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
