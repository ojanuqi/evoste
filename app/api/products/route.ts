import { NextResponse } from "next/server";
import { products } from "@/data/products"; // sesuaikan path dengan file yang kamu pakai

export async function GET() {
  return NextResponse.json(products);
}
