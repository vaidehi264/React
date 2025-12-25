import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const ProductDetails = () => {
    const { id } = useParams()
    const [quantity, setQuantity] = useState(1)

    // Mock product data detailed
    const product = {
        id: id || 1,
        title: "Premium wireless Headphones",
        price: 299.99,
        rating: 4.8,
        reviews: 128,
        description: "Experience high-fidelity audio with our premium wireless headphones. Designed for comfort and clarity, these headphones feature active noise cancellation, 30-hour battery life, and plush memory foam ear cushions.",
        colors: ["#000000", "#Silver", "#Blue"],
        features: [
            "Active Noise Cancellation",
            "30-hour Battery Life",
            "Bluetooth 5.2",
            "Built-in Microphone",
            "Fast Charging"
        ],
        images: [
            "https://picsum.photos/600/600?random=20",
            "https://picsum.photos/600/600?random=21",
            "https://picsum.photos/600/600?random=22"
        ]
    }

    const handleQuantityChange = (type) => {
        if (type === 'plus') setQuantity(prev => prev + 1)
        if (type === 'minus' && quantity > 1) setQuantity(prev => prev - 1)
    }

    return (
        <div className="bg-white min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/products" className="text-gray-500 hover:text-blue-600 mb-8 inline-block transition-colors">
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
                        <div className="rounded-2xl overflow-hidden shadow-xl bg-gray-100 mb-4 h-[500px]">
                            <Swiper
                                modules={[Navigation, Pagination]}
                                navigation
                                pagination={{ clickable: true }}
                                className="h-full w-full"
                            >
                                {product.images.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={img}
                                            alt={`${product.title} view ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {product.images.map((img, index) => (
                                <div key={index} className="rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                                    <img src={img} alt="thumbnail" className="w-full h-24 object-cover" />
                                </div>
                            ))}
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
                            New Arrival
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                            {product.title}
                        </h1>

                        <div className="flex items-center mb-6">
                            <div className="flex text-yellow-400 mr-2">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-gray-500 text-sm">({product.reviews} reviews)</span>
                        </div>

                        <div className="text-3xl font-bold text-gray-900 mb-6">
                            ${product.price}
                        </div>

                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="border-t border-b border-gray-200 py-6 mb-8">
                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-gray-900 mb-3">Key Features</h3>
                                <ul className="space-y-2">
                                    {product.features.map((feature, idx) => (
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
                            <div className="flex items-center border border-gray-300 rounded-lg">
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
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 bg-blue-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-blue-700 transition-colors text-lg"
                            >
                                Add to Cart - ${(product.price * quantity).toFixed(2)}
                            </motion.button>
                        </div>

                        <p className="text-xs text-gray-500 text-center sm:text-left">
                            Free shipping on all orders over $100. 30-day money-back guarantee.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
