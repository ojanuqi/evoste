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
        onError={(e) => {
          (e.target as HTMLImageElement).onerror = null;
          (e.target as HTMLImageElement).src =
            "https://placehold.co/192x192/E5E7EB/9CA3AF?text=User";
        }}
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
      name: "Midnight Cherry: Wangi Malam yang Menggoda",
      review:
        "Midnight Cherry ini wanginya enak banget, manis tapi nggak bikin eneg. Pas buat dipakai kalau mau keluar malam atau acara spesial. Banyak yang nanya pakai parfum apa!",
      author: "Fira, 27 tahun – Jakarta",
      imageSrc: "/user1.png", // Menggunakan jalur relatif ke public
    },
    {
      name: "Ivory Bloom: Segar dan Elegan Sepanjang Hari",
      review:
        "Ivory Bloom ini favoritku buat sehari-hari. Wanginya ringan, floral, bikin mood cerah. Cocok banget buat kerja atau hangout santai. Nggak bikin pusing dan tahan lama.",
      author: "Bunga, 24 tahun – Surabaya",
      imageSrc: "/user2.png", // Menggunakan jalur relatif ke public
    },
    {
      name: "Citrine Flame: Energi Positif di Setiap Semprotan",
      review:
        "Suka banget sama Citrine Flame! Wanginya citrusy, segar, langsung bikin semangat. Cocok buat yang aktif dan suka wangi yang 'bangun' gitu. Recommended!",
      author: "Rio, 29 tahun – Bandung",
      imageSrc: "/user3.png", // Menggunakan jalur relatif ke public
    },
    {
      name: "Oud Legendaire: Mewah dan Berkarakter",
      review:
        "Oud Legendaire ini wanginya strong dan mewah. Cocok buat acara formal atau kalau mau tampil beda. Wangi oud-nya bener-bener berkelas dan tahan lama banget di kulit.",
      author: "Andi, 35 tahun – Yogyakarta",
      imageSrc: "/user4.png", // Menggunakan jalur relatif ke public
    },
    {
      name: "Or du Soir: Sensual dan Memikat",
      review:
        "Or du Soir ini wanginya unik, agak spicy tapi sensual. Kalau dipakai pas malam hari atau ke pesta, langsung jadi pusat perhatian. Bikin merasa lebih percaya diri dan misterius.",
      author: "Maya, 31 tahun – Bali",
      imageSrc: "/user1.png", // Menggunakan jalur relatif ke public (contoh, bisa disesuaikan)
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
