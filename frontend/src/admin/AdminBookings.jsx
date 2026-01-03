import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { ShoppingBag, Trash2, Clock, CheckCircle, Package, Truck, XCircle, BarChart3 } from 'lucide-react';
import { getAllOrders, deleteOrder, updateOrderStatus, getOrderCount } from '../services/orderServices';
import { toast } from 'react-hot-toast';

const AdminBookings = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalBookings, setTotalBookings] = useState(0);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [ordersRes, countRes] = await Promise.all([
                getAllOrders(),
                getOrderCount()
            ]);
            setOrders(Array.isArray(ordersRes.data) ? ordersRes.data : []);
            setTotalBookings(countRes.data.count || 0);
        } catch (error) {
            console.error("Error fetching bookings data:", error);
            toast.error("Failed to load bookings");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            try {
                await deleteOrder(id);
                toast.success("Order deleted successfully");
                setOrders(prev => prev.filter(order => order._id !== id));
                setTotalBookings(prev => prev - 1);
            } catch (error) {
                toast.error("Failed to delete order");
            }
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            await updateOrderStatus(id, status);
            toast.success("Status updated");
            setOrders(prev => prev.map(order => order._id === id ? { ...order, status } : order));
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending': return <Clock size={16} className="text-orange-500" />;
            case 'Processing': return <Package size={16} className="text-blue-500" />;
            case 'Shipped': return <Truck size={16} className="text-purple-500" />;
            case 'Delivered': return <CheckCircle size={16} className="text-green-500" />;
            case 'Cancelled': return <XCircle size={16} className="text-red-500" />;
            default: return null;
        }
    };

    return (
        <div className="flex min-h-screen bg-[#f8f9fa]">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-8 lg:p-12">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Customer Bookings</h1>
                        <p className="text-gray-500 text-lg">View and manage your recent customer orders</p>
                    </div>

                    <div className="bg-white px-8 py-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                            <BarChart3 size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Total Bookings</p>
                            <p className="text-2xl font-black text-gray-900 leading-none">{totalBookings}</p>
                        </div>
                    </div>
                </header>

                {loading ? (
                    <div className="flex justify-center p-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="bg-white p-20 rounded-[2.5rem] shadow-sm flex flex-col items-center text-center max-w-4xl mx-auto border border-gray-100 mt-12">
                        <div className="w-24 h-24 bg-gray-50 rounded-3xl flex items-center justify-center mb-8 rotate-3 hover:rotate-0 transition-transform duration-500">
                            <ShoppingBag size={48} className="text-gray-300" />
                        </div>
                        <h2 className="text-3xl font-black text-gray-800 mb-4">No Orders Yet</h2>
                        <p className="text-gray-500 max-w-md text-lg leading-relaxed">
                            When customers purchase products from your store, the order details will appear here for processing and shipping.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Order ID</span>
                                            <span className="text-lg font-black text-gray-900">#{order._id?.slice(-8).toUpperCase()}</span>
                                            <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                                                {getStatusIcon(order.status)}
                                                <span className={`text-[10px] font-bold uppercase ${order.status === 'Pending' ? 'text-orange-600' : 'text-gray-600'}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-gray-500">
                                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'} at {order.createdAt ? new Date(order.createdAt).toLocaleTimeString() : 'N/A'}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            className="bg-gray-50 border-none text-sm font-bold text-gray-700 px-4 py-2 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                        <button
                                            onClick={() => handleDelete(order._id)}
                                            className="p-3 btn-danger text-white rounded-xl transition-all"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Customer Details</h3>
                                        <div className="space-y-2">
                                            <p className="font-bold text-gray-800">{order.customer?.firstName} {order.customer?.lastName}</p>
                                            <p className="text-sm text-gray-500">{order.customer?.email}</p>
                                            <p className="text-sm text-gray-500">{order.customer?.phone}</p>
                                            <p className="text-sm text-gray-600 mt-2">{order.customer?.address}, {order.customer?.city}, {order.customer?.zip}</p>

                                            {order.userId && (
                                                <div className="mt-4 pt-4 border-t border-gray-50">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Registered Account</p>
                                                    <p className="text-xs font-bold text-blue-600">{order.userId.name}</p>
                                                    <p className="text-[10px] text-gray-400">{order.userId.email}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Order Items</h3>
                                        <div className="space-y-4">
                                            {order.items?.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-4">
                                                    <img src={item.image} alt={item.title} className="w-12 h-12 object-contain bg-gray-50 rounded-lg p-1" />
                                                    <div className="flex-1">
                                                        <p className="text-sm font-bold text-gray-800">{item.title}</p>
                                                        <p className="text-xs text-gray-500">Qty: {item.quantity} × ₹{item.price?.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                                                <span className="text-sm font-bold text-gray-900 uppercase">Total Amount</span>
                                                <span className="text-xl font-black text-primary">₹{order.totalAmount?.toLocaleString() || '0'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminBookings;
