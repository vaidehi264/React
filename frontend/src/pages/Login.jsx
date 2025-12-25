import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginuser } from "../services/Api.jsx";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,

    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginuser(form);

      const token =
        res?.data?.token ||
        res?.data?.accessToken ||
        res?.data?.data?.token ||
        "";

      const user =
        res?.data?.user ||
        res?.data?.data?.user || {
          email: form.email,
          name: form.email.split("@")[0],
        };

      // Save to localStorage for Header & protected routes
      localStorage.setItem("authToken", token);
      localStorage.setItem("techifyUser", JSON.stringify(user));

      // Notify header about login
      window.dispatchEvent(new Event("authChanged"));

      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT BRAND PANEL */}
      <div
        className="hidden lg:flex items-center justify-center"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(37,99,235,0.9),
              rgba(79,70,229,0.9)
            ),
            url(https://images.unsplash.com/photo-1518770660439-4636190af475)
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-white text-center px-12 max-w-lg">
          <h1 className="text-5xl font-extrabold mb-6">Techify</h1>
          <p className="text-blue-100 text-xl leading-relaxed">
            Log in to manage your orders, explore premium electronic
            accessories, and enjoy a smarter shopping experience.
          </p>
        </div>
      </div>

      {/* LOGIN FORM */}
      <div className="flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Sign in to continue to Techify
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             outline-none transition"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             outline-none transition"
                />
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold transition shadow-lg
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                }`}
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          {/* LINKS */}
          <div className="text-center mt-6 text-sm text-gray-600">
            <Link
              to="/forgot-password"
              className="text-blue-600 font-semibold hover:underline"
            >
              Forgot password?
            </Link>

            <p className="mt-3">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
