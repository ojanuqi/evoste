// evoste/lib/api.ts
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

async function apiFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token"); // simpan JWT di localStorage
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const res = await fetch(`${API_BASE}/api${path}`, {
    ...options,
    headers,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const api = {
  getProducts: () => apiFetch("/products"), // kalau BE punya
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
