import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { orders, Order } from "@/lib/data";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return NextResponse.json({ error: "No token" }, { status: 401 });

  const token = authHeader.split(" ")[1];
  let user: any;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET || "evoste-secret");
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const userOrders = orders.filter((o) => o.userId === user.id);
  return NextResponse.json(userOrders);
}
