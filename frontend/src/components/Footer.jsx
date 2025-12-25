import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* TOP FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* BRAND */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Techify
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
            Techify delivers premium electronic accessories designed for
            performance, durability, and modern lifestyles. Power your devices
            with confidence and style.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4">
            {[
              { icon: <FaFacebookF />, link: "#" },
              { icon: <FaInstagram />, link: "#" },
              { icon: <FaTwitter />, link: "#" },
              { icon: <FaLinkedinIn />, link: "#" },
              { icon: <FaYoutube />, link: "#" },
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="w-10 h-10 flex items-center justify-center rounded-full 
                           bg-gray-800 hover:bg-blue-600 text-white transition"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {["Home", "About", "Products", "Contact", "Blog"].map(
              (item, index) => (
                <li key={index}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="hover:text-white transition"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* CATEGORIES */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Categories
          </h3>
          <ul className="space-y-3">
            {[
              "Chargers & Cables",
              "Headphones",
              "Keyboards",
              "Mouse & Accessories",
              "Smart Gadgets",
            ].map((item, index) => (
              <li key={index}>
                <Link
                  to="/products"
                  className="hover:text-white transition"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Support
          </h3>
          <ul className="space-y-3">
            {[
              "Help Center",
              "Returns & Refunds",
              "Shipping Info",
              "Privacy Policy",
              "Terms & Conditions",
            ].map((item, index) => (
              <li key={index}>
                <Link
                  to="/"
                  className="hover:text-white transition"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* NEWSLETTER */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Subscribe to our newsletter
            </h3>
            <p className="text-gray-400">
              Get updates on new products, offers, and tech tips.
            </p>
          </div>

          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-4 rounded-lg bg-gray-800 
                         text-white placeholder-gray-400 outline-none"
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-lg bg-blue-600 
                         hover:bg-blue-700 text-white font-semibold transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row 
                        justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Techify. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Designed & Developed by <span className="text-white">Techify</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
