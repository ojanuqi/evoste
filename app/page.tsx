// ====================================================================
// file: app/page.tsx
// ====================================================================
// Impor komponen yang diperlukan
import HeroSection from "./components/HeroSection";
import VideoStories from "./components/VideoStories";
import CommunityStories from "./components/CommunityStories";
import ProductGrid from "./components/ProductGrid";
import { Product } from "./components/ProductCard";

// Data produk unggulan
const featuredProducts: Product[] = [
  {
    name: "MIDNIGHT CHERRY",
    description: "Aroma buah, manis, menggoda",
    size: "100ML",
    price: "RP 350.000",
    image: "/parfum/Midnight Cherry.jpg",
    isBestSeller: true,
  },
  {
    name: "OR DU SOIR",
    description: "Aroma oriental, sensual, eksotis",
    size: "50ML",
    price: "RP 550.000",
    image: "/parfum/Or du Soir.jpg",
    isBestSeller: false,
  },
  {
    name: "CITRINE FLAME",
    description: "Aroma citrus, segar, energik",
    size: "100ML",
    price: "RP 286.000",
    image: "/parfum/Citrine Flame.jpg",
    isBestSeller: false,
  },
];

export default function Home() {
  return (
    <main>
      <HeroSection />

      {/* Bagian THE ESSENTIALS dengan Grid Produk */}
      <section className="mt-16">
        <div className="container mx-auto text-center mb-8">
          <h2 className="text-3xl font-serif font-bold">THE ESSENTIALS</h2>
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
