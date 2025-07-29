// src/pages/index.tsx
import Head from "next/head";
import Link from "next/link";
import Image from "next/image"; // <=== IMPORT KOMPONEN IMAGE
import perfumeData from "../../data/perfumeData"; // Pastikan path ini benar

// ==== URL GAMBAR ANDA ====
const HERO_BROCHURE_URL = "/images/evoste-hero-banner.jpg";
const FRAGRANCE_NOTES_GRID_URL = "/images/evoste-fragrance-grid.jpg";
const PERFUME_BOTTLES_GRID_URL = "/images/evoste-perfume-bottles.jpg";
const DOODLE_BACKGROUND_URL = "/images/background.jpg"; // Ganti dengan path ke gambar doodle Anda

export async function getStaticProps() {
  return {
    props: {
      perfumes: perfumeData,
    },
  };
}

interface HomeProps {
  perfumes: typeof perfumeData;
}

export default function Home({ perfumes }: HomeProps) {
  const displayNoPerfumesMessage = perfumes.length === 0;

  return (
    // Outer container untuk doodle background dan overlay
    <div className="relative min-h-screen font-sans">
      {/* Doodle Background Layer */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center" // bg-fixed untuk efek parallax
        style={{ backgroundImage: `url(${DOODLE_BACKGROUND_URL})` }}
      >
        {/* Overlay gelap di atas doodle untuk readability */}
        <div className="absolute inset-0 bg-black opacity-80"></div>{" "}
        {/* Sesuaikan opacity jika perlu */}
      </div>

      {/* Konten utama yang berada di atas doodle background dan overlay */}
      <div className="relative z-10 bg-neutral-900/50 text-neutral-100 min-h-screen">
        {" "}
        {/* bg-neutral-900/50 membuat konten sedikit transparan ke doodle */}
        <Head>
          <title>EVOSte Parfum - Your Scent. Their Memory. Forever.</title>
          <meta
            name="description"
            content="Official landing page for EVOSte Parfum. Discover exquisite fragrances."
          />
          <link rel="icon" href="/favicon.ico" />
          {/* Link untuk Google Fonts - tambahkan di _app.tsx atau global.css untuk penggunaan yang lebih baik */}
          {/* <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet" /> */}
        </Head>
        {/* Header (untuk navigasi internal) */}
        <header className="bg-neutral-950/70 text-neutral-200 p-4 shadow-xl sticky top-0 z-50 backdrop-blur-sm">
          {" "}
          {/* Sedikit lebih gelap, shadow lebih kuat, dan efek blur */}
          <div className="container mx-auto flex justify-between items-center">
            <Link
              href="#hero"
              className="text-3xl font-bold text-amber-300 hover:text-amber-200 transition-colors duration-200 font-serif" // Font serif untuk logo
            >
              {" "}
              {/* Ukuran lebih besar, warna amber lebih soft */}
              EVOSTE
            </Link>
            <nav>
              <ul className="flex space-x-6 text-lg">
                <li>
                  <Link
                    href="#hero"
                    className="hover:text-amber-300 transition-colors duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#collection"
                    className="hover:text-amber-300 transition-colors duration-200"
                  >
                    Collection
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    className="hover:text-amber-300 transition-colors duration-200"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#reviews"
                    className="hover:text-amber-300 transition-colors duration-200"
                  >
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="hover:text-amber-300 transition-colors duration-200"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main>
          {/* Section: Hero */}
          <section
            id="hero"
            className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center text-center text-white overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_BROCHURE_URL})` }}
          >
            {/* Overlay gelap agar teks tetap terbaca - bisa diatur lebih transparan jika doodle di belakang sudah gelap */}
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
            <div className="relative z-20 max-w-3xl mx-auto px-4 py-8">
              <h1 className="text-6xl md:text-8xl font-serif mb-4 tracking-wider drop-shadow-lg text-amber-200">
                {" "}
                {/* Ukuran lebih besar, warna amber lebih soft */}
                EVOSTE
              </h1>
              <h2 className="text-3xl md:text-5xl font-light mb-8 drop-shadow-md font-serif italic text-amber-100">
                {" "}
                {/* Ukuran lebih besar, italic, warna lebih soft */}
                Your scent. Their memory. Forever.
              </h2>
              <p className="text-lg md:text-xl mb-8 drop-shadow-md text-neutral-100">
                {" "}
                {/* Text color explicitly set */}
                Experience the art of fragrance that defines you.
              </p>
              <Link
                href="#collection"
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 shadow-xl transform hover:scale-105" // Warna lebih dalam, shadow lebih kuat, efek hover
              >
                Explore Our Collection
              </Link>
            </div>
          </section>

          {/* Section: Why Choose EVOSte? & About Us (Side by Side) */}
          <section
            id="about"
            className="container mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12"
          >
            {/* Why Choose Us Section */}
            <div className="bg-neutral-800 p-8 rounded-lg shadow-xl text-left border-b-4 border-amber-500/50">
              {" "}
              {/* Warna latar lebih gelap, border tebal dan transparan */}
              <h2 className="text-3xl font-bold mb-6 text-center text-amber-400 relative font-serif">
                {" "}
                {/* Warna amber lebih soft, font serif */}
                Why they choose EVOSte?
                <span className="absolute left-1/2 -translate-x-1/2 bottom-[-10px] w-20 h-1 bg-amber-500 rounded-full"></span>
              </h2>
              <ul className="space-y-4 text-neutral-200">
                {" "}
                {/* Warna teks lebih terang */}
                <li className="flex items-center text-lg">
                  <span className="text-amber-500 mr-3 text-2xl">★</span>{" "}
                  {/* Icon diganti ke bintang emas */}
                  Fast-moving, emotional luxury product
                </li>
                <li className="flex items-center text-lg">
                  <span className="text-amber-500 mr-3 text-2xl">★</span>High
                  profit margins
                </li>
                <li className="flex items-center text-lg">
                  <span className="text-amber-500 mr-3 text-2xl">★</span>
                  Eye-catching, premium packaging
                </li>
                <li className="flex items-center text-lg">
                  <span className="text-amber-500 mr-3 text-2xl">★</span>Strong
                  brand storytelling (easy to market)
                </li>
                <li className="flex items-center text-lg">
                  <span className="text-amber-500 mr-3 text-2xl">★</span>Full
                  support: marketing kit, training, fast delivery
                </li>
                <li className="flex items-center text-lg">
                  <span className="text-amber-500 mr-3 text-2xl">★</span>
                  BPOM-ready &amp; trusted ingredients
                </li>
              </ul>
            </div>

            {/* About Us Section */}
            <div className="bg-neutral-800 p-8 rounded-lg shadow-xl text-left border-b-4 border-amber-500/50">
              {" "}
              {/* Warna latar lebih gelap, border tebal dan transparan */}
              <h2 className="text-3xl font-bold mb-6 text-center text-amber-400 relative font-serif">
                ABOUT US
                <span className="absolute left-1/2 -translate-x-1/2 bottom-[-10px] w-20 h-1 bg-amber-500 rounded-full"></span>
              </h2>
              <p className="text-neutral-200 text-lg mb-4">
                {" "}
                {/* Warna teks lebih terang */}
                EVOSTE is more than a fragrance brand - it is a journey through
                the senses. Each bottle holds a curated collection of exclusive
                scents, inspired by deep emotions, unforgettable moments, and
                the untamed richness of nature. From the warmth of sunlit
                blossoms to the mystery of twilight woods, every note is
                carefully crafted to evoke feeling and memory.
              </p>
              <p className="text-neutral-200 text-lg">
                {" "}
                {/* Warna teks lebih terang */}
                Our fragrances are a tribute to elegance, authenticity, and
                individuality - designed for those who desire more than just
                perfume. They are for those who seek connection, presence, and
                identity in every spritz. With EVOSTE, scent becomes a
                signature, a statement, and a story.
              </p>
              {/* Image of perfume bottles */}
              <div className="mt-8 text-center">
                <Image // <=== DIGANTI KE KOMPONEN IMAGE
                  src={PERFUME_BOTTLES_GRID_URL}
                  alt="EVOSTE Perfume Bottles"
                  width={384} // <=== GANTI DENGAN LEBAR ASLI GAMBAR INI (misal: 1200)
                  height={250} // <=== GANTI DENGAN TINGGI ASLI GAMBAR INI (misal: 800)
                  className="w-full h-auto max-w-sm mx-auto rounded-lg shadow-md border border-amber-500/30" // Border keemasan transparan
                />
              </div>
            </div>
          </section>

          {/* Section: Perfume Collection / Fragrance Notes */}
          <section id="collection" className="bg-neutral-900/50 py-16">
            {" "}
            {/* Latar belakang transparan ke doodle */}
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold mb-12 text-amber-400 relative font-serif">
                Our Fragrance Collection
                <span className="absolute left-1/2 -translate-x-1/2 bottom-[-10px] w-24 h-1 bg-amber-500 rounded-full"></span>
              </h2>

              {displayNoPerfumesMessage ? (
                <p className="text-xl text-neutral-300">
                  No perfumes currently available. Please check back later!
                </p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {perfumes.map((perfume) => (
                    <div
                      key={perfume.no}
                      className="bg-neutral-800 p-8 rounded-lg shadow-xl text-left border-t-2 border-amber-500/50 transform transition duration-300 hover:scale-105 hover:shadow-2xl" // Latar belakang gelap, shadow lebih kuat
                    >
                      {/* **KODE UNTUK GAMBAR INDIVIDUAL PARFUM** */}
                      {perfume.imageUrl && (
                        <div className="mb-4 flex justify-center">
                          <Image // <=== DIGANTI KE KOMPONEN IMAGE
                            src={perfume.imageUrl}
                            alt={perfume.type}
                            width={144} // <=== Ini sesuai dengan w-36 (144px)
                            height={144} // <=== Ini sesuai dengan h-36 (144px)
                            className="w-36 h-36 object-contain mx-auto"
                          />
                        </div>
                      )}
                      {/* **AKHIR KODE GAMBAR INDIVIDUAL** */}
                      <h3 className="text-2xl font-semibold mb-3 text-amber-300 font-serif">
                        {" "}
                        {/* Font serif, warna amber lebih soft */}
                        {perfume.type}
                      </h3>
                      <p className="text-neutral-300 text-base mb-4 italic">
                        {" "}
                        {/* Warna teks lebih terang */}
                        {perfume.description}
                      </p>
                      <div className="space-y-1 text-neutral-200 text-sm">
                        {" "}
                        {/* Warna teks lebih terang */}
                        <p>
                          <strong>Top Notes:</strong> {perfume.topNotes}
                        </p>
                        <p>
                          <strong>Middle Notes:</strong> {perfume.middleNotes}
                        </p>
                        <p>
                          <strong>Base Notes:</strong> {perfume.baseNotes}
                        </p>
                        {perfume.variant1 && (
                          <p className="text-xs text-neutral-400 mt-2">
                            {" "}
                            {/* Warna teks lebih terang */}
                            Similar to: {perfume.variant1}{" "}
                            {perfume.variant2 !== "-" &&
                              `, ${perfume.variant2}`}{" "}
                            {perfume.variant3 !== "-" &&
                              `, ${perfume.variant3}`}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Fragrance notes grid image */}
              <div className="mt-16">
                <h3 className="text-2xl font-semibold mb-6 text-amber-400 font-serif">
                  {" "}
                  {/* Font serif, warna amber lebih soft */}
                  Explore Our Fragrance Notes
                </h3>
                <Image // <=== DIGANTI KE KOMPONEN IMAGE
                  src={FRAGRANCE_NOTES_GRID_URL}
                  alt="Fragrance Notes Grid"
                  width={896} // <=== GANTI DENGAN LEBAR ASLI GAMBAR INI (misal: 1920)
                  height={500} // <=== GANTI DENGAN TINGGI ASLI GAMBAR INI (misal: 1080)
                  className="w-full max-w-4xl mx-auto rounded-lg shadow-lg border border-amber-500/30" // Border keemasan transparan
                />
                <p className="text-sm text-neutral-300 mt-4">
                  {" "}
                  {/* Warna teks lebih terang */}
                  Discover the individual notes that compose our exquisite
                  fragrances.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Customer Reviews */}
          <section
            id="reviews"
            className="container mx-auto px-4 py-16 text-center"
          >
            <h2 className="text-3xl font-bold mb-10 text-amber-400 relative font-serif">
              Customer Reviews
              <span className="absolute left-1/2 -translate-x-1/2 bottom-[-10px] w-20 h-1 bg-amber-500 rounded-full"></span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="bg-neutral-800 p-6 rounded-lg shadow-md text-left border-l-4 border-amber-500/50">
                {" "}
                {/* Latar belakang gelap, border tebal */}
                <p className="font-semibold text-lg text-amber-300 mb-2">
                  Rikon
                </p>
                <p className="italic text-neutral-300">
                  {" "}
                  {/* Warna teks lebih terang */}
                  &quot;I&apos;ve never been so emotionally connected to a
                  fragrance before I wore &quot;Every scent of your
                  memory.&quot; Just by how good and solid it was since we first
                  met.&quot;
                </p>
              </div>
              <div className="bg-neutral-800 p-6 rounded-lg shadow-md text-left border-l-4 border-amber-500/50">
                {" "}
                {/* Latar belakang gelap, border tebal */}
                <p className="font-semibold text-lg text-amber-300 mb-2">
                  Jesson
                </p>
                <p className="italic text-neutral-300">
                  {" "}
                  {/* Warna teks lebih terang */}
                  &quot;I bought Citrine Flame. It&apos;s clean, citrusy, and
                  has a slight woody dry down. It makes me wish the projection
                  lasted just a bit longer, but for this price, it&apos;s a
                  steal. I love it more than my &quot;Creed Aventus&quot; or
                  &quot;Dior Sauvage&quot;. 10/10.&quot;
                </p>
              </div>
            </div>
          </section>

          {/* Section: Pricing & Reseller */}
          <section id="pricing" className="bg-neutral-900/50 py-16">
            {" "}
            {/* Latar belakang transparan ke doodle */}
            <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-center items-start gap-10">
              {/* Price Info */}
              <div className="bg-neutral-800 p-8 rounded-lg shadow-md text-center flex-1 max-w-md w-full border-t-4 border-amber-500/50">
                {" "}
                {/* Latar belakang gelap, border tebal */}
                <h2 className="text-3xl font-bold mb-6 text-amber-400 relative font-serif">
                  Suggested Retail Price (SRP):
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-[-10px] w-16 h-1 bg-amber-500 rounded-full"></span>
                </h2>
                <p className="text-2xl font-bold text-neutral-200 mb-3">
                  {" "}
                  {/* Warna teks lebih terang */}
                  30ml = <span className="text-amber-400">Rp. 199.000</span>
                </p>
                <p className="text-2xl font-bold text-neutral-200">
                  {" "}
                  {/* Warna teks lebih terang */}
                  50ml = <span className="text-amber-400">Rp. 299.000</span>
                </p>
              </div>

              {/* Reseller Info */}
              <div className="bg-neutral-800 p-8 rounded-lg shadow-md text-left flex-1 max-w-md w-full border-t-4 border-amber-500/50">
                {" "}
                {/* Latar belakang gelap, border tebal */}
                <h2 className="text-3xl font-bold mb-6 text-amber-400 text-center relative font-serif">
                  Ready to grow with EVOSte?
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-[-10px] w-16 h-1 bg-amber-500 rounded-full"></span>
                </h2>
                <p className="text-neutral-300 text-lg mb-4 text-center">
                  {" "}
                  {/* Warna teks lebih terang */}
                  Join our fast-growing Reseller network. DM us or contact us on
                  WhatsApp to get started.
                </p>
                <ul className="list-disc list-inside text-neutral-200 text-base space-y-2">
                  {" "}
                  {/* Warna teks lebih terang */}
                  <li>MOQ: 12 | 24 | 48 pcs</li>
                  <li>WhatsApp: (+62) 877-7774-5791</li>
                  <li>Instagram: @evosteofficial</li>
                  <li>Worldwide shipment</li>
                </ul>
              </div>
            </div>
            {/* START - BAGIAN BARU UNTUK TOMBOL CTA */}
            <div className="bg-neutral-900/50 py-12 text-center mt-12">
              {" "}
              {/* Menambahkan margin-top */}
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-amber-400 font-serif">
                  Ready to Elevate Your Scent?
                </h2>
                <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                  <a
                    href="https://wa.me/6287777745791" // Ganti dengan nomor WhatsApp Anda
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 shadow-lg flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-white"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.6-3.803-1.6-5.842 0-6.556 5.338-11.895 11.893-11.895 3.181 0 6.067 1.24 8.288 3.252 2.22 2.012 3.44 4.797 3.44 7.787s-1.22 5.774-3.44 7.787c-2.22 2.011-5.105 3.251-8.288 3.251-1.928 0-3.821-.502-5.475-1.457l-6.208 1.625zm6.547-2.807l-.455-.273c-1.564-.935-2.617-2.636-2.617-4.527 0-3.181 2.576-5.759 5.759-5.759 1.492 0 2.873.583 3.926 1.538 1.053.955 1.637 2.275 1.637 3.656s-.584 2.701-1.637 3.656c-1.053.955-2.434 1.538-3.926 1.538-1.579 0-3.078-.583-4.167-1.538z"></path>
                    </svg>
                    WhatsApp Us
                  </a>
                  <a
                    href="https://www.instagram.com/evosteofficial" // Ganti dengan username Instagram Anda
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 shadow-lg flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-white"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.25.148 4.745 1.942 5.093 5.093.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.25-1.942 4.745-5.093 5.093-.787.036-1.07.05-4.85.05s-4.063-.014-4.85-.07c-3.25-.148-4.745-1.942-5.093-5.093-.058-1.266-.07-1.646-.07-4.85s.013-3.584.072-4.85c.199-4.352 2.502-6.393 6.592-6.592.059-1.3.072-1.727.072-4.994s-.013-3.693-.072-4.994c-.199-4.352-2.502-6.393-6.592-6.592-1.3-.059-1.727-.072-4.994-.072zm0 5.838c-3.462 0-6.262 2.8-6.262 6.262s2.8 6.262 6.262 6.262 6.262-2.8 6.262-6.262-2.8-6.262-6.262-6.262zm0 10.288c-2.222 0-4.026-1.804-4.026-4.026s1.804-4.026 4.026-4.026 4.026 1.804 4.026 4.026-1.804 4.026-4.026 4.026zm6.398-11.815c-.97-.042-1.765-.333-2.268-.908-.503-.574-.707-1.366-.749-2.336-.042-.97.186-1.765.707-2.268.521-.503 1.316-.707 2.268-.749.952-.042 1.747.186 2.268.707.521.521.725 1.316.749 2.268.024.952-.199 1.747-.707 2.268-.508.521-1.303.725-2.268.749z"></path>
                    </svg>
                    Instagram
                  </a>
                </div>
              </div>
            </div>
            {/* END - BAGIAN BARU UNTUK TOMBOL CTA */}
          </section>

          {/* Footer Notes Section */}
          <section className="bg-neutral-950/70 text-neutral-300 py-8 px-4 text-center backdrop-blur-sm">
            {" "}
            {/* Background footer notes lebih gelap dan blur */}
            <p className="text-lg mb-4">
              All our perfumes are formulated with international-grade
              ingredients and are BPOM-ready.
            </p>
          </section>
        </main>
        <footer className="bg-neutral-950/70 text-neutral-400 py-6 text-center text-sm backdrop-blur-sm">
          {" "}
          {/* Background footer lebih gelap dan blur */}
          <p>&copy; {new Date().getFullYear()} EVOSTE. All rights reserved.</p>
          <p>
            Visit us at{" "}
            <Link
              href="http://www.evoste.co"
              className="text-amber-400 hover:underline"
            >
              www.evoste.co
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
