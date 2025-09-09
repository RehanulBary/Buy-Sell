import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ products }) {
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return (
      <div className="text-gray-400 text-center p-10">
        No products available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-2 max-w-7xl mx-auto">
      {products.map((product, index) => (
        <div
          key={index}
          className="bg-gray-800 text-gray-100 rounded-lg overflow-hidden shadow-xl border-gray-200 border-2
                     transition-transform duration-300 hover:-translate-y-1 
                     hover:shadow-lg w-full cursor-pointer flex flex-col"
        >
          {/* Product Image */}
          {product.image && (
            <div className="w-full relative" style={{ paddingTop: "75%" }}>
              <img
                src={`https://buy-sell-production-b9f0.up.railway.app${product.image}`}
                alt={product.name}
                className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          )}

          {/* Product Info */}
          <div className="p-3 flex flex-col flex-1">
            <div className="space-y-1">
              <h2 className="text-sm font-semibold hover:text-gray-300 transition-colors duration-200">
                {product.name}
              </h2>
              <p className="text-gray-400 text-xs">{product.category}</p>
              <p className="text-gray-400 text-xs">Location: {product.location}</p>
              <p className="text-gray-100 text-xs line-clamp-2">{product.description}</p>
            </div>

            {/* Bottom Content: Price + Button */}
            <div className="mt-auto">
              <p className="font-semibold text-gray-100 text-xs mb-1">
                Price: ${product.price}
              </p>
              <button
                onClick={() => navigate("/product_info", { state: { product } })}
                className="w-full bg-gray-700 hover:bg-gray-600 text-gray-100 px-2 py-1 rounded shadow transition-all duration-200 hover:cursor-pointer hover:scale-105 text-xs"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
