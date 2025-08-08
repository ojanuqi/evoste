// app/api/products/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Ambil data produk dari database atau file (misal products.ts)
  const products = require('../../data/products.ts');

  return NextResponse.json(products);
}
