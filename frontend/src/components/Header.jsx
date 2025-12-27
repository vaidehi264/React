import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, LogOut, LayoutDashboard, User } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Load user from localStorage
  const loadUser = () => {
    const storedUser = localStorage.getItem("techifyUser"); // Unified key
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();

    // Listen for login/logout changes
    const handler = () => loadUser();
    window.addEventListener("authChanged", handler);

    return () => {
      window.removeEventListener("authChanged", handler);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("techifyUser");
    localStorage.removeItem("authToken");

    window.dispatchEvent(new Event("authChanged"));
    navigate("/login");
  };

  // Get first letter of name/email
  const avatarLetter = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-blue-600">
              Tech<span className="text-gray-900">ify</span>
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/products">Products</Link>
            <Link className="nav-link" to="/about">About</Link>
            <Link className="nav-link" to="/contact">Contact</Link>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="hidden md:flex items-center gap-4">
            {/* CART */}
            <Link
              to="/cart"
              className="relative p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                2
              </span>
            </Link>

            {/* AUTH */}
            {user ? (
              <div className="relative group">
                {/* PROFILE AVATAR */}
                <div
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600
                             flex items-center justify-center text-white font-bold cursor-pointer"
                >
                  {avatarLetter}
                </div>

                {/* DROPDOWN */}
                <div
                  className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg
                             opacity-0 invisible group-hover:opacity-100 group-hover:visible
                             transition-all"
                >
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-semibold text-gray-800">
                      Hi, {user.name || "User"}!
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    to="/profile"
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <User size={16} />
                    Manage Profile
                  </Link>

                  <Link
                    to="/admin/dashboard"
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-red-600 font-semibold"
                  >
                    <LayoutDashboard size={16} />
                    Admin Dashboard (Test)
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2
                               text-sm text-red-600 hover:bg-gray-50 rounded-b-xl"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="flex flex-col px-6 py-4 gap-4">
            <Link onClick={() => setIsOpen(false)} to="/">Home</Link>
            <Link onClick={() => setIsOpen(false)} to="/products">Products</Link>
            <Link onClick={() => setIsOpen(false)} to="/about">About</Link>
            <Link onClick={() => setIsOpen(false)} to="/contact">Contact</Link>

            {user ? (
              <button
                onClick={handleLogout}
                className="mt-2 bg-red-500 text-white py-2 rounded-lg"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="mt-2 bg-blue-600 text-white text-center py-2 rounded-lg"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
