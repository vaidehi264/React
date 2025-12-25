import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { verifyuser } from "../services/Api.jsx";
import { FaShieldAlt, FaKey } from "react-icons/fa";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if accessed directly
  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) return;

    try {
      setLoading(true);

      const res = await verifyuser({ email, otp });

      // OPTIONAL: save verified user (if backend returns user)
      if (res?.data?.user) {
        localStorage.setItem(
          "techifyUser",
          JSON.stringify(res.data.user)
        );
      }

      alert("OTP verified successfully!");
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
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
          <FaShieldAlt className="text-6xl mb-6 mx-auto" />
          <h1 className="text-4xl font-extrabold mb-4">
            Secure Verification
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            We’ve sent a one-time password to your registered email to
            secure your Techify account.
          </p>
        </div>
      </div>

      {/* OTP CARD */}
      <div className="flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
            Verify OTP
          </h2>

          <p className="text-center text-gray-600 mb-6">
            Enter the OTP sent to
            <br />
            <span className="font-semibold text-gray-800">
              {email}
            </span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* OTP INPUT */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                One-Time Password
              </label>
              <div className="relative">
                <FaKey className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             outline-none transition text-center text-lg tracking-widest"
                />
              </div>
            </div>

            {/* VERIFY BUTTON */}
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
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          {/* FOOTER LINKS */}
          <div className="text-center mt-6 text-sm text-gray-600">
            Didn’t receive the OTP?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register again
            </Link>

            <Link
              to="/login"
              className="block mt-2 text-gray-500 hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
