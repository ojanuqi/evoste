// lib/auth.ts
export function verifyToken(token: string) {
  if (!token) throw new Error("No token provided");

  // Untuk dev, balikin user dummy
  return { id: 1, name: "Test User" };
}
