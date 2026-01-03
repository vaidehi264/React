import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import { useDispatch } from "react-redux"
import { addToCart } from '../Store/cartSlice.js'

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { getSingleProduct } from "../services/productServices"
import toast, { Toaster } from "react-hot-toast"

const ProductDetails = () => {
    const { id } = useParams()
    const [quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await getSingleProduct(id);
                setProduct(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load product details.");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
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

        toast.success("Product added to cart successfully");
    };

    const handleQuantityChange = (type) => {
        if (type === 'plus') setQuantity(prev => prev + 1)
        if (type === 'minus' && quantity > 1) setQuantity(prev => prev - 1)
    }

    if (loading) return <div className="text-center py-20 text-gray-600">Loading details...</div>
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>
    if (!product) return <div className="text-center py-20 text-gray-600">Product not found</div>

    // Handle single image or array (backend 'image' field is string, mock was array)
    // We will wrap the single image in an array for Swiper compatibility if needed, or just display one
    const images = product.images || [product.image];

    // Mock features if not in DB (Product model only has description)
    const features = product.features || [
        "Premium Quality",
        "Fast Shipping",
        "1 Year Warranty"
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-10 px-4">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="max-w-7xl mx-auto">
                <Link to="/products" className="text-gray-500 hover:text-blue-600 mb-8 inline-block transition-colors font-medium">
                    &larr; Back to Products
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full"
                    >
                        <div className="rounded-2xl overflow-hidden shadow-xl bg-white mb-4 h-[500px] flex items-center justify-center p-6 border border-gray-100">
                            {images.length > 1 ? (
                                <Swiper
                                    modules={[Navigation, Pagination]}
                                    navigation
                                    pagination={{ clickable: true }}
                                    className="h-full w-full"
                                >
                                    {images.map((img, index) => (
                                        <SwiperSlide key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <img
                                                src={img}
                                                alt={`${product.title} view ${index + 1}`}
                                                className="max-w-full max-h-full object-contain"
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : (
                                <img
                                    src={images[0] || "https://via.placeholder.com/600"}
                                    alt={product.title}
                                    className="w-full h-full object-contain"
                                />
                            )}
                        </div>
                    </motion.div>

                    {/* Details Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col"
                    >
                        <div className="mb-2 text-blue-600 font-semibold tracking-wide uppercase text-sm">
                            {product.genre || "Electronics"}
                        </div>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                            {product.title}
                        </h1>

                        <div className="text-3xl font-extrabold text-gray-900 mb-6">
                            ₹{product.price}
                        </div>

                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            {product.description}
                        </p>

                        {product.isBooked && (
                            <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl mb-8 flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <span className="bg-orange-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">
                                        Verified Item
                                    </span>
                                    <p className="text-orange-600 size-sm font-bold italic">
                                        This premium product is verified and available for purchase.
                                    </p>
                                </div>
                                {JSON.parse(localStorage.getItem("techifyUser"))?.role === 'admin' && product.bookedBy && (
                                    <div className="mt-2 pt-2 border-t border-orange-100">
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Previous Booker (Admin View):</p>
                                        <p className="text-sm font-black text-gray-900">{product.bookedBy.name} ({product.bookedBy.email})</p>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="border-t border-b border-gray-200 py-6 mb-8">
                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-gray-900 mb-3">Key Features</h3>
                                <ul className="space-y-2">
                                    {features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-gray-600">
                                            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <div className="flex items-center border border-gray-300 rounded-xl bg-white">
                                <button
                                    onClick={() => handleQuantityChange('minus')}
                                    className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                    -
                                </button>
                                <span className="px-4 py-3 font-semibold text-gray-900 min-w-[3rem] text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => handleQuantityChange('plus')}
                                    className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                            <motion.button
                                onClick={handleAddToCart}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 btn-primary text-lg"
                            >
                                Add to Cart - ₹{(product.price * quantity).toFixed(2)}
                            </motion.button>
                        </div>
                        <div className="flex gap-4 mb-4">
                            <button onClick={() => navigate('/cart')} className="flex-1 btn-secondary text-center">
                                View Cart
                            </button>
                            <button onClick={() => navigate('/checkout')} className="flex-1 btn-secondary text-center border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100">
                                Buy Now
                            </button>
                        </div>

                        <p className="text-xs text-gray-500 text-center sm:text-left">
                            Free shipping on all orders over ₹5000. 30-day money-back guarantee.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
