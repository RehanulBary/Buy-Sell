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

  // Determine if the layout should be stacked (portrait) or side-by-side (landscape)
  const [isStacked, setIsStacked] = React.useState(false);

  React.useEffect(() => {
    const checkLayout = () => {
      if (window.innerHeight / window.innerWidth > 2) {
        // Tall portrait → stacked
        setIsStacked(true);
      } else {
        // Wider → side-by-side (like lg)
        setIsStacked(false);
      }
    };
    checkLayout();
    window.addEventListener("resize", checkLayout);
    return () => window.removeEventListener("resize", checkLayout);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 relative flex flex-col items-center justify-center p-4">
      {/* Back Button in Top-Left */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 hover:cursor-pointer text-gray-100 hover:text-gray-300 px-4 py-2 rounded bg-gray-800 shadow"
      >
        &larr; Back
      </button>

      {/* Product Container */}
      <div className="flex justify-center items-center w-full">
        <div
          className={`flex w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg overflow-hidden ${
            isStacked ? "flex-col" : "flex-row"
          }`}
        >
          {/* Product Image */}
          {product.image && (
            <div className={`${isStacked ? "w-full" : "w-1/2"} flex-shrink-0`}>
              <div
                className={`w-full ${
                  isStacked ? "h-64 sm:h-80" : "h-full"
                } bg-gray-900`}
              >
                <img
                  src={`https://buy-sell-production-b9f0.up.railway.app${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Divider */}
          {!isStacked && <div className="w-px bg-gray-600"></div>}

          {/* Product Info */}
          <div
            className={`${
              isStacked ? "w-full" : "w-1/2"
            } p-6 flex flex-col justify-center space-y-3`}
          >
            <h1
              className={`text-2xl font-bold text-gray-100 ${
                isStacked ? "text-center" : "text-left"
              }`}
            >
              {product.name}
            </h1>

            <div
              className={`flex flex-col space-y-1 text-gray-400 text-sm ${
                isStacked ? "text-center" : "text-left"
              }`}
            >
              <span>Product ID: {product.id}</span>
              <span>Category: {product.category}</span>
              <span>Location: {product.location}</span>
            </div>

            <p
              className={`text-gray-100 text-sm ${
                isStacked ? "text-center" : "text-left"
              }`}
            >
              {product.description}
            </p>

            <p
              className={`text-lg font-semibold text-gray-100 ${
                isStacked ? "text-center" : "text-left"
              }`}
            >
              Price: ${product.price}
            </p>

            <p
              className={`text-gray-400 text-sm ${
                isStacked ? "text-center" : "text-left"
              }`}
            >
              Seller Contact: {product.contact}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
