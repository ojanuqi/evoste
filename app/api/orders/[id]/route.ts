import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const ordersFilePath = path.join(process.cwd(), "data", "orders.json");

interface Order {
  id: string;
  userId: number;
  items: any[];
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

function readOrders(): Order[] {
  if (!fs.existsSync(ordersFilePath)) return [];
  return JSON.parse(fs.readFileSync(ordersFilePath, "utf-8") || "[]");
}

function writeOrders(orders: Order[]) {
  fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
}

// -------------------
// GET /api/orders/[id]
// -------------------
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return NextResponse.json({ error: "No token" }, { status: 401 });

  const token = authHeader.split(" ")[1];
  let user: any;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET || "evoste-secret");
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const orders = readOrders();
  const order = orders.find((o) => o.id === params.id && o.userId === user.id);

  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  return NextResponse.json(order);
}

// -------------------
// PUT /api/orders/[id]
// Update status
// -------------------
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return NextResponse.json({ error: "No token" }, { status: 401 });

  const token = authHeader.split(" ")[1];
  let user: any;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET || "evoste-secret");
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const { status } = await req.json();
  const orders = readOrders();
  const orderIndex = orders.findIndex((o) => o.id === params.id && o.userId === user.id);

  if (orderIndex === -1) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  orders[orderIndex].status = status;
  writeOrders(orders);

  return NextResponse.json({ message: "Status updated", order: orders[orderIndex] });
}
