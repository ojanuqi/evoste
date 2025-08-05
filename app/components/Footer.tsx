export default function Footer() {
  return (
    <footer className="bg-[#E5E7EB] text-black p-8 font-sans">
      <div className="container mx-auto text-center">
        {/* Logo EVOSTE */}
        <h2 className="text-3xl font-serif font-bold mb-4">EVOSTE</h2>
        <p className="max-w-xl mx-auto mb-4 text-sm leading-relaxed">
          EVOSTE is more than a fragrance brand – it is a journey through the
          senses. Each bottle holds a curated collection of exclusive scents,
          inspired by deep emotions, unforgettable moments, and the untamed
          richness of nature. From the warmth of sunlit blossoms to the mystery
          of twilight woods, every note is carefully crafted to evoke feeling
          and memory.
        </p>

        <p className="max-w-xl mx-auto text-sm mb-4">
          Our fragrances are a tribute to elegance, authenticity, and
          individuality – designed for those who desire more than just perfume.
          They are for those who seek connection, presence, and identity in
          every spritz. With EVOSTE, scent becomes a signature, a statement, and
          a story
        </p>

        <div className="mt-8">
          <p className="text-lg font-bold mb-2">Ready to grow with EVOSTE?</p>
          <p className="text-sm mb-4">
            Join our fast-growing Reseller network. DM us or contact us on
            WhatsApp to get started.
          </p>
          <div className="flex flex-wrap justify-center items-center space-x-4 md:space-x-8 text-sm mt-4">
            <p className="flex items-center space-x-2">
              <img src="/icon/package.svg" alt="MOQ" className="w-4 h-4" />
              <span>MOQ : 12 | 24 | 48 Pcs</span>
            </p>
            <p className="flex items-center space-x-2">
              <a href="#" className="flex items-center space-x-2">
                <img
                  src="/icon/whatsapp.svg"
                  alt="WhatsApp"
                  className="w-4 h-4"
                />
                <span>(+62) 877-7774-5791</span>
              </a>
            </p>
            <p className="flex items-center space-x-2">
              <a href="#" className="flex items-center space-x-2">
                <img
                  src="/icon/instagram.svg"
                  alt="Instagram"
                  className="w-4 h-4"
                />
                <span>@evosteofficial</span>
              </a>
            </p>
            <p className="flex items-center space-x-2">
              <img src="/icon/globe.svg" alt="Shipment" className="w-4 h-4" />
              <span>Worldwide shipment</span>
            </p>
          </div>
          <p className="mt-8 text-xs italic">
            All our perfumes are formulated with international-grade ingredients
            and are BPOM-ready
          </p>
        </div>
      </div>
    </footer>
  );
}
