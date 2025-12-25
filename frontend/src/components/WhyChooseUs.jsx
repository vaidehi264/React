import React from 'react'
import { motion } from 'framer-motion'

const WhyChooseUs = () => {
    const features = [
        {
            icon: "🚀",
            title: "Fast Delivery",
            description: "Get your orders delivered quickly and safely to your doorstep"
        },
        {
            icon: "💎",
            title: "Premium Quality",
            description: "We source only the finest materials for our products"
        },
        {
            icon: "🔒",
            title: "Secure Payment",
            description: "Your transactions are protected with military-grade encryption"
        },
        {
            icon: "⭐",
            title: "24/7 Support",
            description: "Our dedicated support team is here to help you anytime"
        }
    ]

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                        Why Choose Us
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Experience the difference with our commitment to excellence and customer satisfaction.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -10 }}
                            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-gray-100"
                        >
                            <div className="text-6xl mb-6 transform transition-transform duration-300 hover:scale-110 inline-block">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs
