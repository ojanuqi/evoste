import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "evoste-secret";

// Fungsi untuk memverifikasi token JWT
export function verifyToken(token: string) {
  try {
    // Verifikasi token dengan JWT_SECRET dan pastikan hasilnya berisi id dan email
    return jwt.verify(token, JWT_SECRET) as { id: number; email: string };
  } catch (err) {
    // Jika token tidak valid atau terjadi error, kembalikan null
    return null;
  }
}
