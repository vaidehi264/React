import React from "react";
import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="w-full bg-white">
      {/* HERO SECTION */}
      <div
        className="relative w-full h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(0,0,0,0.75),
              rgba(0,0,0,0.55)
            ),
            url(https://images.unsplash.com/photo-1522071820081-009f0129c71c)
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white px-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            We’re here to help. Reach out to Techify for support, inquiries,
            or collaboration opportunities.
          </p>
        </motion.div>
      </div>

      {/* CONTACT INFO SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Phone */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <FaPhoneAlt className="text-blue-600 text-3xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Call Us</h3>
            <p className="text-gray-600">+91 98765 43210</p>
            <p className="text-gray-600">+91 91234 56789</p>
          </div>

          {/* Email */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <FaEnvelope className="text-blue-600 text-3xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Email</h3>
            <p className="text-gray-600">support@techify.com</p>
            <p className="text-gray-600">info@techify.com</p>
          </div>

          {/* Address */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <FaMapMarkerAlt className="text-blue-600 text-3xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Office</h3>
            <p className="text-gray-600">
              Techify Pvt Ltd<br />
              Bangalore, Karnataka<br />
              India
            </p>
          </div>

          {/* Working Hours */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <FaClock className="text-blue-600 text-3xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Working Hours</h3>
            <p className="text-gray-600">Mon – Fri: 9:00 AM – 6:00 PM</p>
            <p className="text-gray-600">Sat – Sun: Closed</p>
          </div>
        </div>
      </div>

      {/* SOCIAL & SUPPORT SECTION */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Connect With Techify
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            Follow us on social media for the latest updates, product launches,
            and exclusive tech insights.
          </p>

          <div className="flex justify-center gap-6">
            {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map(
              (Icon, index) => (
                <div
                  key={index}
                  className="w-14 h-14 flex items-center justify-center 
                             rounded-full bg-white shadow-md 
                             hover:bg-blue-600 hover:text-white 
                             text-blue-600 transition cursor-pointer"
                >
                  <Icon size={20} />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
