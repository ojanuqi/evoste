import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import products from "@/data/products";

interface OrderItem {
  productId: number;
  size: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
}

interface Order {
  id: string;
  userId: number;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

const ordersFilePath = path.join(process.cwd(), "data", "orders.json");
const cartFilePath = path.join(process.cwd(), "data", "cart.json");

function readOrders(): Order[] {
  if (!fs.existsSync(ordersFilePath)) return [];
  return JSON.parse(fs.readFileSync(ordersFilePath, "utf-8") || "[]");
}

function writeOrders(orders: Order[]) {
  fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
}

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return NextResponse.json({ error: "No token" }, { status: 401 });

  const token = authHeader.split(" ")[1];
  let user: any;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET || "evoste-secret");
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const userId = user.id;

  // Baca cart dari file
  const cart = JSON.parse(fs.readFileSync(cartFilePath, "utf-8") || "[]");
  const userCart = cart.find((c: any) => c.userId === userId);
  if (!userCart || userCart.items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const body = await req.json();
  const { shippingAddress, paymentMethod } = body;

  const detailedItems: OrderItem[] = userCart.items.map((item: any) => {
    const product = products.find((p) => p.productId === item.productId);
    const sizeInfo = product?.sizes.find((s: any) => s.size === item.size);
    return {
      ...item,
      name: product?.name || "",
      price: sizeInfo?.price || 0,
      image: product?.image || "",
    };
  });

  const totalAmount = detailedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const newOrder: Order = {
    id: uuidv4(),
    userId,
    items: detailedItems,
    totalAmount,
    shippingAddress,
    paymentMethod,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  // Simpan ke file
  const orders = readOrders();
  orders.push(newOrder);
  writeOrders(orders);

  // Kosongkan cart user di file
  userCart.items = [];
  fs.writeFileSync(cartFilePath, JSON.stringify(cart, null, 2));

  return NextResponse.json({ message: "Checkout successful", order: newOrder });
}
