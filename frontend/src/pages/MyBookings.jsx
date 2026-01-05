import React, { useEffect, useState } from "react";
import { getUserOrders, deleteOrder } from "../services/orderServices.js";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  ShoppingBag,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyBookings = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ CORRECT: localStorage has `id`, not `_id`
  const user = JSON.parse(localStorage.getItem("techifyUser")) || {};

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user.id) {
        setLoading(false);
        return;
      }

      try {
        const res = await getUserOrders(user.id);
        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching user orders:", error);
        toast.error("Failed to load your bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user.id]);

  const handleCancelOrder = async (orderId) => {
    if (
      window.confirm(
        "Are you sure you want to cancel this booking? The products will be available for others to buy."
      )
    ) {
      try {
        await deleteOrder(orderId);
        setOrders((prev) => prev.filter((order) => order._id !== orderId));
        toast.success("Booking cancelled successfully");
      } catch (error) {
        console.error("Error cancelling order:", error);
        toast.error("Failed to cancel booking");
      }
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Pending":
        return {
          bg: "bg-orange-50",
          text: "text-orange-600",
          icon: <Clock size={14} />,
        };
      case "Processing":
        return {
          bg: "bg-blue-50",
          text: "text-blue-600",
          icon: <Package size={14} />,
        };
      case "Shipped":
        return {
          bg: "bg-purple-50",
          text: "text-purple-600",
          icon: <Truck size={14} />,
        };
      case "Delivered":
        return {
          bg: "bg-green-50",
          text: "text-green-600",
          icon: <CheckCircle size={14} />,
        };
      case "Cancelled":
        return {
          bg: "bg-red-50",
          text: "text-red-600",
          icon: <XCircle size={14} />,
        };
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-600",
          icon: <Package size={14} />,
        };
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
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">
              My Bookings
            </h1>
            <p className="text-gray-500 text-lg font-medium">
              Tracking your premium gadget purchases
            </p>
          </div>
          <div className="flex gap-4">
            <Link to="/" className="btn-secondary">
              Home
            </Link>
            <Link to="/products" className="btn-secondary flex items-center gap-2">
              <ShoppingBag size={20} />
              Continue Shopping
            </Link>
          </div>
        </header>

        {orders.length === 0 ? (
          <div className="bg-white p-20 rounded-[3rem] shadow-xl text-center">
            <ShoppingBag size={48} className="mx-auto text-blue-400 mb-6" />
            <h2 className="text-3xl font-black mb-4">No Bookings Found</h2>
            <p className="text-gray-500 mb-8">
              You haven't ordered any products yet.
            </p>
            <Link to="/products" className="btn-primary">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-8">
            {orders.map((order) => {
              const status = getStatusStyles(order.status);

              return (
                <div
                  key={order._id}
                  className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden"
                >
                  <div className="p-8">
                    <div className="flex justify-between mb-6">
                      <div>
                        <p className="text-xs text-gray-400">Order Ref</p>
                        <p className="font-black text-lg">
                          #{order._id.slice(-8).toUpperCase()}
                        </p>
                      </div>
                      <div
                        className={`px-4 py-2 rounded-full ${status.bg} ${status.text} text-xs font-bold flex items-center gap-2`}
                      >
                        {status.icon}
                        {order.status}
                      </div>
                    </div>

                    {order.items.map((item, i) => (
                      <div key={i} className="flex gap-4 mb-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-20 object-contain bg-gray-50 rounded-xl"
                        />
                        <div>
                          <h4 className="font-black">{item.title}</h4>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity} × ₹{item.price}
                          </p>
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-between items-center mt-6">
                      <p className="text-2xl font-black">
                        ₹{order.totalAmount.toLocaleString()}
                      </p>

                      {order.status === "Pending" && (
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          className="btn-danger flex items-center gap-2"
                        >
                          <Trash2 size={16} />
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 px-8 py-4 flex items-center gap-2 text-sm">
                    <Truck size={14} />
                    Deliver to {order.customer.city}, {order.customer.zip}
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
