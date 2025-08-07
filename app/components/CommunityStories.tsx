"use client";

import { useState } from "react";
import Link from "next/link"; // Import Link for navigation

const allStories = [
  // Renamed to allStories to distinguish
  {
    title: "Midnight Cherry: Wangi Malam yang Menggoda",
    text: "Midnight Cherry ini wanginya enak banget, manis tapi nggak bikin eneg. Pas buat dipakai kalau mau keluar malam atau acara spesial. Banyak yang nanya pakai parfum apa!",
    author: "Fira, 27 tahun – Jakarta",
  },
  {
    title: "Ivory Bloom: Segar dan Elegan Sepanjang Hari",
    text: "Ivory Bloom ini favoritku buat sehari-hari. Wanginya ringan, floral, bikin mood cerah. Cocok banget buat kerja atau hangout santai. Nggak bikin pusing dan tahan lama.",
    author: "Bunga, 24 tahun – Surabaya",
  },
  {
    title: "Citrine Flame: Energi Positif di Setiap Semprotan",
    text: "Suka banget sama Citrine Flame! Wanginya citrusy, segar, langsung bikin semangat. Cocok buat yang aktif dan suka wangi yang 'bangun' gitu. Recommended!",
    author: "Rio, 29 tahun – Bandung",
  },
];

// Only take the first 3 stories for display on this page
const storiesToShow = allStories.slice(0, 3);

export default function CommunityStories() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentStoryIndex((prevIndex) =>
      prevIndex === 0 ? storiesToShow.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentStoryIndex((prevIndex) =>
      prevIndex === storiesToShow.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentStory = storiesToShow[currentStoryIndex];

  return (
    <section className="container mx-auto mt-16 p-4 text-center">
      <h2 className="text-3xl font-bold font-serif mb-4">
        Cerita dari Komunitas Kami
      </h2>

      {/* Konten Cerita */}
      <div className="max-w-xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">{currentStory.title}</h3>
        <p className="text-lg italic mb-4">"{currentStory.text}"</p>
        <p className="text-sm text-gray-600">— {currentStory.author}</p>
      </div>

      {/* Tombol Navigasi */}
      <div className="flex justify-center gap-8 mt-8">
        <button onClick={goToPrevious} className="text-2xl font-bold">
          ←
        </button>
        <button onClick={goToNext} className="text-2xl font-bold">
          →
        </button>
      </div>

      {/* Tautan Lihat Selengkapnya (bukan tombol) */}
      <div className="mt-8">
        <Link
          href="/community"
          className="inline-flex items-center text-gray-700 hover:underline hover:text-gray-900 transition-colors duration-300 font-semibold text-lg"
        >
          Lihat Selengkapnya <span className="ml-2">→</span>
        </Link>
      </div>
    </section>
  );
}
