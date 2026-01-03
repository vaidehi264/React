import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Added import
import { getAllProducts } from "../services/productServices";
import { useDispatch } from "react-redux";
import { addToCart } from "../Store/cartSlice";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts(); // Use service
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        setError("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />
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
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
          >
            {products.map((product) => (
              <motion.div
                key={product._id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group relative flex flex-col h-full"
              >
                <Link to={`/product/${product._id}`} className="block flex-1">
                  {/* IMAGE */}
                  <div className="relative h-64 overflow-hidden bg-white p-6 flex items-center justify-center border-b border-gray-100">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      src={
                        product.image ||
                        "https://via.placeholder.com/400"
                      }
                      alt={product.title}
                      className="w-full h-full object-contain"
                    />

                    <span className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold shadow-sm">
                      {product.genre || "Electronics"}
                    </span>

                    {product.isBooked && (
                      <span className="absolute top-4 right-4 bg-orange-500 text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-black shadow-lg shadow-orange-600/30 z-20">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* DETAILS */}
                  <div className="p-6 pb-20">
                    <h3 className="text-lg font-extrabold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>

                    <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-xl font-extrabold text-gray-900">
                        ₹{product.price}
                      </span>
                    </div>
                  </div>
                </Link>

                {/* ADD TO CART BUTTON */}
                <div className="absolute bottom-6 right-6 z-10">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700
                                 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-md shadow-blue-600/20"
                    onClick={(e) => {
                      e.preventDefault();
                      const user = localStorage.getItem("techifyUser");
                      if (!user) {
                        toast.error("Please login to add products to cart");
                        navigate("/login");
                        return;
                      }
                      dispatch(
                        addToCart({
                          id: product._id,
                          name: product.title,
                          price: product.price,
                          image: product.image,
                        })
                      );
                      toast.success(`${product.title} added to cart!`);
                    }}
                  >
                    <ShoppingCart size={18} />
                    Add
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
