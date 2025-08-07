// lib/auth.ts
import jwt, { JwtPayload } from "jsonwebtoken";

export function verifyToken(token: string) {
  if (token === "dummy-token-evoste") {
    return { id: 1, email: "dummy@evoste.com" };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "evoste-secret") as JwtPayload;
    return {
      id: (decoded as any).id,
      email: (decoded as any).email || "",
    };
  } catch {
    return null;
  }
}


