import { useNavigate } from "react-router-dom";

export default function ProductCard({ products }) {
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return <p className="text-gray-100 text-center mt-10">No products available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-gray-800 rounded-lg shadow-md cursor-pointer hover:scale-105 transition-all duration-200"
          onClick={() => navigate("/product-info", { state: { product } })}
        >
          {product.image && (
            <img
              src={`https://buy-sell-production-b9f0.up.railway.app/uploads/${product.image}`}
              alt={product.name}
              className="w-full h-48 object-contain rounded-t-lg bg-gray-700"
            />
          )}
          <div className="p-4 text-gray-100">
            <h2 className="font-bold text-lg">{product.name}</h2>
            <p className="text-sm text-gray-400">{product.category}</p>
            <p className="font-semibold mt-2">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
