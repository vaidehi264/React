import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { increaseQty, decreaseQty, removeFromCart } from "../Store/cartSlice.js";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const user = localStorage.getItem("techifyUser");
    if (!user) {
      toast.error("Please login to access your cart");
      navigate("/login");
    }
  }, [navigate]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 150;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
            <ShoppingBag size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Your Cart</h1>
            <p className="text-gray-500">You have {cartItems.length} items in your bag</p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-12 text-center shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={48} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">Looks like you haven't added any premium gadgets to your cart yet. Time to start shopping!</p>
            <div className="flex justify-center gap-4">
              <Link to="/" className="btn-secondary">
                Home
              </Link>
              <Link
                to="/products"
                className="btn-primary flex items-center gap-2"
              >
                Browse Products <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 group hover:shadow-md transition-shadow">
                  <div className="w-full sm:w-32 h-32 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-blue-600 font-extrabold text-xl">₹{item.price.toLocaleString()}</p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                      <button
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-gray-600 transition-all"
                        onClick={() => dispatch(decreaseQty(item.id))}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-12 text-center font-bold text-gray-900">{item.quantity}</span>
                      <button
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-gray-600 transition-all"
                        onClick={() => dispatch(increaseQty(item.id))}
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        dispatch(removeFromCart(item.id));
                        toast.success("Removed from cart");
                      }}
                      className="w-12 h-12 flex items-center justify-center btn-danger rounded-xl"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="h-px bg-gray-100 my-4"></div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-extrabold text-blue-600">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full btn-primary flex items-center justify-center gap-3 text-lg"
                >
                  Checkout Now <ArrowRight size={20} />
                </button>
                <Link to="/products" className="w-full btn-secondary mt-3 flex items-center justify-center gap-2 text-center">
                  Continue Shopping
                </Link>

                <p className="mt-6 text-center text-xs text-gray-400 leading-relaxed">
                  Taxes calculated at checkout. Free shipping on orders over ₹5,000.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;