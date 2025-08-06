import { NextResponse } from "next/server";

const reviews = [
  {
    id: 1,
    user: {
      name: "Rani",
      age: 23,
      city: "Bandung",
    },
    product: "Ivory Bloom",
    story:
      "Aku memakai Ivory Bloom di hari wisuda. Aroma lychee dan Turkish rose-nya langsung membawaku kembali ke pagi hari saat aku menunggu pengumuman kelulusan. Sekarang setiap kali aku menyemprotkannya, aku merasa percaya diri seperti di hari itu.",
    createdAt: "2025-08-01T10:00:00Z",
  },
  {
    id: 2,
    user: {
      name: "Alya",
      age: 26,
      city: "Surabaya",
    },
    product: "Midnight Cherry",
    story: "Wanginya manis dan hangat, cocok buat acara malam!",
    createdAt: "2025-08-02T15:30:00Z",
  },
  {
    id: 3,
    user: {
      name: "Raka",
      age: 28,
      city: "Jakarta",
    },
    product: "Oud Legendaire",
    story: "Berasa luxury banget. Kuat tapi elegan.",
    createdAt: "2025-08-03T09:15:00Z",
  },
];

export async function GET() {
  return NextResponse.json(reviews);
}
