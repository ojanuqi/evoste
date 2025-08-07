import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

const usersFilePath = path.join(process.cwd(), "data", "users.json");

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }

  // Pastikan folder dan file ada
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, "[]", "utf-8");
  }

  // Baca user data
  const data = fs.readFileSync(usersFilePath, "utf-8");
  const users = JSON.parse(data);

  // Cek jika email sudah ada
  if (users.find((user: any) => user.email === email)) {
    return NextResponse.json({ message: "Email already exists" }, { status: 400 });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword,
  };

  users.push(newUser);

  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  return NextResponse.json({
    message: "Register success",
    user: { id: newUser.id, name, email },
  });
}
