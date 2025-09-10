import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

export default function Home() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await fetch("https://buy-sell-production-b9f0.up.railway.app/");
      const data = await res.json();
      if (data.success) setProducts(data.products);
      else setProducts([]);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = async () => {
    if (!search.trim()) return; // don't search if input is empty

    try {
      const res = await fetch("https://buy-sell-production-b9f0.up.railway.app/search_products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search })
      });
      const data = await res.json();
      if (data.success) setProducts(data.products);
      else setProducts([]);
    } catch (error) {
      console.error("Search failed:", error);
      setProducts([]);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (!value.trim()) {
      fetchData(); // reload all products when input is empty
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Navbar */}
      <nav className="bg-gray-800 text-gray-100 shadow-md px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
          <div
            onClick={fetchData}
            className="flex items-center text-2xl font-bold hover:text-gray-300 transition-colors duration-300 cursor-pointer mr-2"
          >
            <img src="/logo.png" className="w-8 h-8 object-contain" alt="Logo" />
            <span className="ml-2">Home</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-3 sm:space-y-0 w-full sm:w-auto">
            <div className="flex flex-1 sm:flex-none items-center border-2 border-gray-700 rounded-lg overflow-hidden shadow-sm">
              <input
                type="text"
                className="flex-1 p-2 bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="Search..."
                value={search}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                className="bg-gray-700 text-gray-100 px-4 py-2 hover:bg-gray-600 hover:scale-105 transition-all duration-200 cursor-pointer"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>

            <button
              className="ml-0 sm:ml-2 bg-gray-800 text-gray-100 px-5 py-2 rounded-lg shadow-md hover:bg-gray-700 hover:scale-105 transition-all duration-300 hover:cursor-pointer w-full sm:w-auto"
              onClick={() => navigate("/sell")}
            >
              SELL
            </button>

            <button
              className="ml-0 sm:ml-2 bg-gray-800 text-gray-100 px-5 py-2 rounded-lg shadow-md hover:bg-gray-700 hover:scale-105 transition-all duration-300 hover:cursor-pointer w-full sm:w-auto"
              onClick={() => navigate("/get_product")}
            >
              My Products
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow mt-5 sm:mt-15 w-full flex justify-center">
        <ProductCard products={products} />
      </main>

      {/* Footer */}
      <footer className="flex justify-center p-5 bg-gray-800 mt-5 sm:mt-15 text-white">
        Let<span className="text-amber-500">'</span>s serve each other 🤝
      </footer>
    </div>
  );
}
