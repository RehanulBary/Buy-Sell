import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BuyProduct() {
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
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-4">
      {/* Back Button */}
      <div className="w-full mb-6">
        <button
          onClick={() => navigate(-1)}
          className="hover:cursor-pointer text-gray-100 hover:text-gray-300 px-4 py-2 rounded bg-gray-800 shadow"
        >
          &larr; Back
        </button>
      </div>

      {/* Centered Product Card */}
      <div className="flex flex-grow justify-center items-center w-full">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-4xl bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
          {/* Product Image */}
          {product.image && (
            <div className="md:w-1/2 flex-shrink-0">
              <img
                src={`http://localhost:3000/uploads/${product.image}`}
                alt={product.name}
                className="w-full h-auto object-contain"
              />
            </div>
          )}

          {/* Product Details */}
          <div className="md:w-1/2 p-6 flex flex-col justify-center space-y-4">
            <h1 className="text-2xl font-bold text-gray-100 text-center md:text-left">
              {product.name}
            </h1>
            <p className="text-gray-400 text-sm text-center md:text-left">
              Product ID: {product.id}
            </p>
            <p className="text-gray-400 text-sm text-center md:text-left">
              {product.category}
            </p>
            <p className="text-gray-100 text-center md:text-left">
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
