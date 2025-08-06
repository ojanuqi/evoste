import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const cartFilePath = path.join(process.cwd(), "data", "cart.json");

export async function POST(req: NextRequest) {
  try {
    // Ambil token dari header
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET || "your-secret"; // Ganti sesuai env kamu

    let user: any;
    try {
      user = jwt.verify(token, secret);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = user.id;

    const body = await req.json();
    const { shippingAddress, paymentMethod } = body;

    if (!shippingAddress || !paymentMethod) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const cartRaw = fs.readFileSync(cartFilePath, "utf-8") || "[]";
    const cart = JSON.parse(cartRaw);
    const userCart = cart.find((c: any) => String(c.userId) === String(userId));

    if (!userCart || !userCart.items || userCart.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Simulasi checkout sukses
    return NextResponse.json({
      message: "Checkout successful",
      userId,
      shippingAddress,
      paymentMethod,
      items: userCart.items,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
