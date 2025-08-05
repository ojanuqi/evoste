"use client";

import { useState } from "react";

const stories = [
  {
    title: "Ivory Bloom & Kenangan Musim Semi",
    text: "Aku memakai Ivory Bloom di hari wisuda. Aroma lychee dan Turkish rose-nya langsung membawaku kembali ke pagi hari saat aku menunggu pengumuman kelulusan. Sekarang setiap kali aku menyemprotkannya, aku merasa percaya diri seperti hari itu.",
    author: "Rani, 23 tahun – Bandung",
  },
  {
    title: "Morning Dew & Kisah Pertama",
    text: "Morning Dew adalah wangi pertama yang dia berikan padaku. Aromanya yang segar seperti tetesan embun selalu mengingatkanku pada momen pertama kali kami bertemu. Setiap semprotan adalah kilas balik ke hari itu.",
    author: "Dimas, 25 tahun – Jakarta",
  },
  {
    title: "Golden Hour & Senja di Pantai",
    text: "Golden Hour adalah wangi andalanku untuk momen spesial. Baunya yang hangat dan manis seperti vanila mengingatkanku pada senja yang indah di Bali. Sangat pas untuk menciptakan kenangan tak terlupakan.",
    author: "Santi, 28 tahun – Surabaya",
  },
];

export default function CommunityStories() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentStoryIndex((prevIndex) =>
      prevIndex === 0 ? stories.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentStoryIndex((prevIndex) =>
      prevIndex === stories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentStory = stories[currentStoryIndex];

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
    </section>
  );
}
