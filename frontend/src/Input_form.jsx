import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InputForm() {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productCategory, setProductCategory] = useState("");
  const [productContact, setProductContact] = useState("");
  const [productKey, setProductKey] = useState("");

  async function handleData(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productDescription", productDescription);
    formData.append("productCategory", productCategory);
    formData.append("productContact", productContact);
    formData.append("productKey", productKey);
    if (productImage) formData.append("productImage", productImage);

    try {
      const response = await fetch("http://localhost:3000/enter_data", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        const productId = data.productId;
        navigate("/sell_submitted", { state: { productId, productKey } });
      } else {
        console.error("Failed to submit product:", data.error);
      }
    } catch (err) {
      console.error("Error submitting product:", err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-800 text-gray-100 shadow-md px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
          <div
            onClick={() => navigate("/")}
            className="text-2xl font-bold hover:text-gray-300 transition-colors duration-300 cursor-pointer"
          >
            Home
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0 w-full sm:w-auto">
            <button
              className="bg-gray-800 text-gray-100 px-5 py-2 rounded-lg shadow-md hover:bg-gray-700 hover:scale-105 transition-all hover:cursor-pointer duration-300 w-full sm:w-auto"
              onClick={() => navigate("/get_product")}
            >
              My Products
            </button>
          </div>
        </div>
      </nav>

      {/* Centered Form */}
      <div className="flex justify-center items-center flex-grow px-4 py-5">
        <div className="w-full max-w-xl bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 m-2 md:my-auto md:mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-100 text-center">
            Product Form
          </h2>

          <form onSubmit={handleData} className="space-y-5" encType="multipart/form-data">
            {/* Name */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <label className="mb-1 sm:mb-0 w-full sm:w-32 font-medium text-gray-300">
                Name:
              </label>
              <input
                type="text"
                className="flex-1 border-2 border-gray-700 p-2 rounded bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Price */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <label className="mb-1 sm:mb-0 w-full sm:w-32 font-medium text-gray-300">
                Price:
              </label>
              <input
                type="text"
                className="flex-1 border-2 border-gray-700 p-2 rounded bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder="Enter product price"
                required
              />
            </div>

            {/* Product Key */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <label className="mb-1 sm:mb-0 w-full sm:w-32 font-medium text-gray-300">
                Product Key:
              </label>
              <input
                type="password"
                className="flex-1 border-2 border-gray-700 p-2 rounded bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
                value={productKey}
                onChange={(e) => setProductKey(e.target.value)}
                placeholder="Enter a secret key"
                required
              />
            </div>

            {/* Description */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
              <label className="mb-1 sm:mb-0 w-full sm:w-32 font-medium text-gray-300">
                Description:
              </label>
              <textarea
                className="flex-1 border-2 border-gray-700 p-2 rounded h-24 resize-none bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Enter product description"
                required
              />
            </div>

            {/* Category */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <label className="mb-1 sm:mb-0 w-full sm:w-32 font-medium text-gray-300">
                Category:
              </label>
              <input
                type="text"
                className="flex-1 border-2 border-gray-700 p-2 rounded bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                placeholder="Enter category"
                required
              />
            </div>

            {/* Contact */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <label className="mb-1 sm:mb-0 w-full sm:w-32 font-medium text-gray-300">
                Contact:
              </label>
              <input
                type="tel"
                className="flex-1 border-2 border-gray-700 p-2 rounded bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
                value={productContact}
                onChange={(e) => setProductContact(e.target.value)}
                placeholder="Enter contact number"
                pattern="[0-9]{11}"
                required
              />
            </div>

            {/* Image */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <label className="mb-1 sm:mb-0 w-full sm:w-32 font-medium text-gray-300">
                Image:
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  className="hidden"
                  onChange={(e) => setProductImage(e.target.files[0])}
                />
                <label
                  htmlFor="fileInput"
                  className="bg-gray-700 hover:bg-gray-600 text-gray-100 px-4 py-2 rounded cursor-pointer transition-all duration-200"
                >
                  Choose Image
                </label>
                <span className="text-gray-400 truncate max-w-xs">
                  {productImage ? productImage.name : "No file chosen"}
                </span>
              </div>
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                className="hover:cursor-pointer bg-gray-700 hover:bg-gray-600 text-gray-100 font-semibold px-6 py-2 rounded shadow transition-all duration-200 hover:scale-105 w-full sm:w-auto"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Footer */}
      <footer className="flex justify-center p-5 bg-gray-800 text-white">
        Let<span className="text-amber-500">'</span>s serve each other 🤝
      </footer>
    </div>
  );
}
