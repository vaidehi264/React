import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, LogOut, LayoutDashboard, User, ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);


  //product count
  const cartCount = useSelector((state) => state.cart.items.length);



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
            <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
              <ShoppingCart size={28} className="text-gray-700 hover:text-blue-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs px-2 py-[1px] rounded-full">
                  {cartCount}
                </span>
              )}
            </div>

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
                  className="absolute right-0 top-full pt-2 w-48
                             opacity-0 invisible group-hover:opacity-100 group-hover:visible
                             transition-all duration-300 ease-in-out"
                >
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="px-4 py-3 border-b bg-gray-50/50">
                      <p className="text-sm font-semibold text-gray-800">
                        Hi, {user.name || "User"}!
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <User size={16} />
                        Manage Profile
                      </Link>

                      {user.role === 'user' && (
                        <Link
                          to="/my-bookings"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <ShoppingBag size={16} />
                          My Bookings
                        </Link>
                      )}

                      {user.role === 'admin' && (
                        <Link
                          to="/admin/dashboard"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 font-semibold transition-colors"
                        >
                          <LayoutDashboard size={16} />
                          Admin Dashboard
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2
                                 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
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
            {user && user.role === 'user' && <Link onClick={() => setIsOpen(false)} to="/my-bookings">My Bookings</Link>}
            {user && user.role === 'admin' && <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">Admin Dashboard</Link>}

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
