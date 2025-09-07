import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RemoveProduct() {
    const navigate = useNavigate();
    const [inputId, setInputId] = useState("");
    const [productKey, setProductKey] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleRemove = async () => {
        if (!inputId || !productKey) {
            setError("Please enter both Product ID and Product Key");
            setMessage(null);
            return;
        }

        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            const response = await fetch(`buy-sell-production-b9f0.up.railway.app/remove_product`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: inputId, productKey }),
            });

            const data = await response.json();

            if (data.success) {
                setMessage(data.message);
            } else {
                setError(data.error || "Failed to remove product");
            }
        } catch (err) {
            console.error(err);
            setError("Error removing product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            {/* Navbar */}
            <nav className="bg-gray-800 text-gray-100 shadow-md px-4 py-3">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div
                        onClick={() => navigate("/")}
                        className="flex items-center text-2xl font-bold hover:text-gray-300 transition-colors duration-300 cursor-pointer"
                    >
                        <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain mr-2" />
                        Home
                    </div>

                </div>
            </nav>

            {/* Centered form */}
            <div className="flex flex-grow justify-center items-center px-4">
                <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-100 text-center mb-6">
                        Remove Product Safely
                    </h2>

                    {/* Inputs & Button */}
                    <div className="flex flex-col sm:flex-row sm:flex-wrap items-center w-full gap-2 mb-6">
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
                            onClick={handleRemove}
                            className="w-full sm:w-auto h-10 bg-red-700 hover:bg-red-600 text-gray-100 px-4 rounded shadow-md transition-all hover:cursor-pointer duration-200"
                        >
                            Remove
                        </button>
                    </div>

                    {loading && <div className="text-gray-100 mb-4 text-center">Removing...</div>}
                    {message && <div className="text-green-500 mb-4 text-center">{message}</div>}
                    {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
                </div>
            </div>

            <footer className="flex justify-center p-5 bg-gray-800 text-white">
                Let<span className="text-amber-500">'</span>s serve each other 🤝
            </footer>
        </div>
    );
}
