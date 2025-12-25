import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/all");

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        setProducts(data.products || data);
      } catch (err) {
        console.error(err);
        setError("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Explore Our Products
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Premium electronic accessories crafted for performance, comfort,
            and style.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* LOADING */}
        {loading && (
          <div className="text-center text-lg text-gray-600">
            Loading products...
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="text-center text-red-500 font-semibold">
            {error}
          </div>
        )}

        {/* PRODUCTS */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden group"
              >
                {/* IMAGE */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={
                      product.image ||
                      "https://via.placeholder.com/400"
                    }
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />

                  <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                    {product.genre || "Electronics"}
                  </span>
                </div>

                {/* DETAILS */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                    {product.title}
                  </h3>

                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-extrabold text-gray-900">
                      ₹{product.price}
                    </span>

                    <button
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 
                                 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                    >
                      <ShoppingCart size={18} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NO PRODUCTS */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center text-gray-600 text-lg">
            No products available
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
