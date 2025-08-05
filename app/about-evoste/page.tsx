"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
// import { CheckCircle2 } from 'lucide-react'; // Dihapus untuk menghindari error dependensi

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 font-sans">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header dan Logo */}
        <h1 className="text-5xl font-serif font-bold text-gray-800 mb-8">
          EVOSTE
        </h1>

        {/* Bagian Paragraf Pengantar */}
        <div className="text-lg text-gray-700 leading-relaxed mb-12">
          <p className="mb-6">
            EVOSTE is more than a fragrance brand – it is a journey through the
            senses. Each bottle holds a curated collection of exclusive scents,
            inspired by deep emotions, unforgettable moments, and the untamed
            richness of nature. From the warmth of sunlit blossoms to the
            mystery of twilight woods, every note is carefully crafted to evoke
            feeling and memory.
          </p>
          <p>
            Our fragrances are a tribute to elegance, authenticity, and
            individuality – designed for those who desire more than just
            perfume. They are for those who seek connection, presence, and
            identity in every spritz. With EVOSTE, scent becomes a signature, a
            statement, and a story.
          </p>
        </div>

        {/* Bagian "Why they choose EVOSTE?" */}
        <div className="bg-white rounded-xl shadow-md p-8 md:p-12">
          <h2 className="text-3xl font-serif font-bold text-gray-800 mb-8">
            Why they choose EVOSTE?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 text-left">
            {[
              "Fast-moving, emotional luxury product",
              "High profit margins",
              "Eye-catching, premium packaging",
              "Strong brand storytelling (easy to market)",
              "Full support: marketing kit, training, fast delivery",
              "BPOM-ready & trusted ingredients",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 text-lg text-gray-600"
              >
                {/* Mengganti ikon lucide-react dengan SVG inline */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-500 flex-shrink-0"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-8.68" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
