import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { verifyToken } from "@/lib/auth";

const cartFilePath = path.join(process.cwd(), "data", "cart.json");

// Helper untuk baca & tulis file
function readCart() {
  if (!fs.existsSync(cartFilePath)) fs.writeFileSync(cartFilePath, "[]");
  const data = fs.readFileSync(cartFilePath, "utf-8");
  return JSON.parse(data || "[]");
}

function writeCart(cart: any) {
  fs.writeFileSync(cartFilePath, JSON.stringify(cart, null, 2));
}

// -------------------
// GET /api/cart
// -------------------
export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return NextResponse.json({ message: "No token" }, { status: 401 });

  const token = authHeader.split(" ")[1];
  
  const user = verifyToken(token);
  if (!user) return NextResponse.json({ message: "Invalid token" }, { status: 401 });

  const cart = readCart();
  const userCart = cart.find((c: any) => c.userId === user.id) || { userId: user.id, items: [] };

  return NextResponse.json(userCart);
}

// -------------------
// POST /api/cart
// -------------------
export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return NextResponse.json({ message: "No token" }, { status: 401 });

  const token = authHeader.split(" ")[1];
  
  const user = verifyToken(token);
  if (!user) return NextResponse.json({ message: "Invalid token" }, { status: 401 });

  const { productId, size, quantity } = await req.json();
  const cart = readCart();

  let userCart = cart.find((c: any) => c.userId === user.id);
  if (!userCart) {
    userCart = { userId: user.id, items: [] };
    cart.push(userCart);
  }

  const existingItem = userCart.items.find((item: any) => item.productId === productId && item.size === size);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    userCart.items.push({ productId, size, quantity });
  }

  writeCart(cart);

  // Tidak perlu fetch ulang, langsung return data yang sudah diupdate
  return NextResponse.json({ message: "Item added to cart", cart: userCart });
}

// -------------------
// PUT /api/cart
// -------------------
export async function PUT(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return NextResponse.json({ message: "No token" }, { status: 401 });

  const token = authHeader.split(" ")[1];

  const user = verifyToken(token);
  if (!user) return NextResponse.json({ message: "Invalid token" }, { status: 401 });

  const { productId, size, quantity } = await req.json();
  const cart = readCart();

  const userCart = cart.find((c: any) => c.userId === user.id);
  if (!userCart) return NextResponse.json({ message: "Cart not found" }, { status: 404 });

  const item = userCart.items.find((i: any) => i.productId === productId && i.size === size);
  if (!item) return NextResponse.json({ message: "Item not found" }, { status: 404 });

  item.quantity = quantity;
  writeCart(cart);

  return NextResponse.json({ message: "Cart updated", cart: userCart });
}

// -------------------
// DELETE /api/cart
// -------------------
export async function DELETE(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return NextResponse.json({ message: "No token" }, { status: 401 });

  const token = authHeader.split(" ")[1];

  const user = verifyToken(token);
  if (!user) return NextResponse.json({ message: "Invalid token" }, { status: 401 });

  const { productId, size } = await req.json();
  const cart = readCart();

  const userCart = cart.find((c: any) => c.userId === user.id);
  if (!userCart) return NextResponse.json({ message: "Cart not found" }, { status: 404 });

  userCart.items = userCart.items.filter((i: any) => !(i.productId === productId && i.size === size));
  writeCart(cart);

  return NextResponse.json({ message: "Item removed", cart: userCart });
}
