// evoste/lib/api.ts
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function apiFetch(path: string, options: RequestInit = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // gabungkan header bawaan + custom
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_BASE}/api${path}`, {
    ...options,
    headers,
  });

  // baca body sekali saja
  const text = await res.text();

  if (!res.ok) {
    try {
      const err = JSON.parse(text);
      throw new Error(err.message || text);
    } catch {
      throw new Error(text);
    }
  }

  // kalau response kosong (misal 204), return {}
  return text ? JSON.parse(text) : {};
}

export const api = {
  getProducts: () => apiFetch("/products"),
  getCart: () => apiFetch("/cart"),
  addToCart: (productId: number, size: string, quantity: number) =>
    apiFetch("/cart", {
      method: "POST",
      body: JSON.stringify({ productId, size, quantity }),
    }),
  checkout: (shippingAddress: string, paymentMethod: string) =>
    apiFetch("/checkout", {
      method: "POST",
      body: JSON.stringify({ shippingAddress, paymentMethod }),
    }),
  getOrder: (id: string) => apiFetch(`/orders/${id}`),
};
