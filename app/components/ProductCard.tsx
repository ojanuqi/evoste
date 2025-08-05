type ProductCardProps = {
  name: string;
  type: string;
  price: string;
};

export default function ProductCard({ name, type, price }: ProductCardProps) {
  return (
    <div className="w-64 p-4 text-center flex-shrink-0 bg-gray-200">
      {/* Placeholder untuk Product Image dengan rasio potret (4:5) */}
      <div className="bg-white h-80 w-full mb-4"></div>

      {/* Product Details */}
      <h3 className="font-serif text-lg font-bold">{name}</h3>
      <p className="text-sm">{type}</p>
      <p className="font-bold text-lg mt-2">{price}</p>
      <a href="#" className="text-sm underline mt-2 inline-block">
        Detail
      </a>
    </div>
  );
}
