import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import {
  Zap,
  ShieldCheck,
  Truck,
  Headphones,
  Cpu,
  BatteryCharging,
  Keyboard,
  Mouse,
} from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

const Home = () => {
  const slides = [
    {
      title: "Premium Electronic Accessories",
      description:
        "Discover high-quality headphones, chargers, keyboards and accessories built for performance.",
      image:
        "https://t4.ftcdn.net/jpg/08/73/34/47/240_F_873344730_GR5zxbekiofYCbcgyLLXOUHVxGKxwtsg.jpg",
    },
    {
      title: "Smart Gadgets for Modern Life",
      description:
        "Upgrade your tech setup with stylish, reliable and powerful electronic accessories.",
      image:
        "https://as1.ftcdn.net/jpg/03/19/01/84/1000_F_319018422_avRDOC6gp2V3Qk138vXxgKwCIl0FBmQb.jpg",
    },
    {
      title: "Power. Speed. Reliability.",
      description:
        "Fast charging solutions, wireless accessories and precision-crafted tech essentials.",
      image:
        "https://www.shutterstock.com/image-photo/modern-gadgets-accessories-black-laptop-260nw-2463271897.jpg",
    },
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* ================= HERO SLIDER ================= */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        speed={1200}
        className="w-full"
        style={{ height: "90vh" }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full flex items-center"
              style={{
                backgroundImage: `
                  linear-gradient(
                    to right,
                    rgba(0,0,0,0.85),
                    rgba(0,0,0,0.55),
                    rgba(0,0,0,0.25)
                  ),
                  url(${slide.image})
                `,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
                className="max-w-3xl ml-8 md:ml-24 text-white px-6"
              >
                <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold bg-blue-600 rounded-full">
                  Welcome to Techify
                </span>

                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                  {slide.title}
                </h1>

                <p className="text-lg md:text-xl text-gray-200 mb-10">
                  {slide.description}
                </p>

                <div className="flex gap-5 flex-wrap">
                  <Link
                    to="/products"
                    className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition"
                  >
                    Shop Now
                  </Link>

                  <Link
                    to="/about"
                    className="border border-white/70 hover:bg-white/10 px-8 py-4 rounded-xl text-lg font-semibold transition"
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ================= WHY CHOOSE TECHIFY ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-4">
            Why Choose <span className="text-blue-600">Techify</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-14">
            We deliver premium electronic accessories designed to elevate your digital lifestyle.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: <Zap />, title: "High Performance", desc: "Optimized for speed and reliability." },
              { icon: <ShieldCheck />, title: "Trusted Quality", desc: "Strict quality assurance standards." },
              { icon: <Truck />, title: "Fast Delivery", desc: "Quick & reliable shipping nationwide." },
              { icon: <Headphones />, title: "24/7 Support", desc: "Always here when you need help." },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-8 shadow hover:-translate-y-2 transition"
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-blue-100 rounded-xl text-blue-600">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED CATEGORIES ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-14">
            Featured Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <BatteryCharging />, title: "Chargers" },
              { icon: <Keyboard />, title: "Keyboards" },
              { icon: <Mouse />, title: "Mouse" },
              { icon: <Cpu />, title: "Smart Gadgets" },
            ].map((cat, i) => (
              <Link
                to="/products"
                key={i}
                className="bg-white rounded-2xl shadow-lg p-10 text-center hover:-translate-y-2 transition"
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-blue-600/10 text-blue-600 rounded-xl">
                  {cat.icon}
                </div>
                <h3 className="text-lg font-semibold">{cat.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { value: "10K+", label: "Happy Customers" },
            { value: "500+", label: "Products" },
            { value: "99%", label: "Positive Reviews" },
            { value: "24/7", label: "Support" },
          ].map((stat, i) => (
            <div key={i}>
              <h3 className="text-4xl font-extrabold mb-2">{stat.value}</h3>
              <p className="text-blue-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-gradient-to-r from-gray-900 to-black text-center text-white">
        <h2 className="text-4xl font-extrabold mb-6">
          Upgrade Your Tech with <span className="text-blue-500">Techify</span>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-10">
          Experience the future of electronic accessories with premium quality and unbeatable performance.
        </p>
        <Link
          to="/products"
          className="inline-block bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-xl text-lg font-semibold transition"
        >
          Explore Products
        </Link>
      </section>
    </div>
  );
};

export default Home;
