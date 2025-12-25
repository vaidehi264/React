import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section
        className="relative w-full flex items-center"
        style={{
          height: "60vh",
          backgroundImage: `
            linear-gradient(
              rgba(0,0,0,0.75),
              rgba(0,0,0,0.45)
            ),
            url(https://images.unsplash.com/photo-1519389950473-47ba0277781c)
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto px-6 text-center text-white"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            About Techify
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            Powering your digital lifestyle with premium electronic accessories
            designed for performance, reliability, and style.
          </p>
        </motion.div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>Techify</strong> is a modern electronics accessories brand
              committed to enhancing the way people experience technology.
              From everyday essentials like chargers and cables to premium
              accessories such as keyboards, headphones, and smart gadgets,
              we focus on quality, durability, and innovation.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe technology should be seamless, reliable, and stylish.
              That’s why every Techify product is carefully designed and tested
              to meet the needs of today’s fast-paced digital world.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7"
              alt="Techify Team"
              className="rounded-2xl shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-4 text-blue-600">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To deliver innovative, high-quality electronic accessories that
              empower users to stay connected, productive, and inspired—every
              day, everywhere.
            </p>
          </motion.div>

          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-4 text-blue-600">
              Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To become a trusted global brand in electronics accessories by
              combining cutting-edge technology, modern design, and exceptional
              customer experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Why Choose Techify
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Premium Quality Products",
              "Modern & Minimal Design",
              "Reliable Performance",
              "Customer-Centric Support",
            ].map((item, index) => (
              <motion.div
                key={index}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 bg-gray-50 rounded-xl shadow-md"
              >
                <h4 className="text-lg font-semibold text-gray-800">
                  {item}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
