import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaShoppingCart, FaTrashAlt, FaFilm } from "react-icons/fa";
import { fetchCart, updateCartItem, removeFromCart, clearCart } from "../Services/ProductService";
import type { cartItemType } from "../utils/global";
import { toast } from "react-toastify";

export default function CartPage() {
    const [cartItems, setCartItems] = useState<cartItemType[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart().then(setCartItems);
    }, []);

    const handleQuantityChange = async (item: cartItemType, delta: number) => {
        const newQty = item.quantity + delta;

        if (newQty < 1) return;

        const updatedItem = { ...item, quantity: newQty };

        const status = await updateCartItem(updatedItem);

        if (!status) return;

        setCartItems(prev =>
            prev.map(i =>
                i.id === item.id ? updatedItem : i
            )
        );
    };
    const handleRemove = async (id: string) => {
        const status = await removeFromCart(id);
        if (status) {
            setCartItems((prev) => prev.filter((i) => i.id !== id));
            toast.success("Item removed from cart!");
        }
    };

    const handleClearCart = async () => {
        await clearCart(cartItems);
        setCartItems([]);
        toast.success("Cart cleared!");
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) return;
        await clearCart(cartItems);
        setCartItems([]);
        toast.success("Checkout successful! Enjoy your movies!");
    };

    const total = cartItems.reduce((sum, i) => sum + i.p_price * i.quantity, 0);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
                @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes orbPulse { 0%, 100% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.1) translate(-10px, 8px); opacity: 0.6; } }
                .animate-fade-up { animation: fadeSlideUp 0.6s ease 0.2s both; }
                .orb-bg-1 { position:fixed; width:500px; height:500px; background:radial-gradient(circle,rgba(134,239,172,0.25) 0%,transparent 100%); border-radius:50%; top:-150px; right:-150px; animation:orbPulse 8s ease-in-out infinite; pointer-events:none; z-index:0; }
                .orb-bg-2 { position:fixed; width:350px; height:350px; background:radial-gradient(circle,rgba(253,224,71,0.15) 0%,transparent 100%); border-radius:50%; bottom:-100px; left:-100px; animation:orbPulse 10s ease-in-out 2s infinite reverse; pointer-events:none; z-index:0; }
                .dot-grid { position:fixed; inset:0; background-image:radial-gradient(circle,rgba(22,163,74,0.06) 1px,transparent 1px); background-size:28px 28px; pointer-events:none; z-index:0; }
                .glass-card { background:rgba(255,255,255,0.88); backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,0.95); box-shadow:0 4px 24px rgba(0,0,0,0.06); }
            `}</style>

            <div className="min-h-screen pt-28 pb-20 relative overflow-hidden" style={{ background: "linear-gradient(145deg,#f0fdf4 0%,#fafdf7 45%,#f8fafc 100%)", fontFamily: "'DM Sans',sans-serif" }}>
                <div className="dot-grid" />
                <div className="orb-bg-1" />
                <div className="orb-bg-2" />

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="animate-fade-up mb-8">
                        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors mb-6 group">
                            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="text-sm font-medium">Back</span>
                        </button>

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 mb-4">
                            <FaFilm className="text-green-500 text-xs" />
                            <span className="text-xs font-semibold text-green-700 tracking-wide">YOUR CART</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display',serif" }}>
                            Shopping <span className="text-green-600">Cart</span>
                        </h1>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="glass-card rounded-3xl p-16 text-center animate-fade-up">
                            <FaShoppingCart className="text-6xl text-gray-200 mx-auto mb-4" />
                            <p className="text-xl font-black text-gray-400" style={{ fontFamily: "'Playfair Display',serif" }}>Your cart is empty</p>
                            <p className="text-sm text-gray-400 mt-1 mb-6">Add some fresh products!</p>
                            <button onClick={() => navigate("/product")} className="px-8 py-3 rounded-xl text-white font-semibold" style={{ background: "linear-gradient(135deg,#15803d,#22c55e)", boxShadow: "0 4px 14px rgba(22,163,74,0.3)" }}>
                                Browse Products
                            </button>
                        </div>
                    ) : (
                        <div className="animate-fade-up grid grid-cols-1 lg:grid-cols-3 gap-6">
                         
                            <div className="lg:col-span-2 space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="glass-card rounded-2xl p-4 flex items-center gap-4">
                                        <img src={item.p_image} alt={item.p_name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-black text-gray-900 truncate" style={{ fontFamily: "'Playfair Display',serif" }}>{item.p_name}</h3>
                                            <p className="text-xs text-gray-400 mb-2">{item.p_category}</p>
                                            <p className="text-green-600 font-black">₹{(item.p_price * item.quantity).toLocaleString()}</p>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <button onClick={() => handleQuantityChange(item, -1)} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold text-gray-600 transition-colors flex items-center justify-center">−</button>
                                            <span className="w-8 text-center font-bold text-gray-800">{item.quantity}</span>
                                            <button onClick={() => handleQuantityChange(item, 1)} className="w-8 h-8 rounded-lg bg-green-100 hover:bg-green-200 font-bold text-green-700 transition-colors flex items-center justify-center">+</button>
                                        </div>
                                        <button onClick={() => handleRemove(item.id)} className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors flex-shrink-0">
                                            <FaTrashAlt className="text-sm" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="glass-card rounded-2xl p-6 h-fit space-y-4">
                                <h2 className="text-xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display',serif" }}>Order Summary</h2>
                                <div className="space-y-2 text-sm text-gray-500">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex justify-between">
                                            <span className="truncate max-w-[140px]">{item.p_name} × {item.quantity}</span>
                                            <span className="font-semibold text-gray-700">₹{(item.p_price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                                    <span className="font-black text-gray-900">Total</span>
                                    <span className="text-2xl font-black text-green-600">₹{total.toLocaleString()}</span>
                                </div>
                                <button onClick={handleCheckout} className="w-full py-3.5 rounded-xl text-white font-bold transition-all hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg,#15803d,#22c55e)", boxShadow: "0 4px 14px rgba(22,163,74,0.3)" }}>
                                    Checkout →
                                </button>
                                <button onClick={handleClearCart} className="w-full py-3 rounded-xl text-red-500 font-semibold bg-red-50 hover:bg-red-100 transition-colors text-sm">
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}