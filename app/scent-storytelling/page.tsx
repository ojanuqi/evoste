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
          <div className="order-2 md:order-1 h-64 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500 italic">Placeholder Image</p>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-xl font-bold mb-2">IVORY BLOOM</h2>
            <p>
              Unveiling a fresh, sweet, and exotic character, the scent blends
              lychee, rhubarb, saffron and bergamot with Turkish rose, jasmine,
              and soft musk. It captures the memory of a peaceful spring morning
              in a blooming garden.
            </p>
          </div>

          {/* Citrine Flame - Left Text */}
          <div className="order-3 md:order-3">
            <h2 className="text-xl font-bold mb-2">CITRINE FLAME</h2>
            <p>
              Radiating a fresh, fruity, and woody character, the scent blends
              bergamot, apple, plum, and cedarwood with hints of geranium. It
              captures the memory of a tranquil afternoon in an apple orchard.
            </p>
          </div>
          <div className="order-4 md:order-4 h-64 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500 italic">Placeholder Image</p>
          </div>

          {/* Midnight Cherry - Right Text */}
          <div className="order-6 md:order-5 h-64 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500 italic">Placeholder Image</p>
          </div>
          <div className="order-5 md:order-6">
            <h2 className="text-xl font-bold mb-2">MIDNIGHT CHERRY</h2>
            <p>
              A captivating blend of cherry liqueur, bitter almond, and fresh
              bergamot – a sweet yet bold aroma that instantly draws attention.
            </p>
          </div>

          {/* Oud Légendaire - Left Text */}
          <div className="order-7 md:order-7">
            <h2 className="text-xl font-bold mb-2">OUD LÉGENDAIRE</h2>
            <p>
              Bright, tropical, and mysterious, the scent combines passion
              fruit, pineapple, mango, and bergamot with warm woods, leather,
              oud, and soft amber.
            </p>
          </div>
          <div className="order-8 md:order-8 h-64 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500 italic">Placeholder Image</p>
          </div>

          {/* Or du Soir - Right Text */}
          <div className="order-10 md:order-9 h-64 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500 italic">Placeholder Image</p>
          </div>
          <div className="order-9 md:order-10">
            <h2 className="text-xl font-bold mb-2">OR DU SOIR</h2>
            <p>
              A touch of coffee and amaretto brings warmth, like the first sip
              of a slow evening. Creamy ice cream notes melt into bourbon
              vanilla, brown sugar, and a spark of black pepper.
            </p>
          </div>
        </div>

        {/* Section: About EVOSTE & Contact */}
      </div>
    </main>
  );
}
