"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function OrderPage() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (id) {
      fetch(`/api/orders/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Order not found or invalid token");
          }
          return res.json();
        })
        .then((data) => {
          setOrder(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Order Details for Order #{order.id}</h1>
      <p>Status: {order.status}</p>
      <p>Total: {order.totalAmount}</p>
      <p>Shipping Address: {order.shippingAddress}</p>
      <p>Payment Method: {order.paymentMethod}</p>
      <p>Created At: {order.createdAt}</p>

      <h3>Items:</h3>
      <ul>
        {order.items.map((item: any, index: number) => (
          <li key={index}>
            {item.name} - {item.quantity} x {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
