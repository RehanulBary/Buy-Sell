import { useNavigate } from "react-router-dom";

export default function ProductCard({ products }) {
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return <p className="text-gray-400 text-center mt-10">No products available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3 max-w-7xl mx-auto">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-gray-800 rounded-lg shadow-md border border-gray-300 cursor-pointer
                     hover:scale-105 transition-transform duration-200 flex flex-col overflow-hidden"
          onClick={() => navigate("/product-info", { state: { product } })}
        >
          {/* Product Image */}
          {product.image ? (
            <div className="w-full aspect-w-4 aspect-h-3 bg-gray-700 overflow-hidden">
              <img
                src={`https://buy-sell-production-b9f0.up.railway.app/uploads/${product.image}`}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ) : (
            <div className="w-full aspect-w-4 aspect-h-3 bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          )}

          {/* Product Info */}
          <div className="p-3 flex-1 flex flex-col justify-between">
            <div>
              <h2 className="font-semibold text-sm truncate">{product.name}</h2>
              <p className="text-xs text-gray-400 truncate">{product.category}</p>
            </div>
            <p className="font-semibold mt-2 text-right text-sm">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
