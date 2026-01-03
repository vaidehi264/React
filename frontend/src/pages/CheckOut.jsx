import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../Store/cartSlice.js";
import { createOrder } from "../services/orderServices";
import { FiCheckCircle, FiCreditCard, FiMapPin, FiUser } from "react-icons/fi";

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const [step, setStep] = useState(1); // 1: Details, 2: Payment
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zip: "",
    });

    useEffect(() => {
        if (cartItems.length === 0 && !isOrderPlaced) {
            navigate("/cart");
        }
    }, [cartItems, navigate, isOrderPlaced]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        setStep(2);
        window.scrollTo(0, 0);
    };

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleRazorpayPayment = async () => {
        setLoading(true);
        const res = await loadRazorpay();

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            setLoading(false);
            return;
        }

        const options = {
            key: "rzp_test_RwZ8MWEM2Bc67U",
            amount: totalPrice * 100,
            currency: "INR",
            name: "Techify Premium",
            description: "Gadget Purchase Transaction",
            image: "https://example.com/logo.png",
            handler: async function (response) {
                try {
                    const orderData = {
                        items: cartItems.map(item => ({
                            productId: item.id,
                            title: item.title || item.name,
                            price: item.price,
                            quantity: item.quantity,
                            image: item.image
                        })),
                        customer: {
                            firstName: formData.firstName,
                            lastName: formData.lastName,
                            email: formData.email,
                            phone: formData.phone,
                            address: formData.address,
                            city: formData.city,
                            zip: formData.zip
                        },
                        totalAmount: totalPrice,
                        paymentId: response.razorpay_payment_id,
                        userId: JSON.parse(localStorage.getItem("techifyUser"))?._id
                    };
                    await createOrder(orderData);
                    setIsOrderPlaced(true);
                    dispatch(clearCart());
                } catch (error) {
                    console.error("Error saving order:", error);
                    alert("Order placed but saving to database failed. Please contact support.");
                } finally {
                    setLoading(false);
                }
            },
            prefill: {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                contact: formData.phone,
            },
            notes: {
                address: formData.address,
            },
            theme: {
                color: "#060606ff",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

    const styles = {
        container: {
            minHeight: "100vh",
            padding: "120px 5% 60px",
            background: "white",
            color: "black",
            fontFamily: "'Inter', sans-serif",
        },
        stepper: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            marginBottom: "50px",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
        },
        stepItem: (active) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            position: "relative",
            zIndex: 2,
            transition: "all 0.3s ease",
            opacity: active ? 1 : 0.5,
        }),
        stepNumber: (active) => ({
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: active ? "#4400ffff" : "rgba(255, 255, 255, 0.05)",
            border: active ? "2px solid #070707ff" : "2px solid rgba(8, 8, 8, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.2rem",
            boxShadow: active ? "0 0 20px rgba(7, 7, 7, 0.4)" : "none",
        }),
        stepLine: {
            flex: 1,
            height: "2px",
            background: "rgba(13, 13, 13, 0.1)",
            margin: "-25px 20px 0",
            zIndex: 1,
        },
        mainGrid: {
            display: "grid",
            gridTemplateColumns: window.innerWidth > 900 ? "1.5fr 1fr" : "1fr",
            gap: "40px",
            maxWidth: "1200px",
            margin: "0 auto",
        },
        card: {
            background: "rgba(2, 2, 2, 0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(7, 7, 7, 0.1)",
            borderRadius: "20px",
            padding: "30px",
            marginBottom: "30px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
        },
        h2: {
            fontSize: "1.4rem",
            marginBottom: "25px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#0b0b0bff",
        },
        formRow: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginBottom: "20px",
        },
        inputGroup: {
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginBottom: "20px",
        },
        label: {
            fontSize: "0.85rem",
            color: "#080808ff",
            fontWeight: 500,
        },
        input: {
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(7, 7, 7, 0.1)",
            borderRadius: "10px",
            padding: "12px 15px",
            color: "black",
            outline: "none",
        },
        button: {
            width: "100%",
            padding: "16px",
            borderRadius: "12px",
            border: "none",
            background: "linear-gradient(45deg, #050505ff, #040404ff)",
            color: "white",
            fontWeight: 700,
            fontSize: "1rem",
            cursor: "pointer",
            textTransform: "uppercase",
            letterSpacing: "1px",
        },
        reviewItem: {
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "10px",
            borderBottom: "1px solid rgba(7, 7, 7, 0.1)",
            marginBottom: "12px",
        },
        paymentOption: (active) => ({
            border: active ? "2px solid #080808ff" : "2px solid rgba(10, 10, 10, 0.1)",
            background: active ? "rgba(10, 10, 10, 0.05)" : "transparent",
            padding: "20px",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            marginBottom: "25px",
        }),
        previewItem: {
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "20px",
        },
        previewImg: {
            width: "60px",
            height: "60px",
            objectFit: "cover",
            borderRadius: "8px",
        },
        priceRow: {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "12px",
            color: "#a0a0a0",
            fontSize: "0.95rem",
        },
        priceTotal: {
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
            paddingTop: "15px",
            borderTop: "2px solid rgba(8, 8, 8, 0.1)",
            fontSize: "1.3rem",
            fontWeight: 800,
            color: "#070707ff",
        }
    };

    if (isOrderPlaced) {
        return (
            <div style={{ ...styles.container, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ ...styles.card, maxWidth: '500px', textAlign: 'center' }}>
                    <FiCheckCircle size={64} color="#050505ff" style={{ marginBottom: '20px' }} />
                    <h1>Order Placed Successfully!</h1>
                    <p style={{ color: '#090909ff', lineHeight: 1.6, marginBottom: '20px' }}>Thank you for your purchase. Your premium accessories are being prepared for shipping.</p>
                    <p style={{ fontFamily: 'monospace', background: 'rgba(6, 6, 6, 0.05)', padding: '10px', borderRadius: '6px', color: '#000000ff', marginBottom: '20px' }}>Order ID: #TF-{Math.floor(Math.random() * 90000) + 10000}</p>
                    <button style={styles.button} onClick={() => navigate("/")}>
                        Return to Store
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.stepper}>
                <div style={styles.stepItem(step >= 1)}>
                    <div style={styles.stepNumber(step >= 1)}><FiUser /></div>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Details</span>
                </div>
                <div style={styles.stepLine}></div>
                <div style={styles.stepItem(step >= 2)}>
                    <div style={styles.stepNumber(step >= 2)}><FiCreditCard /></div>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Payment</span>
                </div>
            </div>

            <div style={styles.mainGrid}>
                <div className="checkout-left-col">
                    {step === 1 ? (
                        <form onSubmit={handleNextStep}>
                            <div style={styles.card}>
                                <h2 style={styles.h2}><FiUser /> Personal Details</h2>
                                <div style={styles.formRow}>
                                    <div style={styles.inputGroup}>
                                        <label style={styles.label}>First Name</label>
                                        <input style={styles.input} type="text" name="firstName" placeholder="John" required value={formData.firstName} onChange={handleChange} />
                                    </div>
                                    <div style={styles.inputGroup}>
                                        <label style={styles.label}>Last Name</label>
                                        <input style={styles.input} type="text" name="lastName" placeholder="Doe" required value={formData.lastName} onChange={handleChange} />
                                    </div>
                                </div>
                                <div style={styles.formRow}>
                                    <div style={styles.inputGroup}>
                                        <label style={styles.label}>Email Address</label>
                                        <input style={styles.input} type="email" name="email" placeholder="john@example.com" required value={formData.email} onChange={handleChange} />
                                    </div>
                                    <div style={styles.inputGroup}>
                                        <label style={styles.label}>Phone Number</label>
                                        <input style={styles.input} type="tel" name="phone" placeholder="+91 98765 43210" required value={formData.phone} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                            <div style={styles.card}>
                                <h2 style={styles.h2}><FiMapPin /> Delivery Address</h2>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Street Address</label>
                                    <input style={styles.input} type="text" name="address" placeholder="123 Luxury Lane" required value={formData.address} onChange={handleChange} />
                                </div>
                                <div style={styles.formRow}>
                                    <div style={styles.inputGroup}>
                                        <label style={styles.label}>City</label>
                                        <input style={styles.input} type="text" name="city" placeholder="Mumbai" required value={formData.city} onChange={handleChange} />
                                    </div>
                                    <div style={styles.inputGroup}>
                                        <label style={styles.label}>ZIP/Postal Code</label>
                                        <input style={styles.input} type="text" name="zip" placeholder="400001" required value={formData.zip} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" style={styles.button}>
                                Continue to Payment
                            </button>
                        </form>
                    ) : (
                        <div>
                            <div style={styles.card}>
                                <h2 style={styles.h2}>Review Your Information</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <div style={styles.reviewItem}>
                                        <strong style={{ color: '#0a0a0aff' }}>Name:</strong>
                                        <span>{formData.firstName} {formData.lastName}</span>
                                    </div>
                                    <div style={styles.reviewItem}>
                                        <strong style={{ color: '#050505ff' }}>Contact:</strong>
                                        <span>{formData.email} | {formData.phone}</span>
                                    </div>
                                    <div style={styles.reviewItem}>
                                        <strong style={{ color: '#050505ff' }}>Address:</strong>
                                        <span>{formData.address}, {formData.city} - {formData.zip}</span>
                                    </div>
                                </div>
                                <button
                                    style={{ background: 'transparent', border: '1px solid #0a0a0aff', color: '#060606ff', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, marginTop: '15px' }}
                                    onClick={() => setStep(1)}
                                >
                                    Edit Details
                                </button>
                            </div>

                            <div style={styles.card}>
                                <h2 style={styles.h2}>Select Payment Method</h2>
                                <div style={styles.paymentOption(true)}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" style={{ height: '20px' }} />
                                        <span>Pay with Razorpay (Cards, UPI, NetBanking)</span>
                                    </div>
                                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #0e0e0eff', position: 'relative' }}>
                                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '10px', height: '10px', borderRadius: '50%', background: '#090909ff' }}></div>
                                    </div>
                                </div>

                                <button
                                    style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
                                    onClick={handleRazorpayPayment}
                                    disabled={loading}
                                >
                                    {loading ? "Processing..." : `Pay ₹${totalPrice.toLocaleString()}`}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <div style={styles.card}>
                        <h2 style={styles.h2}>Order Summary</h2>
                        <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '25px' }}>
                            {cartItems.map((item) => (
                                <div key={item._id || item.id} style={styles.previewItem}>
                                    <img src={item.image} alt={item.name} style={styles.previewImg} />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '0.95rem', marginBottom: '4px' }}>{item.name}</h4>
                                        <p style={{ fontSize: '0.8rem', color: '#070707ff' }}>Qty: {item.quantity}</p>
                                    </div>
                                    <div style={{ fontWeight: 600 }}>
                                        ₹{((item.price || 0) * item.quantity).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ borderTop: '1px solid rgba(9, 9, 9, 0.1)', paddingTop: '20px' }}>
                            <div style={styles.priceRow}>
                                <span style={{ color: 'black' }}>Subtotal</span>
                                <span style={{ color: 'black' }}>₹{totalPrice.toLocaleString()}</span>
                            </div>
                            <div style={styles.priceRow}>
                                <span style={{ color: 'black' }}>Delivery Cost</span>
                                <span style={{ color: '#00c853', fontWeight: 600 }}>FREE</span>
                            </div>
                            <div style={styles.priceTotal}>
                                <span>Grand Total</span>
                                <span>₹{totalPrice.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
