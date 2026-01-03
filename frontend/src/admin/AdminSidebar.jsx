import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, PlusSquare, ShoppingBag, ExternalLink, LogOut } from 'lucide-react';

const AdminSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('techifyUser');
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive
            ? 'bg-primary text-white shadow-lg shadow-primary/30'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`;

    return (
        <aside className="fixed left-0 top-0 w-64 h-screen bg-[#111] text-white flex flex-col p-6 z-50">
            <div className="flex items-center gap-3 mb-12 px-2">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-bold text-xl">
                    A
                </div>
                <div>
                    <h2 className="text-xl font-bold leading-none">Techify<span className="text-primary">Admin</span></h2>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Management Portal</p>
                </div>
            </div>

            <nav className="flex flex-col gap-2 flex-grow">
                <NavLink to="/admin/dashboard" className={linkClass}>
                    <LayoutDashboard size={20} />
                    <span className="font-medium">Dashboard</span>
                </NavLink>
                <NavLink to="/admin/inventory" className={linkClass}>
                    <Package size={20} />
                    <span className="font-medium">Inventory</span>
                </NavLink>
                <NavLink to="/admin/add-product" className={linkClass}>
                    <PlusSquare size={20} />
                    <span className="font-medium">Add New Product</span>
                </NavLink>
                <NavLink to="/admin/bookings" className={linkClass}>
                    <ShoppingBag size={20} />
                    <span className="font-medium">Bookings</span>
                </NavLink>
            </nav>

            <div className="mt-auto border-t border-white/10 pt-6">
                <NavLink to="/home" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors mb-4 text-sm">
                    <ExternalLink size={18} />
                    View Site
                </NavLink>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 btn-danger py-3 rounded-xl font-medium transition-all"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
