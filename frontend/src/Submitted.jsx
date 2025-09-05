import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Submitted() {
  const location = useLocation();
  const productId = location.state?.productId;
  const productKey = location.state?.productKey;
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-900 text-gray-100 shadow-md px-4 py-3 fixed w-full top-0 left-0 z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div onClick={()=> navigate("/")} className="text-2xl font-bold cursor-pointer hover:text-gray-300 transition-colors">
            Home
          </div>
        </div>
      </nav>

      {/* Centered Content */}
      <div className="flex-grow flex items-center justify-center pt-16">
        {productId && productKey ? (
          <div className="w-full max-w-md p-6 bg-white border border-gray-300 rounded-lg shadow-lg text-center">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
              Product Submitted Successfully
            </h1>
            <p className="text-lg mb-2">
              <span className="font-semibold">Product ID:</span> {productId}
            </p>
            <p className="text-lg mb-4">
              <span className="font-semibold">Product Key:</span> {productKey}
            </p>
            <p className="text-gray-600">
              Please save these credentials to manage your product later.
            </p>
          </div>
        ) : (
          <p className="text-red-500 text-lg">
            Product ID or Key not available.
          </p>
        )}
      </div>
    </div>
  );
}
