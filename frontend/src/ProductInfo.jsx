import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProductInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
        <p className="text-center text-lg">
          No product selected. Please go back and select a product.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 relative flex flex-col items-center justify-center p-4">
      {/* Back Button always top-left */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 hover:cursor-pointer text-gray-100 hover:text-gray-300 px-4 py-2 rounded bg-gray-800 shadow"
      >
        &larr; Back
      </button>

      {/* Product Container */}
      <div className="flex justify-center items-center w-full">
        <div className="flex w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg overflow-hidden flex-col md:flex-row">
          {/* Product Image */}
          {product.image && (
            <div className="w-full md:w-1/2 flex-shrink-0">
              <div className="w-full h-64 sm:h-80 md:h-full bg-gray-900">
                <img
                  src={`https://buy-sell-production-b9f0.up.railway.app${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Divider only on md+ */}
          <div className="hidden md:block w-px bg-gray-600"></div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-center space-y-3">
            <h1 className="text-2xl font-bold text-gray-100 text-center md:text-left">
              {product.name}
            </h1>

            <div className="flex flex-col space-y-1 text-gray-400 text-sm text-center md:text-left">
              <span>Product ID: {product.id}</span>
              <span>Category: {product.category}</span>
              <span>Location: {product.location}</span>
            </div>

            <p className="text-gray-100 text-sm text-center md:text-left">
              {product.description}
            </p>

            <p className="text-lg font-semibold text-gray-100 text-center md:text-left">
              Price: ${product.price}
            </p>

            <p className="text-gray-400 text-sm text-center md:text-left">
              Seller Contact: {product.contact}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
