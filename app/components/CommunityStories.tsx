"use client";

import { useState } from "react";

const stories = [
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
  {
    title: "Oud Legendaire: Mewah dan Berkarakter",
    text: "Oud Legendaire ini wanginya strong dan mewah. Cocok buat acara formal atau kalau mau tampil beda. Wangi oud-nya bener-bener berkelas dan tahan lama banget di kulit.",
    author: "Andi, 35 tahun – Yogyakarta",
  },
  {
    title: "Or du Soir: Sensual dan Memikat",
    text: "Or du Soir ini wanginya unik, agak spicy tapi sensual. Kalau dipakai pas malam hari atau ke pesta, langsung jadi pusat perhatian. Bikin merasa lebih percaya diri dan misterius.",
    author: "Maya, 31 tahun – Bali",
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
