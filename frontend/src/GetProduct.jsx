
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GetProduct() {
  const navigate = useNavigate();
  const [inputId, setInputId] = useState("");
  const [productKey, setProductKey] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    if (!inputId || !productKey) {
      setError("Please enter both Product ID and Product Key");
      setProduct(null);
      return;
    }

    setLoading(true);
    setError(null);
    setProduct(null);

    try {
      const response = await fetch(
        `https://buy-sell-production-b9f0.up.railway.app/get_product?id=${inputId}&key=${productKey}`
      );
      const data = await response.json();

      if (data.success) {
        setProduct(data.product);
      } else {
        setError(data.error || "Product not found or incorrect key");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-800 text-gray-100 shadow-md px-4 py-3">
  <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center">
    {/* Home */}
    <div
      onClick={() => navigate("/")}
      className="flex items-center text-2xl font-bold hover:text-gray-300 transition-colors duration-300 cursor-pointer"
    >
      <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain mr-2" />
      Home
    </div>

    {/* Remove Product Button */}
    <div className="mt-3 sm:mt-0 w-full sm:w-auto flex sm:justify-end">
      <button
        className="bg-red-700 text-gray-100 px-4 py-1 rounded-lg shadow-md hover:bg-red-600 hover:scale-105 hover:cursor-pointer transition-all duration-300 w-full sm:w-auto"
        onClick={() => navigate("/remove_product")}
      >
        Remove Product
      </button>
    </div>
  </div>
</nav>


      {/* Centered form */}
      <div className="flex mt-10 mb-10 sm:mt-0 sm:mb-0 flex-grow justify-center items-center px-4">
        <div className="w-full max-w-md sm:max-w-md md:max-w-md lg:max-w-lg bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-100 text-center mb-6">
            Fetch Product by ID
          </h2>

          {/* Inputs & Button */}
          <div className="flex flex-col sm:flex-row items-center w-full gap-2 mb-6">
            <input
              type="text"
              placeholder="Enter Product ID"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
              className="w-full sm:flex-1 h-10 p-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <input
              type="password"
              placeholder="Enter Product Key"
              value={productKey}
              onChange={(e) => setProductKey(e.target.value)}
              className="w-full sm:flex-1 h-10 p-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button
              onClick={fetchProduct}
              className="w-full sm:w-auto h-10 bg-gray-700 hover:bg-gray-600 text-gray-100 px-4 rounded shadow-md transition-all hover:cursor-pointer duration-200"
            >
              Find
            </button>
          </div>

          {loading && <div className="text-gray-100 mb-4 text-center">Loading...</div>}
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

          {/* Product Card */}
          {product && (
            <div className="w-full bg-gray-700 border border-gray-600 rounded-lg shadow-lg p-4 sm:p-6 text-gray-100">
              <h2 className="text-base font-bold mb-4 text-center sm:text-left">
                Product Details
              </h2>
              <div className="space-y-1 text-sm mb-4">
                <p><strong>ID:</strong> {product.id}</p>
                <p><strong>Name:</strong> {product.name}</p>
                <p><strong>Price:</strong> {product.price}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Contact:</strong> {product.contact}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Location:</strong> {product.location}</p>
              </div>

              {product.image && (
                <div className="mt-2 flex justify-center w-full">
                  <img
                    src={`https://buy-sell-production-b9f0.up.railway.app${product.image}`}
                    alt={product.name}
                    className="w-full 
                 max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-sm
                 h-26 sm:h-30 md:h-34 lg:h-38
                 object-contain rounded bg-gray-800"
                  />
                </div>
              )}



              <div className="mt-4">
                <button
                  onClick={() => navigate("/product_info", { state: { product } })}
                  className="w-full bg-gray-600 hover:bg-gray-500 text-gray-100 px-2 py-1 rounded shadow transition-all duration-200 hover:cursor-pointer text-sm"
                >
                  More information
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="flex justify-center p-5 bg-gray-800 text-white">
        Let<span className="text-amber-500">'</span>s serve each other 🤝
      </footer>
    </div>
  );
}
