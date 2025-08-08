// lib/data.ts
export interface OrderItem {
  productId: number;
  size: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  userId: number;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

// Shared memory untuk simpan order di runtime
export const orders: Order[] = [];
