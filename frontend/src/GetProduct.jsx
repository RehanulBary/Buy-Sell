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
                `http://localhost:3000/get_product?id=${inputId}&key=${productKey}`
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
            <div className="fixed top-0 left-0 w-full z-20">
                <nav className="bg-gray-800 text-gray-100 shadow-md px-4 py-3">
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                        <div
                            onClick={() => navigate("/")}
                            className="text-2xl font-bold hover:text-gray-300 transition-colors duration-300 cursor-pointer"
                        >
                            Home
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-3 sm:space-y-0 w-full sm:w-auto">
                            <button
                                className="bg-red-700 text-gray-100 px-5 py-2 rounded-lg shadow-md hover:bg-red-600 hover:scale-105 hover:cursor-pointer transition-all duration-300 w-full sm:w-auto"
                                onClick={() => navigate("/remove_product")}
                            >
                                Remove Product
                            </button>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Spacer for navbar */}
            <div className="h-16"></div>

            {/* Centered container */}
            <div className="flex flex-col mt-10 sm:mt-0 justify-center items-center flex-grow px-4 py-5">
                <div className="w-full max-w-lg bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 m-2 md:my-auto md:mx-auto">
                    <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-100 text-center">
                        Fetch Product by ID
                    </h2>

                    {/* Inputs */}
                    <div className="flex flex-col sm:flex-row w-full gap-2 mb-6">
                        <input
                            type="text"
                            placeholder="Enter Product ID"
                            value={inputId}
                            onChange={(e) => setInputId(e.target.value)}
                            className="flex-1 p-2 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                        <input
                            type="password"
                            placeholder="Enter Product Key"
                            value={productKey}
                            onChange={(e) => setProductKey(e.target.value)}
                            className="flex-1 p-2 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                        <button
                            onClick={fetchProduct}
                            className="bg-gray-700 hover:bg-gray-600 text-gray-100 px-4 py-2 rounded shadow-md transition-all duration-200 hover:cursor-pointer"
                        >
                            Find
                        </button>
                    </div>

                    {loading && <div className="text-gray-100 mb-4 text-center">Loading...</div>}
                    {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

                    {/* Product Card */}
                    {product && (
                        <div className="w-full bg-gray-700 border border-gray-600 rounded-lg shadow-lg p-3 text-gray-100">
                            <h2 className="text-lg font-bold mb-2 text-center sm:text-left">
                                Product Details
                            </h2>
                            <div className="space-y-1 text-sm">
                                <p><strong>ID:</strong> {product.id}</p>
                                <p><strong>Name:</strong> {product.name}</p>
                                <p><strong>Price:</strong> {product.price}</p>
                                <p><strong>Category:</strong> {product.category}</p>
                                <p><strong>Contact:</strong> {product.contact}</p>
                                <p><strong>Description:</strong> {product.description}</p>
                            </div>

                            {product.image && (
                                <div className="mt-2 flex justify-center">
                                    <img
                                        src={`http://localhost:3000/uploads/${product.image}`}
                                        alt={product.name}
                                        className="w-full max-w-sm max-h-32 object-contain rounded" // smaller height
                                    />
                                </div>
                            )}

                            {/* More Info Button */}
                            <div className="mt-2">
                                <button
                                    onClick={() => navigate("/buy_product", { state: { product } })}
                                    className="w-full bg-gray-600 hover:bg-gray-500 text-gray-100 px-3 py-1 rounded shadow transition-all duration-200 hover:cursor-pointer text-sm"
                                >
                                    More information
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
