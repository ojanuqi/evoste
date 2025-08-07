"use client";

import { useState } from "react";

export default function CommunityStories() {
  return (
    <section className="container mx-auto mt-16 p-4">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Kontainer Video */}
        <div className="w-full md:w-1/2 bg-gray-200 h-64 md:h-96 flex items-center justify-center relative rounded-lg overflow-hidden shadow-md">
          <video
            src="/evoste.mp4" // Menggunakan nama file video 'evoste.mp4'
            controls // Menambahkan kontrol pemutaran video
            loop // Video akan berulang secara otomatis
            muted // Opsional: Tambahkan 'muted' jika Anda ingin video dimulai tanpa suara
            className="w-full h-full object-cover" // Memastikan video mengisi kontainer
          >
            Browser Anda tidak mendukung tag video.
          </video>
        </div>

        {/* Konten Teks */}
        <div className="w-full md:w-1/2 text-center flex flex-col justify-center">
          <p className="text-4xl italic text-navy-900">
            "Your Scent Their Memory Forever"
          </p>
        </div>
      </div>
    </section>
  );
}
