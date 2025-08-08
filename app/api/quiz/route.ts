import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const quizFilePath = path.join(process.cwd(), "data", "quiz_results.json");

// Helper untuk baca & tulis file
function readQuiz() {
  if (!fs.existsSync(quizFilePath)) return [];
  return JSON.parse(fs.readFileSync(quizFilePath, "utf-8") || "[]");
}

function writeQuiz(data: any) {
  fs.writeFileSync(quizFilePath, JSON.stringify(data, null, 2));
}

// GET → Lihat semua hasil quiz (untuk testing)
export async function GET() {
  const quizResults = readQuiz();
  return NextResponse.json(quizResults);
}

// POST → Simpan hasil quiz baru
export async function POST(req: Request) {
  const body = await req.json();
  const { userId, answers, recommendedProduct } = body;

  if (!userId || !answers || !recommendedProduct) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const quizResults = readQuiz();
  const newResult = {
    id: Date.now(),
    userId,
    answers,
    recommendedProduct,
    createdAt: new Date().toISOString(),
  };

  quizResults.push(newResult);
  writeQuiz(quizResults);

  return NextResponse.json({ message: "Quiz saved", result: newResult });
}
