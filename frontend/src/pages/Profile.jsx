import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, ArrowLeft, LogOut } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("techifyUser");
    if (!stored) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(stored));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("techifyUser");
    localStorage.removeItem("authToken");
    window.dispatchEvent(new Event("authChanged"));
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const avatarLetter = user.name
    ? user.name.charAt(0).toUpperCase()
    : user.email?.charAt(0).toUpperCase() || "?";

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header/Cover */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600" />

          <div className="px-8 pb-8">
            <div className="relative -mt-16 mb-6">
              <div className="w-32 h-32 rounded-2xl bg-white p-1 shadow-lg">
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-4xl font-bold">
                  {avatarLetter}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{user.name || "User"}</h1>
                <p className="text-gray-500">{user.role === 'admin' ? 'Administrator' : 'Verified Customer'}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors font-medium"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                    <User size={18} />
                  </div>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Full Name</span>
                </div>
                <p className="text-lg font-medium text-gray-900 ml-11">
                  {user.name || "Not provided"}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                    <Mail size={18} />
                  </div>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Email Address</span>
                </div>
                <p className="text-lg font-medium text-gray-900 ml-11 truncate">
                  {user.email || "Not provided"}
                </p>
              </div>
            </div>

            <div className="mt-12 flex justify-center">
              <button
                onClick={() => navigate("/home")}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Back to Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

