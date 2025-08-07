import Link from "next/link";

export default function HeroSection() {
  return (
    <div>
      {/* Container untuk Hero Image dengan tinggi yang responsif */}
      <div className="h-[500px] md:h-[600px] w-full relative overflow-hidden">
        {/* Gambar Latar Belakang */}
        <img
          src="/hero.JPG" // Mengambil foto dari public/hero.JPG dengan kapitalisasi yang benar
          alt="Banner EVOSTE"
          className="w-full h-full object-cover object-center"
          // Fallback jika gambar tidak ditemukan
          onError={(e) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).src =
              "https://placehold.co/1200x600/E5E7EB/9CA3AF?text=EVOSTE+Banner";
          }}
        />

        {/* Lapisan overlay dengan teks dan tombol */}
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center p-4 z-10">
          <h2 className="text-4xl md:text-6xl font-serif font-bold drop-shadow-lg mb-4">
            EVOSTE
          </h2>
          <p className="text-lg md:text-xl font-sans max-w-xl mb-8 drop-shadow">
            Setiap aroma memiliki ceritanya sendiri. Temukan esensi yang
            membangkitkan kenangan abadi.
          </p>
          <Link href="/scent-storytelling">
            <button className="bg-white text-navy-900 font-semibold py-3 px-8 rounded-full shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-gray-200 text-black text-center">
              Lihat Selengkapnya
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
