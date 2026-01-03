import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { Plus, LayoutDashboard, ShoppingBag, Package } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllProducts, getProductCount } from '../services/productServices';
import { getOrderCount } from '../services/orderServices';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ products: 0, bookings: 0 });
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('techifyUser') || '{}');
    const userName = user?.name || 'Admin';

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch product list for the preview table
                const productRes = await getAllProducts();
                const productsData = productRes.data || [];
                setProducts(productsData);

                // Fetch counts independently to be more robust
                const [productCountRes, orderCountRes] = await Promise.allSettled([
                    getProductCount(),
                    getOrderCount()
                ]);

                const productsCount = productCountRes.status === 'fulfilled' ?
                    (productCountRes.value.data.count || 0) : productsData.length;

                const ordersCount = orderCountRes.status === 'fulfilled' ?
                    (orderCountRes.value.data.count || 0) : 0;

                setStats({
                    products: productsCount,
                    bookings: ordersCount
                });
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const userInitials = userName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || 'AD';

    return (
        <div className="flex min-h-screen bg-[#f8f9fa]">
            <AdminSidebar />

            <main className="flex-1 ml-64 p-8 lg:p-12">
                <header className="flex justify-between items-start mb-12">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Dashboard Overview</h1>
                        <p className="text-gray-500 text-lg">Welcome back, {userName}</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => navigate('/admin/add-product')}
                            className="flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-xl font-bold hover:translate-y-[-2px] hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                        >
                            <Plus size={20} />
                            Add New Product
                        </button>
                        <div className="w-12 h-12 bg-orange-100 text-primary rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                            {userInitials}
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm flex flex-col gap-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Package size={80} />
                        </div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Products</h3>
                        <div className="text-6xl font-black text-gray-900 leading-none">{stats.products}</div>
                        <span className="self-start px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-tighter hover:bg-green-100 transition-colors">In Inventory</span>
                    </div>

                    <div className="bg-white p-8 rounded-[2rem] shadow-sm flex flex-col gap-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <ShoppingBag size={80} />
                        </div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Bookings</h3>
                        <div className="text-6xl font-black text-gray-900 leading-none">{stats.bookings}</div>
                        <span className="self-start px-3 py-1 bg-orange-50 text-orange-700 text-[10px] font-bold rounded-full uppercase tracking-tighter hover:bg-orange-100 transition-colors">Customer Orders</span>
                    </div>
                </div>

                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Inventory Preview</h2>
                        <Link to="/admin/inventory" className="text-primary font-bold text-sm hover:underline underline-offset-4">
                            View All Inventory
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-50">
                                    <th className="p-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product ID</th>
                                    <th className="p-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Image</th>
                                    <th className="p-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Name</th>
                                    <th className="p-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price</th>
                                    <th className="p-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="p-12 text-center">
                                            <div className="flex justify-center">
                                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : products.slice(0, 5).map((product) => (
                                    <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                        <td className="p-5 px-6 text-sm font-medium text-gray-500">#{product._id?.slice(-6).toUpperCase()}</td>
                                        <td className="p-5 px-6">
                                            <img src={product.image} alt={product.title} className="w-14 h-9 object-contain bg-gray-50 rounded-md shadow-sm" />
                                        </td>
                                        <td className="p-5 px-6 text-sm font-bold text-gray-800 uppercase tracking-tight">{product.title}</td>
                                        <td className="p-5 px-6 text-sm font-black text-gray-900">₹{product.price?.toLocaleString()}</td>
                                        <td className="p-5 px-6">
                                            {product.isBooked ? (
                                                <span className="px-3 py-1 bg-red-50 text-red-700 text-[10px] font-bold rounded-full uppercase tracking-tighter shadow-sm">Booked</span>
                                            ) : (
                                                <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-tighter shadow-sm">Available</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {!loading && products.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="p-12 text-center text-gray-400 font-medium font-italic">No products found in inventory</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;
