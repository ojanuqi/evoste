import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { verifyToken } from "@/lib/auth";

const cartFilePath = path.join(process.cwd(), "data", "cart.json");

function readCart() {
  if (!fs.existsSync(cartFilePath)) fs.writeFileSync(cartFilePath, "[]");
  const data = fs.readFileSync(cartFilePath, "utf-8");
  return JSON.parse(data || "[]");
}

function writeCart(cart: any) {
  fs.writeFileSync(cartFilePath, JSON.stringify(cart, null, 2));
}

function getUserIdOrFallback(req: Request) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1] || null;
  const user = token ? verifyToken(token) : null;
  if (process.env.NODE_ENV === "development") return user?.id || 1;
  if (!user) return null;
  return user.id;
}

export async function GET(req: Request) {
  const userId = getUserIdOrFallback(req);
  if (!userId) return NextResponse.json({ message: "No token" }, { status: 401 });

  const cart = readCart();
  const userCart = cart.find((c: any) => c.userId === userId) || { userId, items: [] };
  return NextResponse.json(userCart);
}

export async function POST(req: Request) {
  const userId = getUserIdOrFallback(req);
  if (!userId) return NextResponse.json({ message: "No token" }, { status: 401 });

  const body = await req.json();
  const productId = body.productId || body.name;
  const size = body.size || body.selectedSize;
  const quantity = body.quantity;

  if (!productId || !size || !quantity || quantity <= 0) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const cart = readCart();
  let userCart = cart.find((c: any) => c.userId === userId);

  if (!userCart) {
    userCart = { userId, items: [] };
    cart.push(userCart);
  }

  userCart.items = userCart.items.filter((item: any) => item.productId);

  const existingItem = userCart.items.find(
    (item: any) => item.productId === productId && item.size === size
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    userCart.items.push({ productId, size, quantity });
  }

  writeCart(cart);
  return NextResponse.json({ message: "Item added to cart", cart: userCart });
}

export async function PUT(req: Request) {
  const userId = getUserIdOrFallback(req);
  if (!userId) return NextResponse.json({ message: "No token" }, { status: 401 });

  const body = await req.json();
  const productId = body.productId || body.name;
  const size = body.size || body.selectedSize;
  const quantity = body.quantity;

  const cart = readCart();
  const userCart = cart.find((c: any) => c.userId === userId);
  if (!userCart) return NextResponse.json({ message: "Cart not found" }, { status: 404 });

  const item = userCart.items.find((i: any) => i.productId === productId && i.size === size);
  if (!item) return NextResponse.json({ message: "Item not found" }, { status: 404 });

  item.quantity = quantity;
  writeCart(cart);
  return NextResponse.json({ message: "Cart updated", cart: userCart });
}

export async function DELETE(req: Request) {
  const userId = getUserIdOrFallback(req);
  if (!userId) return NextResponse.json({ message: "No token" }, { status: 401 });

  const body = await req.json();
  const productId = body.productId || body.name;
  const size = body.size || body.selectedSize;

  const cart = readCart();
  const userCart = cart.find((c: any) => c.userId === userId);
  if (!userCart) return NextResponse.json({ message: "Cart not found" }, { status: 404 });

  userCart.items = userCart.items.filter(
    (i: any) => !(i.productId === productId && i.size === size)
  );

  writeCart(cart);
  return NextResponse.json({ message: "Item removed", cart: userCart });
}