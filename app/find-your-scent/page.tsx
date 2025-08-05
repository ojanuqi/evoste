"use client";

import { useState } from "react";

// Data untuk pertanyaan kuis dan jawaban (5 pertanyaan, 5 jawaban)
const quizData = [
  {
    question: "Apa suasana yang paling Anda nikmati saat ini?",
    answers: [
      {
        text: "Malam hari yang penuh dengan kehidupan",
        type: "Midnight Cherry",
      },
      { text: "Pagi yang cerah dan penuh kehangatan", type: "Ivory Bloom" },
      {
        text: "Siang hari yang energik dan penuh petualangan",
        type: "Citrine Flame",
      },
      { text: "Sore hari yang tenang dan elegan", type: "Oud Legendaire" },
      { text: "Suasana glamor di acara khusus", type: "Or du Soir" },
    ],
  },
  {
    question: "Gaya berpakaian Anda cenderung seperti apa?",
    answers: [
      { text: "Trendi dan berani tampil beda", type: "Midnight Cherry" },
      { text: "Sederhana, minimalis, dan klasik", type: "Ivory Bloom" },
      { text: "Sporty dan kasual", type: "Citrine Flame" },
      { text: "Elegan, eksklusif, dan formal", type: "Oud Legendaire" },
      { text: "Glamor, misterius, dan mewah", type: "Or du Soir" },
    ],
  },
  {
    question: "Apa jenis musik favorit Anda?",
    answers: [
      { text: "Pop, R&B, atau musik dansa", type: "Midnight Cherry" },
      {
        text: "Akustik, jazz, atau musik klasik yang menenangkan",
        type: "Ivory Bloom",
      },
      { text: "Rock, hip-hop, atau EDM", type: "Citrine Flame" },
      {
        text: "Orchestra atau musik instrumental yang dramatis",
        type: "Oud Legendaire",
      },
      { text: "Musik oriental, etnik, atau soul", type: "Or du Soir" },
    ],
  },
  {
    question: "Pilih aroma makanan atau minuman yang paling Anda suka?",
    answers: [
      {
        text: "Aroma buah ceri, stroberi, atau buah-buahan manis",
        type: "Midnight Cherry",
      },
      {
        text: "Aroma teh hijau, bunga melati, atau chamomile",
        type: "Ivory Bloom",
      },
      { text: "Aroma lemon, jeruk, atau mint", type: "Citrine Flame" },
      {
        text: "Aroma kopi, cokelat hitam, atau rempah-rempah",
        type: "Oud Legendaire",
      },
      { text: "Aroma vanila, kayu manis, atau karamel", type: "Or du Soir" },
    ],
  },
  {
    question: "Apa tempat favorit Anda untuk berlibur?",
    answers: [
      { text: "Klub malam, bar, atau festival musik", type: "Midnight Cherry" },
      {
        text: "Taman bunga, kebun raya, atau pedesaan yang asri",
        type: "Ivory Bloom",
      },
      {
        text: "Pegunungan, pantai, atau tempat olahraga",
        type: "Citrine Flame",
      },
      {
        text: "Hotel mewah, galeri seni, atau restoran fine dining",
        type: "Oud Legendaire",
      },
      {
        text: "Resort eksotis, lounge, atau tempat liburan tropis",
        type: "Or du Soir",
      },
    ],
  },
];

// Data rekomendasi parfum
const recommendations = {
  "Midnight Cherry": {
    name: "Midnight Cherry",
    description: "Aroma buah, manis, menggoda, cocok untuk malam hari.",
    image: "/parfum/Midnight Cherry.jpg",
  },
  "Ivory Bloom": {
    name: "Ivory Bloom",
    description: "Aroma floral, ringan, elegan, cocok untuk siang hari.",
    image: "/parfum/Ivory Bloom.jpg",
  },
  "Citrine Flame": {
    name: "Citrine Flame",
    description: "Aroma citrus, segar, energik, cocok untuk aktivitas.",
    image: "/parfum/Citrine Flame.jpg",
  },
  "Oud Legendaire": {
    name: "Oud Legendaire",
    description: "Aroma woody, kuat, mewah, cocok untuk acara formal.",
    image: "/parfum/Oud Legendaire.jpg",
  },
  "Or du Soir": {
    name: "Or du Soir",
    description:
      "Aroma oriental/spicy, sensual, eksotis, cocok untuk malam & pesta.",
    image: "/parfum/Or du Soir.jpg",
  },
};

export default function FindYourScentQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  // State untuk menyimpan hasil akhir, hanya satu string atau null
  const [result, setResult] = useState<string | null>(null);
  // State untuk menyimpan riwayat jawaban dalam urutan
  const [history, setHistory] = useState<string[]>([]);

  const handleAnswerClick = (type: string) => {
    // Simpan jawaban ke riwayat
    setHistory((prevHistory) => [...prevHistory, type]);
    // Tambahkan skor untuk jenis parfum yang dipilih
    setScores((prevScores) => ({
      ...prevScores,
      [type]: (prevScores[type] || 0) + 1,
    }));

    // Pindah ke pertanyaan berikutnya
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Logika penentuan hasil akhir (hanya satu produk)
      const finalScores = { ...scores, [type]: (scores[type] || 0) + 1 };

      let highestScore = 0;
      let winners: string[] = [];

      // Cari skor tertinggi dan semua produk yang memiliki skor tersebut
      for (const key in finalScores) {
        if (finalScores[key] > highestScore) {
          highestScore = finalScores[key];
          winners = [key];
        } else if (finalScores[key] === highestScore) {
          winners.push(key);
        }
      }

      // Jika hanya ada satu pemenang, itu adalah hasilnya
      if (winners.length === 1) {
        setResult(winners[0]);
      } else {
        // Jika ada hasil seri, gunakan riwayat jawaban untuk menentukan pemenang
        // Ambil produk yang pertama kali dipilih dari daftar pemenang seri
        const tieBreakerWinner = history.find((item) => winners.includes(item));
        if (tieBreakerWinner) {
          setResult(tieBreakerWinner);
        } else {
          // Fallback jika tidak ada pemenang yang bisa ditentukan
          setResult(null);
        }
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScores({});
    setResult(null);
    setHistory([]);
  };

  const handleBackToStart = () => {
    handleRestartQuiz();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 font-sans">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8 relative">
        <h2 className="text-4xl font-serif text-center font-bold text-navy-900 mb-2">
          FIND YOUR SCENT
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Answer the question and unlock your personalized fragrance
          recommendation
        </p>

        {result ? (
          // Tampilan Hasil
          <div className="text-center">
            <button
              onClick={handleBackToStart}
              className="absolute top-4 left-4 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Kembali</span>
            </button>

            <h3 className="text-2xl font-serif font-bold text-navy-900 mb-4">
              Berdasarkan preferensi Anda, inilah rekomendasi parfum pilihan
              kami.
            </h3>

            {/* Display User Answers */}
            <div className="text-left mb-8">
              <h4 className="text-xl font-bold text-navy-900 mb-4">
                Jawaban Anda:
              </h4>
              {history.map((answerType, index) => {
                const question = quizData[index].question;
                const answerText = quizData[index].answers.find(
                  (ans) => ans.type === answerType
                )?.text;
                return (
                  <div key={index} className="mb-4">
                    <p className="text-lg font-semibold text-gray-700">
                      {question}
                    </p>
                    <p className="text-md text-gray-600 ml-4">› {answerText}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col items-center space-y-8">
              {/* Menampilkan satu produk hasil akhir */}
              {result && (
                <div className="flex flex-col items-center">
                  <img
                    src={
                      recommendations[result as keyof typeof recommendations]
                        .image
                    }
                    alt={
                      recommendations[result as keyof typeof recommendations]
                        .name
                    }
                    className="mx-auto w-full max-w-sm h-auto mb-4"
                  />
                  <h4 className="text-3xl font-bold text-navy-900 mb-2">
                    {
                      recommendations[result as keyof typeof recommendations]
                        .name
                    }
                  </h4>
                  <p className="text-gray-700 mb-6">
                    {
                      recommendations[result as keyof typeof recommendations]
                        .description
                    }
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={handleRestartQuiz}
                className="bg-navy-900 text-white px-6 py-3 rounded-full font-bold hover:bg-gray-700 transition-colors duration-300"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        ) : (
          // Tampilan Pertanyaan
          <div className="text-center">
            <p className="text-gray-500 mb-8">
              QUESTION {currentQuestion + 1} / {quizData.length}
            </p>
            <h3 className="text-2xl font-bold mb-8">
              {quizData[currentQuestion].question}
            </h3>
            <div className="space-y-4">
              {quizData[currentQuestion].answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(answer.type)}
                  className="w-full py-4 px-6 border border-gray-300 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors duration-200"
                >
                  {answer.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
