import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import { FaFilm } from "react-icons/fa";
import { toast } from "react-toastify";
import { fetchSingleProduct, updateProduct } from "../Services/ProductService";
import type { productFetchType } from "../utils/global";

export default function EditProductPage() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [productData, setProductData] = useState<productFetchType>({
        id: "", p_name: "", p_price: 0, p_stock: 0, p_image: "", p_category: "", p_description: "",
    });

    const productCategory = ["Action", "Comedy", "Drama", "Sci-Fi"];

    useEffect(() => {
        if (productId) getSingleProduct();
    }, [productId]);

    const getSingleProduct = async () => {
        const data = await fetchSingleProduct(productId || "");
        if (data) setProductData(data);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProductData((prev) => ({
            ...prev,
            [name]: (name === "p_price" || name === "p_stock") ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!productData.p_name || !productData.p_price || !productData.p_stock || !productData.p_image || !productData.p_category || !productData.p_description) {
            toast.error("All fields are required!");
            return;
        }
        setIsSubmitting(true);
        const status = await updateProduct(productData);
        setIsSubmitting(false);
        if (status) {
            toast.success("Movie updated successfully!");
            navigate("/product");
        } else {
            toast.error("Something went wrong. Try again!");
        }
    };

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
                .glass-form { background:rgba(255,255,255,0.88); backdrop-filter:blur(20px) saturate(180%); border:1px solid rgba(255,255,255,0.95); box-shadow:0 8px 32px rgba(0,0,0,0.06); }
                .form-input, .form-textarea, .form-select { background:rgba(255,255,255,0.95); border:1.5px solid rgba(34,197,94,0.15); transition:all 0.3s ease; font-family:'DM Sans',sans-serif; }
                .form-input:focus, .form-textarea:focus, .form-select:focus { outline:none; border-color:#22c55e; box-shadow:0 0 0 3px rgba(34,197,94,0.1); }
                .btn-submit { background:linear-gradient(135deg,#d97706 0%,#f59e0b 100%); transition:all 0.35s ease; }
                .btn-submit:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 10px 30px rgba(217,119,6,0.3); }
            `}</style>

            <div className="noise-bg min-h-screen pt-28 pb-20 overflow-hidden relative" style={{ background: "linear-gradient(145deg,#f0fdf4 0%,#fafdf7 45%,#f8fafc 100%)", fontFamily: "'DM Sans',sans-serif" }}>
                <div className="dot-grid" />
                <div className="orb-bg-1" />
                <div className="orb-bg-2" />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="animate-fade-up mb-8">
                        <NavLink to="/product" className="inline-flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors mb-6 group">
                            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="text-sm font-medium">Back to Movies</span>
                        </NavLink>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 border border-yellow-200 mb-5">
                            <FaFilm className="text-yellow-500 text-xs" />
                            <span className="text-xs font-semibold text-yellow-700 tracking-wide">EDIT MOVIE</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display',serif" }}>
                            Update <span className="text-yellow-600">Movie</span>
                        </h1>
                    </div>

                    <div className="animate-fade-up-delay">
                        <div className="glass-form rounded-3xl p-6 sm:p-8 lg:p-10">
                            <form onSubmit={handleSubmit} className="space-y-7">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Movie Name <span className="text-green-500">*</span></label>
                                            <input type="text" name="p_name" value={productData.p_name} onChange={handleChange} className="form-input w-full px-5 py-3.5 rounded-xl text-gray-800 placeholder-gray-400" placeholder="e.g., Inception" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹) <span className="text-green-500">*</span></label>
                                            <input type="number" name="p_price" value={productData.p_price} onChange={handleChange} min="0" className="form-input w-full px-5 py-3.5 rounded-xl text-gray-800 placeholder-gray-400" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Category <span className="text-green-500">*</span></label>
                                            <select name="p_category" value={productData.p_category} onChange={handleChange} className="form-select w-full px-5 py-3.5 rounded-xl text-gray-800 bg-white">
                                                <option value="">Select a category</option>
                                                {productCategory.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Availability (Units) <span className="text-green-500">*</span></label>
                                            <input type="number" name="p_stock" value={productData.p_stock} onChange={handleChange} min="0" className="form-input w-full px-5 py-3.5 rounded-xl text-gray-800 placeholder-gray-400" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL <span className="text-green-500">*</span></label>
                                            <input type="text" name="p_image" value={productData.p_image} onChange={handleChange} className="form-input w-full px-5 py-3.5 rounded-xl text-gray-800 placeholder-gray-400" placeholder="https://images.com/movie-poster.jpg" />
                                            {productData.p_image && <img src={productData.p_image} alt="preview" className="mt-2 h-20 rounded-lg object-cover" />}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description <span className="text-green-500">*</span></label>
                                            <textarea name="p_description" value={productData.p_description} onChange={handleChange} rows={3} className="form-textarea w-full px-5 py-3.5 rounded-xl text-gray-800 placeholder-gray-400 resize-none" placeholder="Describe the movie..." />
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
                                    <NavLink to="/product" className="px-8 py-3.5 rounded-xl text-gray-600 font-medium border border-gray-200 hover:border-green-300 hover:text-green-600 transition-all text-center">
                                        Cancel
                                    </NavLink>
                                    <button type="submit" disabled={isSubmitting} className="btn-submit px-10 py-3.5 rounded-xl text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed min-w-[160px]">
                                        {isSubmitting ? "Updating..." : "Update Movie →"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}