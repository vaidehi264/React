import React from 'react'
import { motion } from 'framer-motion'

// Static products function
const getProducts = () => {
  return [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 199.99,
      description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      category: 'Electronics'
    },
    {
      id: 2,
      name: 'Smart Watch Pro',
      price: 299.99,
      description: 'Advanced smartwatch with health tracking, GPS, and long battery life.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      category: 'Electronics'
    },
    {
      id: 3,
      name: 'Laptop Stand Ergonomic',
      price: 49.99,
      description: 'Adjustable aluminum laptop stand for better posture and workspace organization.',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
      category: 'Accessories'
    },
    {
      id: 4,
      name: 'Mechanical Keyboard RGB',
      price: 129.99,
      description: 'RGB mechanical keyboard with customizable keys and premium switches.',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
      category: 'Accessories'
    },
    {
      id: 5,
      name: 'Wireless Mouse Pro',
      price: 79.99,
      description: 'Ergonomic wireless mouse with precision tracking and long battery life.',
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
      category: 'Accessories'
    },
    {
      id: 6,
      name: 'USB-C Hub Multiport',
      price: 39.99,
      description: '7-in-1 USB-C hub with HDMI, USB ports, and SD card reader.',
      image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500&h=500&fit=crop',
      category: 'Accessories'
    },
    {
      id: 7,
      name: 'Portable SSD 1TB',
      price: 149.99,
      description: 'Fast portable SSD with USB-C connectivity and rugged design.',
      image: 'https://images.unsplash.com/photo-1591488320449-11f0d6c8f442?w=500&h=500&fit=crop',
      category: 'Storage'
    },
    {
      id: 8,
      name: 'Webcam HD 1080p',
      price: 89.99,
      description: 'High-definition webcam with auto-focus and built-in microphone.',
      image: 'https://images.unsplash.com/photo-1587825147138-346c006c7182?w=500&h=500&fit=crop',
      category: 'Electronics'
    }
  ]
}

const Products = () => {
  const products = getProducts()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Products</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover our premium collection of electronics and accessories
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative h-64 overflow-hidden bg-gray-200">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {product.category}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4 text-sm line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200">
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Products
