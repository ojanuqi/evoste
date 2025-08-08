import { NextResponse } from "next/server";
import { promises as fs } from "fs";  // Ganti import ke fs/promises
import path from "path";
import bcrypt from "bcryptjs";

const usersFilePath = path.join(process.cwd(), "data", "users.json");

export async function POST(req: Request) {
  const { firstName, lastName, email, password, confirmPassword } = await req.json();

  // Tambahkan log untuk melihat data yang diterima
  console.log({ firstName, lastName, email, password, confirmPassword });

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }

  // Validasi apakah password dan ulangiPassword sama
  if (password !== confirmPassword) {
    return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });
  }

  // Baca data users
  const data = await fs.readFile(usersFilePath, "utf-8");
  const users = JSON.parse(data);

  const existingUser = users.find((user: any) => user.email === email);
  if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 400 });
  }

  // Hash password sebelum disimpan
  const hashedPassword = await bcrypt.hash(password, 10);

  // Simpan user baru
  const newUser = { id: Date.now(), firstName, lastName, email, password: hashedPassword };
  users.push(newUser);

  // Menyimpan data ke file
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

  return NextResponse.json({ message: "Registration successful", user: newUser });
}
