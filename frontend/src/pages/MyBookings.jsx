import React, { useEffect, useState } from "react";
import { getUserOrders, deleteOrder } from "../services/orderServices";
import { Package, Clock, CheckCircle, Truck, XCircle, ShoppingBag, ExternalLink, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyBookings = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("techifyUser")) || {};

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user._id) {
                setLoading(false);
                return;
            }
            try {
                const res = await getUserOrders(user._id);
                setOrders(Array.isArray(res.data) ? res.data : []);
            } catch (error) {
                console.error("Error fetching user orders:", error);
                toast.error("Failed to load your bookings");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user._id]);

    const handleCancelOrder = async (orderId) => {
        if (window.confirm("Are you sure you want to cancel this booking? The products will be available for others to buy.")) {
            try {
                await deleteOrder(orderId);
                setOrders(prev => prev.filter(order => order._id !== orderId));
                toast.success("Booking cancelled successfully");
            } catch (error) {
                console.error("Error cancelling order:", error);
                toast.error("Failed to cancel booking");
            }
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Pending': return { bg: 'bg-orange-50', text: 'text-orange-600', icon: <Clock size={14} /> };
            case 'Processing': return { bg: 'bg-blue-50', text: 'text-blue-600', icon: <Package size={14} /> };
            case 'Shipped': return { bg: 'bg-purple-50', text: 'text-purple-600', icon: <Truck size={14} /> };
            case 'Delivered': return { bg: 'bg-green-50', text: 'text-green-600', icon: <CheckCircle size={14} /> };
            case 'Cancelled': return { bg: 'bg-red-50', text: 'text-red-600', icon: <XCircle size={14} /> };
            default: return { bg: 'bg-gray-50', text: 'text-gray-600', icon: <Package size={14} /> };
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-5xl mx-auto">
                <header className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 mb-2">My Bookings</h1>
                        <p className="text-gray-500 text-lg font-medium">Tracking your premium gadget purchases</p>
                    </div>
                    <div className="flex gap-4">
                        <Link to="/" className="btn-secondary flex items-center gap-2">
                            Home
                        </Link>
                        <Link to="/products" className="btn-secondary flex items-center gap-2">
                            <ShoppingBag size={20} />
                            Continue Shopping
                        </Link>
                    </div>
                </header>

                {orders.length === 0 ? (
                    <div className="bg-white p-20 rounded-[3rem] shadow-xl shadow-gray-200/50 flex flex-col items-center text-center border border-gray-100">
                        <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center mb-8 rotate-3 hover:rotate-0 transition-transform duration-500">
                            <ShoppingBag size={48} className="text-blue-400" />
                        </div>
                        <h2 className="text-3xl font-black text-gray-800 mb-4">No Bookings Found</h2>
                        <p className="text-gray-500 max-w-sm text-lg leading-relaxed mb-8">
                            You haven't ordered any premium accessories yet. Start your journey with Techify today!
                        </p>
                        <Link to="/products" className="btn-primary inline-flex items-center gap-2">
                            Explore Products <ShoppingBag size={20} />
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-8">
                        {orders.map((order) => {
                            const status = getStatusStyles(order.status);
                            return (
                                <div key={order._id} className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden hover:border-blue-100 transition-colors group">
                                    <div className="p-8 md:p-10">
                                        {/* Order Header */}
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-8 border-b border-gray-50">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Order Ref</span>
                                                    <span className="text-lg font-black text-gray-900 group-hover:text-blue-600 transition-colors">#{order._id.slice(-8).toUpperCase()}</span>
                                                </div>
                                                <p className="text-sm font-medium text-gray-400 italic">
                                                    Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </p>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <div className={`flex items-center gap-2 px-4 py-2 rounded-full border border-current/10 ${status.bg} ${status.text} font-bold text-xs uppercase tracking-wider`}>
                                                    {status.icon}
                                                    {order.status}
                                                </div>
                                                <div className="px-4 py-2 bg-gray-900 text-white rounded-full font-bold text-xs uppercase tracking-wider">
                                                    Paid via Razorpay
                                                </div>
                                            </div>
                                        </div>

                                        {/* Items */}
                                        <div className="grid md:grid-cols-5 gap-8 items-center">
                                            <div className="md:col-span-3 space-y-6">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-6">
                                                        <div className="w-20 h-20 bg-gray-50 rounded-2xl p-2 flex items-center justify-center border border-gray-100 group-hover:bg-white group-hover:shadow-lg transition-all">
                                                            <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <h4 className="font-black text-gray-900 leading-tight">{item.title}</h4>
                                                            <p className="text-sm text-gray-500 font-bold">
                                                                Qty: {item.quantity} × <span className="text-blue-600">₹{item.price.toLocaleString()}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="md:col-span-2 flex flex-col md:items-end justify-center bg-gray-50/50 md:bg-transparent p-6 md:p-0 rounded-3xl gap-4">
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Total Amount</p>
                                                    <p className="text-3xl font-black text-gray-900">₹{order.totalAmount.toLocaleString()}</p>
                                                </div>
                                                <div className="w-full md:w-auto flex flex-col gap-2">
                                                    <Link
                                                        to={`/product/${order.items[0]?.productId}`}
                                                        className="flex items-center justify-center gap-2 btn-secondary text-sm"
                                                    >
                                                        View Product <ExternalLink size={16} />
                                                    </Link>

                                                    {order.status === 'Pending' && (
                                                        <button
                                                            onClick={() => handleCancelOrder(order._id)}
                                                            className="flex items-center justify-center gap-2 btn-danger text-sm"
                                                        >
                                                            Cancel Booking <Trash2 size={16} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Delivery Badge */}
                                    <div className="bg-gray-50/50 border-t border-gray-50 px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-3">
                                        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                                            <Truck size={14} className="text-blue-500" />
                                            Deliver to: <span className="text-gray-900">{order.customer.city}, {order.customer.zip}</span>
                                        </div>
                                        <p className="text-[11px] font-bold text-green-600 uppercase tracking-wider">
                                            Free Express Delivery Included
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
