import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const usersFilePath = path.join(process.cwd(), "data", "users.json");
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET not set in environment");
}
const JWT_SECRET = process.env.JWT_SECRET; // samakan di semua file

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email & Password required" },
      { status: 400 }
    );
  }

  const data = fs.readFileSync(usersFilePath, "utf-8");
  const users = JSON.parse(data);

  const user = users.find((u: any) => u.email === email);
  if (!user) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  }

  // Generate JWT Token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  // ✅ FE akan simpan token ke localStorage di sisi client
  // (Server-side Next.js tidak bisa set localStorage langsung)
  // FE harus tangkap response ini dan lakukan:
  // localStorage.setItem("token", token);

  return NextResponse.json({
    message: "Login success",
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
}
