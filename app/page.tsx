"use client";

// ====================================================================
// file: app/page.tsx
// ====================================================================

// Impor komponen yang diperlukan
import HeroSection from "./components/HeroSection";
import VideoStories from "./components/VideoStories";
import CommunityStories from "./components/CommunityStories";
import ProductGrid from "./components/ProductGrid";
import { products } from "./data/products"; // Menggunakan data produk dari file terpusat

// Data produk unggulan
const featuredProducts = products.filter((product) =>
  ["MIDNIGHT CHERRY", "OR DU SOIR", "CITRINE FLAME"].includes(
    product.name.toUpperCase()
  )
);

export default function Home() {
  return (
    <main>
      <HeroSection />

      {/* Bagian THE ESSENTIALS dengan Grid Produk */}
      <section className="mt-16">
        <div className="container mx-auto text-center mb-8">
          <h2 className="text-3xl font-serif font-bold">BEST SELLER</h2>
        </div>

        {/* Tampilan grid produk unggulan */}
        <div className="relative max-w-6xl mx-auto px-4">
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Bagian VIDEO STORIES */}
      <VideoStories />

      {/* Bagian COMMUNITY STORIES */}
      <CommunityStories />
    </main>
  );
}
