import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const cartFilePath = path.join(process.cwd(), "data", "cart.json");
const ordersFilePath = path.join(process.cwd(), "data", "orders.json");

function safeRead(filePath: string) {
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "[]");
  return JSON.parse(fs.readFileSync(filePath, "utf-8") || "[]");
}

function safeWrite(filePath: string, data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const JWT_SECRET = process.env.JWT_SECRET || "evoste-secret";

    let user: any;
    try {
      user = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = user.id;

    let shippingAddress = "";
    let paymentMethod = "";

    try {
      const body = await req.json();
      shippingAddress = body.shippingAddress || "Alamat default";
      paymentMethod = body.paymentMethod || "Transfer Manual";
    } catch {
      // Jika tidak ada body, pakai nilai default agar bisa checkout tanpa form
      shippingAddress = "Alamat default";
      paymentMethod = "Transfer Manual";
    }

    const cart = safeRead(cartFilePath);
    const userCartIndex = cart.findIndex((c: any) => String(c.userId) === String(userId));

    if (userCartIndex === -1 || !cart[userCartIndex].items || cart[userCartIndex].items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const userCart = cart[userCartIndex];

    const orders = safeRead(ordersFilePath);
    const newOrder = {
      id: Date.now(),
      userId,
      email: user.email || "",
      shippingAddress,
      paymentMethod,
      items: userCart.items,
      createdAt: new Date().toISOString(),
      status: "Pending",
    };

    orders.push(newOrder);
    safeWrite(ordersFilePath, orders);

    cart[userCartIndex].items = [];
    safeWrite(cartFilePath, cart);

    return NextResponse.json({
      message: "Checkout successful",
      order: newOrder,
    });
  } catch (err: any) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
