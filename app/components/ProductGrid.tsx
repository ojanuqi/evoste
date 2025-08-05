// ====================================================================
// file: components/ProductGrid.tsx
// ====================================================================
"use client";

import ProductCard, { Product } from "./ProductCard";

const ProductGrid = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
