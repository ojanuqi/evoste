"use client";

import { useState } from "react";

// Data untuk pertanyaan kuis dan jawaban
const quizData = [
  {
    question: "Apa aktivitas favorit Anda saat waktu luang?",
    answers: [
      { text: "Menjelajah kehidupan malam di kota", type: "Midnight Cherry" },
      { text: "Berjalan-jalan di taman bunga", type: "Ivory Bloom" },
      { text: "Berolahraga atau berpetualang", type: "Citrine Flame" },
      { text: "Menghadiri acara formal atau bisnis", type: "Oud Legendaire" },
      {
        text: "Nongkrong di tempat eksotis atau bar lounge",
        type: "Or du Soir",
      },
    ],
  },
  {
    question: "Gaya berpakaian Anda cenderung seperti apa?",
    answers: [
      { text: "Trendi dan berani tampil beda", type: "Midnight Cherry" },
      { text: "Sederhana dan klasik", type: "Ivory Bloom" },
      { text: "Sporty dan kasual", type: "Citrine Flame" },
      { text: "Elegan dan eksklusif", type: "Oud Legendaire" },
      { text: "Glamor dan misterius", type: "Or du Soir" },
    ],
  },
  {
    question: "Kapan waktu favorit Anda memakai parfum?",
    answers: [
      { text: "Malam hari sebelum kencan", type: "Midnight Cherry" },
      { text: "Pagi hari untuk kegiatan harian", type: "Ivory Bloom" },
      { text: "Sepanjang hari saat beraktivitas", type: "Citrine Flame" },
      { text: "Saat pertemuan atau event penting", type: "Oud Legendaire" },
      { text: "Acara khusus seperti pesta atau konser", type: "Or du Soir" },
    ],
  },
];

// Data rekomendasi parfum
const recommendations = {
  "Midnight Cherry": {
    name: "Midnight Cherry",
    description: "Aroma buah, manis, menggoda, cocok untuk malam hari.",
    image: "/parfum/Midnight Cherry.png",
  },
  "Ivory Bloom": {
    name: "Ivory Bloom",
    description: "Aroma floral, ringan, elegan, cocok untuk siang hari.",
    image: "/parfum/Ivory Bloom.png",
  },
  "Citrine Flame": {
    name: "Citrine Flame",
    description: "Aroma citrus, segar, energik, cocok untuk aktivitas.",
    image: "/parfum/Citrine Flame.png",
  },
  "Oud Legendaire": {
    name: "Oud Legendaire",
    description: "Aroma woody, kuat, mewah, cocok untuk acara formal.",
    image: "/parfum/Oud Legendaire.png",
  },
  "Or du Soir": {
    name: "Or du Soir",
    description:
      "Aroma oriental/spicy, sensual, eksotis, cocok untuk malam & pesta.",
    image: "/parfum/Or du Soir.png",
  },
};

export default function FindYourScentQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  // Mengubah tipe state 'result' menjadi array untuk menampung kemungkinan hasil seri
  const [result, setResult] = useState<string[] | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const handleAnswerClick = (type: string) => {
    // Menambahkan console.log untuk debugging
    console.log(`Jawaban yang dipilih: ${type}`);
    setHistory((prevHistory) => [...prevHistory, type]);
    setScores((prevScores) => ({
      ...prevScores,
      [type]: (prevScores[type] || 0) + 1,
    }));

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const uniqueAnswers = Array.from(new Set([...history, type]));
      // Menambahkan console.log untuk debugging
      console.log("Riwayat jawaban:", [...history, type]);
      console.log("Jawaban unik:", uniqueAnswers);
      setResult(uniqueAnswers.length > 0 ? uniqueAnswers : null);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScores({});
    setResult(null);
    setHistory([]);
  };

  // Fungsi untuk kembali ke pertanyaan pertama (awal kuis)
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
            {/* Tombol kembali yang hanya muncul setelah hasil ditemukan */}
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
              Berdasarkan preferensi Anda, inilah {result.length} rekomendasi
              parfum pilihan kami.
            </h3>

            {/* Display User Answers */}
            <div className="text-left mb-8">
              <h4 className="text-xl font-bold text-navy-900 mb-4">
                Jawaban Anda:
              </h4>
              {history.map((answerType, index) => {
                const question = quizData[index].question;
                // Mencari teks jawaban dari type yang tersimpan di history
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
              {result.map((fragranceKey) => {
                const recommendation =
                  recommendations[fragranceKey as keyof typeof recommendations];
                return (
                  <div
                    key={fragranceKey}
                    className="flex flex-col items-center"
                  >
                    <img
                      src={recommendation.image}
                      alt={recommendation.name}
                      className="mx-auto w-full max-w-sm h-auto mb-4"
                    />
                    <h4 className="text-3xl font-bold text-navy-900 mb-2">
                      {recommendation.name}
                    </h4>
                    <p className="text-gray-700 mb-6">
                      {recommendation.description}
                    </p>
                  </div>
                );
              })}
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
