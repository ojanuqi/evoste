import HeroSection from "./components/HeroSection";
import ProductCarousel from "./components/ProductCarousel";
import VideoStories from "./components/VideoStories"; // Mengimpor komponen VideoStories
import CommunityStories from "./components/CommunityStories"; // Mengimpor komponen CommunityStories yang baru

export default function Home() {
  return (
    <main>
      <HeroSection />

      {/* Bagian THE ESSENTIALS dengan Carousel */}
      <section className="mt-16">
        {/* Kontainer terpisah untuk judul agar tetap di tengah */}
        <div className="container mx-auto text-center mb-8">
          <h2 className="text-3xl font-serif font-bold">THE ESSENTIALS</h2>
        </div>

        {/* Carousel tidak memiliki pembatas lebar */}
        <div className="relative">
          <ProductCarousel />
        </div>
      </section>

      {/* Bagian VIDEO STORIES */}
      <VideoStories />

      {/* Bagian COMMUNITY STORIES (STATIS) */}
      <CommunityStories />
    </main>
  );
}
