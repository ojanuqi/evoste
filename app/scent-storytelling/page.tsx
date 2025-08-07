"use client";

// app/scent-storytelling/page.tsx
export default function ScentStorytellingPage() {
  return (
    <main className="bg-gray-50 text-navy-900 font-sans">
      <div className="container mx-auto px-4 py-16">
        {/* Section: Scent Storytelling */}
        <h1 className="text-3xl font-bold font-serif text-center mb-12">
          SCENT STORYTELLING
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mb-16">
          {/* Ivory Bloom - Right Text */}
          <div className="order-2 md:order-1">
            <img
              src="/parfum/Ivory Bloom.jpg"
              alt="Ivory Bloom"
              className="h-[400px] w-full object-cover rounded-lg shadow-md"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/600x400/E5E7EB/9CA3AF?text=Ivory+Bloom";
              }}
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-xl font-bold mb-2">IVORY BLOOM</h2>
            <p>
              Parfum dengan karakter segar, manis, dan eksotis yang memadukan
              lychee, rhubarb, saffron, dan bergamot dengan Turkish rose,
              jasmine, dan soft musk. Aroma ini membangkitkan kenangan pagi
              musim semi yang damai di taman yang sedang mekar.
            </p>
          </div>

          {/* Citrine Flame - Left Text */}
          <div className="order-3 md:order-3">
            <h2 className="text-xl font-bold mb-2">CITRINE FLAME</h2>
            <p>
              Parfum dengan karakter segar, fruity, dan woody. Aroma ini
              memadukan bergamot, apel, plum, dan cedarwood dengan sentuhan
              geranium. Citrine Flame membangkitkan kenangan sore yang tenang di
              kebun apel.
            </p>
          </div>
          <div className="order-4 md:order-4">
            <img
              src="/parfum/Citrine Flame.jpg"
              alt="Citrine Flame"
              className="h-[400px] w-full object-cover rounded-lg shadow-md"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/600x400/E5E7EB/9CA3AF?text=Citrine+Flame";
              }}
            />
          </div>

          {/* Midnight Cherry - Right Text */}
          <div className="order-6 md:order-5">
            <img
              src="/parfum/Midnight Cherry.jpg"
              alt="Midnight Cherry"
              className="h-[400px] w-full object-cover rounded-lg shadow-md"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/600x400/E5E7EB/9CA3AF?text=Midnight+Cherry";
              }}
            />
          </div>
          <div className="order-5 md:order-6">
            <h2 className="text-xl font-bold mb-2">MIDNIGHT CHERRY</h2>
            <p>
              Perpaduan menarik antara cherry liqueur, bitter dapat menarik
              perhatian. almond, dan bergamot segar. Aroma ini manis namun
              berani dan
            </p>
          </div>

          {/* Oud Légendaire - Left Text */}
          <div className="order-7 md:order-7">
            <h2 className="text-xl font-bold mb-2">OUD LÉGENDAIRE</h2>
            <p>
              Memiliki karakter cerah, tropis, dan misterius. Aroma ini
              menggabungkan passion fruit, nanas, mangga, dan bergamot dengan
              warm woods, leather, oud, dan soft amber. Parfum ini membangkitkan
              kenangan saat berjalan-jalan di pasar malam yang ramai.
            </p>
          </div>
          <div className="order-8 md:order-8">
            <img
              src="/parfum/Oud Legendaire.jpg"
              alt="Oud Légendaire"
              className="h-[400px] w-full object-cover rounded-lg shadow-md"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/600x400/E5E7EB/9CA3AF?text=Oud+Legendaire";
              }}
            />
          </div>

          {/* Or du Soir - Right Text */}
          <div className="order-10 md:order-9">
            <img
              src="/parfum/Or du Soir.jpg"
              alt="Or du Soir"
              className="h-[400px] w-full object-cover rounded-lg shadow-md"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/600x400/E5E7EB/9CA3AF?text=Or+du+Soir";
              }}
            />
          </div>
          <div className="order-9 md:order-10">
            <h2 className="text-xl font-bold mb-2">OR DU SOIR</h2>
            <p>
              Aroma ini diawali dengan sentuhan kopi dan amaretto, yang
              memberikan kehangatan seperti tegukan pertama di malam hari.
              Parfum ini juga memiliki aroma es krim yang meleleh, bourbon
              vanilla, brown sugar, dan sentuhan black pepper.
            </p>
          </div>
        </div>

        {/* Section: About EVOSTE & Contact */}
      </div>
    </main>
  );
}
