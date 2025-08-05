export default function CommunityStories() {
  return (
    <section className="container mx-auto mt-16 p-4">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Kontainer Video Placeholder */}
        <div className="w-full md:w-1/2 bg-gray-200 h-64 md:h-96 flex items-center justify-center relative">
          <p className="text-gray-500 font-serif text-2xl">Video</p>
          {/* Anda bisa menambahkan elemen video di sini nanti */}
        </div>

        {/* Konten Teks */}
        <div className="w-full md:w-1/2 text-center flex flex-col justify-center">
          <h2 className="text-4xl font-serif font-bold mb-4">
            COMMUNITY STORIES
          </h2>
          <p className="text-xl italic text-navy-900">
            "Because every scent tells a story."
          </p>
        </div>
      </div>
    </section>
  );
}
