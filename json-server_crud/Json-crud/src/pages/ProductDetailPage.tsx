import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaFilm, FaEdit, FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import { fetchSingleProduct, deleteProduct, fetchCart, addToCart, updateCartItem } from "../Services/ProductService";
import type { productFetchType } from "../utils/global";
import { toast } from "react-toastify";

export default function ProductDetailPage() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [productData, setProductData] = useState<productFetchType | null>(null);

    useEffect(() => {
        if (productId) getSingleProduct();
    }, [productId]);

    const getSingleProduct = async () => {
        const data = await fetchSingleProduct(productId || "");
        if (data) setProductData(data);
    };

    const handleAddToCart = async () => {
        if (!productData) return;
        const cartItems = await fetchCart();
        const existing = cartItems.find((i) => i.productId === productData.id);
        let status: boolean;
        if (existing) {
            status = await updateCartItem({ ...existing, quantity: existing.quantity + 1 });
        } else {
            status = await addToCart({
                productId: productData.id,
                p_name: productData.p_name,
                p_price: productData.p_price,
                p_image: productData.p_image,
                p_category: productData.p_category,
                quantity: 1,
            });
        }
        if (status) {
            toast.success("Added to cart!");
            navigate("/cart");
        } else {
            toast.error("Failed to add to cart!");
        }
    };

    const handleDelete = async () => {
        if (!productData) return;
        if (!confirm("Are you sure you want to delete this product?")) return;
        const status = await deleteProduct(productData.id);
        if (status) {
            toast.success("Product deleted!");
            navigate("/product");
        } else {
            toast.error("Failed to delete product.");
        }
    };

    if (!productData) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
                * { box-sizing: border-box; }
                @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes orbPulse { 0%, 100% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.1) translate(-10px, 8px); opacity: 0.6; } }
                .animate-fade-up { animation: fadeSlideUp 0.6s ease 0.2s both; }
                .animate-fade-up-delay { animation: fadeSlideUp 0.6s ease 0.4s both; }
                .orb-bg-1 { position:absolute; width:500px; height:500px; background:radial-gradient(circle,rgba(134,239,172,0.25) 0%,transparent 100%); border-radius:50%; top:-150px; right:-150px; animation:orbPulse 8s ease-in-out infinite; pointer-events:none; }
                .orb-bg-2 { position:absolute; width:350px; height:350px; background:radial-gradient(circle,rgba(253,224,71,0.15) 0%,transparent 100%); border-radius:50%; bottom:-100px; left:-100px; animation:orbPulse 10s ease-in-out 2s infinite reverse; pointer-events:none; }
                .noise-bg::before { content:''; position:fixed; inset:0; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E"); pointer-events:none; z-index:0; }
                .dot-grid { position:absolute; inset:0; background-image:radial-gradient(circle,rgba(22,163,74,0.06) 1px,transparent 1px); background-size:28px 28px; pointer-events:none; }
                .glass-card { background:rgba(255,255,255,0.92); backdrop-filter:blur(16px); border:1px solid rgba(255,255,255,0.95); box-shadow:0 8px 32px rgba(0,0,0,0.06); }
                .btn-primary { background:linear-gradient(135deg,#15803d 0%,#22c55e 100%); transition:all 0.3s ease; }
                .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(22,163,74,0.3); }
            `}</style>

            <div className="noise-bg min-h-screen pt-28 pb-20 overflow-hidden relative" style={{ background: "linear-gradient(145deg,#f0fdf4 0%,#fafdf7 45%,#f8fafc 100%)", fontFamily: "'DM Sans',sans-serif" }}>
                <div className="dot-grid" />
                <div className="orb-bg-1" />
                <div className="orb-bg-2" />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors mb-8 group">
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="text-sm font-medium">Back to Products</span>
                    </button>

                    <div className="animate-fade-up grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                        {/* Image */}
                        <div className="glass-card rounded-3xl overflow-hidden relative">
                            <img src={productData.p_image} alt={productData.p_name} className="w-full h-auto object-cover min-h-[350px] max-h-[500px]" />
                            <div className="absolute top-4 left-4">
                                <span className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                                    {productData.p_category}
                                </span>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="animate-fade-up-delay flex flex-col space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 w-fit">
                               <FaFilm className="text-green-500 text-xs" />
                                <span className="text-xs font-semibold text-green-700 tracking-wide">PRODUCT DETAILS</span>
                            </div>

                            <div className="border-b border-gray-100 pb-6">
                                <h1 className="text-4xl font-black text-gray-900 leading-tight" style={{ fontFamily: "'Playfair Display',serif" }}>
                                    {productData.p_name}
                                </h1>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-3xl font-black text-green-600">₹{Number(productData.p_price).toLocaleString()}</span>
                                    <span className={`px-3 py-1 rounded-lg text-sm font-bold ${productData.p_stock > 0 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                                        {productData.p_stock > 0 ? `In Stock: ${productData.p_stock}` : "Out of Stock"}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Description</h3>
                                <p className="text-gray-500 leading-relaxed">{productData.p_description}</p>
                            </div>

                            <div className="pt-4 space-y-3">
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold transition-all hover:-translate-y-0.5"
                                    style={{ background: 'linear-gradient(135deg, #15803d, #22c55e)', boxShadow: '0 4px 14px rgba(22,163,74,0.3)' }}
                                >
                                    <FaShoppingCart /> Add to Cart
                                </button>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => navigate(`/edit-product/${productData.id}`)}
                                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-colors"
                                    >
                                        <FaEdit /> Edit Product
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-colors"
                                    >
                                        <FaTrashAlt /> Delete Product
                                    </button>
                                </div>
                                <p className="text-center text-xs text-gray-400">Free shipping on orders over ₹500 • Secure Payment</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}