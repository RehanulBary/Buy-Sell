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
            <nav className="bg-gray-800 text-gray-100 shadow-md px-4 py-3">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                    <div
                        onClick={() => navigate("/")}
                        className="flex items-center text-2xl font-bold hover:text-gray-300 transition-colors duration-300 cursor-pointer"
                    >
                        <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain mr-2" />
                        Home
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-3 sm:space-y-0 w-full sm:w-auto">
                        <button
                            className="bg-red-700 text-gray-100 px-4 py-1 rounded-lg shadow-md hover:bg-red-600 hover:scale-105 hover:cursor-pointer transition-all duration-300 w-full sm:w-auto"
                            onClick={() => navigate("/remove_product")}
                        >
                            Remove Product
                        </button>
                    </div>
                </div>
            </nav>

            {/* Centered container */}
            <div className="flex flex-col justify-center items-center flex-grow px-4 py-5">
                <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 m-2">
                    <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-100 text-center">
                        Fetch Product by ID
                    </h2>

                    {/* Inputs */}
                    {/* Inputs */}
                    <div className="flex flex-wrap sm:flex-nowrap w-full gap-2 mb-4 items-center">
                        <input
                            type="text"
                            placeholder="Enter Product ID"
                            value={inputId}
                            onChange={(e) => setInputId(e.target.value)}
                            className="flex-1 min-w-[120px] p-2 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                        <input
                            type="password"
                            placeholder="Enter Product Key"
                            value={productKey}
                            onChange={(e) => setProductKey(e.target.value)}
                            className="flex-1 min-w-[120px] p-2 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                        <button
                            onClick={fetchProduct}
                            className="bg-gray-700 hover:bg-gray-600 text-gray-100 px-4 py-2 rounded shadow-md transition-all duration-200 hover:cursor-pointer flex-shrink-0"
                        >
                            Find
                        </button>
                    </div>

                    {loading && <div className="text-gray-100 mb-2 text-center">Loading...</div>}
                    {error && <div className="text-red-500 mb-2 text-center">{error}</div>}

                    {/* Product Card */}
                    {product && (
                        <div className="w-full bg-gray-700 border border-gray-600 rounded-lg shadow-lg p-2 text-gray-100">
                            <h2 className="text-base font-bold mb-2 text-center sm:text-left">
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
                                <div className="mt-1 flex justify-center">
                                    <img
                                        src={`http://localhost:3000/uploads/${product.image}`}
                                        alt={product.name}
                                        className="w-full max-w-xs max-h-24 object-contain rounded"
                                    />
                                </div>
                            )}

                            <div className="mt-1">
                                <button
                                    onClick={() => navigate("/buy_product", { state: { product } })}
                                    className="w-full bg-gray-600 hover:bg-gray-500 text-gray-100 px-2 py-1 rounded shadow transition-all duration-200 hover:cursor-pointer text-sm"
                                >
                                    More information
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <footer className="flex justify-center p-4 bg-gray-800 text-white text-sm">
                Let<span className="text-amber-500">'</span>s serve each other 🤝
            </footer>
        </div>
    );
}
