import { CartItem } from "./types/cart";

export const addToCart = async (item: CartItem, token: string | null) => {
  try {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({
        name: item.name,
        selectedSize: item.selectedSize,
        quantity: item.quantity,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("API addToCart error:", err);
    return false;
  }
};
