import { useEffect, useState, useMemo } from "react";
import type { productFetchType } from "../utils/global";
import { deleteProduct, fetchAllProducts } from "../Services/ProductService";
import { useNavigate } from "react-router";
import { FaFilm, FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const CATEGORIES = ["All", "Action", "Comedy", "Drama", "Sci-Fi"];

export default function ViewProductPage() {
    const [allProducts, setAllProduct] = useState<productFetchType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllProducts().then((data) => {
            setAllProduct(data);
            setIsLoading(false);
        });
    }, []);

    const handleDelete = async (id: string) => {
        const status = await deleteProduct(id);
        if (status) {
            setAllProduct((prev) => prev.filter((p) => p.id !== id));
            toast.success("Product deleted successfully!");
        } else {
            toast.error("Failed to delete product. Try again!");
        }
    };

    // Live filter + search
    const filteredProducts = useMemo(() => {
        const search = searchTerm.toLowerCase().trim();
        return allProducts.filter((p) => {
            if (selectedCategory !== "All" && p.p_category !== selectedCategory) return false;
            if (search && !p.p_name.toLowerCase().includes(search)) return false;
            return true;
        });
    }, [allProducts, selectedCategory, searchTerm]);

    const totalItems = filteredProducts.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemPerPage));
    const startIndex = (currentPage - 1) * itemPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + itemPerPage);

    // Reset to page 1 on filter change
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };
    const handleCategory = (cat: string) => {
        setSelectedCategory(cat);
        setCurrentPage(1);
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

                @keyframes shimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position:  200% center; }
                }
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes lineGrow {
                    from { width: 0; }
                    to   { width: 56px; }
                }

                .shimmer-text {
                    background: linear-gradient(
                        120deg,
                        #166534 0%, #15803d 20%, #4ade80 40%,
                        #86efac 50%, #4ade80 60%, #15803d 80%, #166534 100%
                    );
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: shimmer 4s linear infinite;
                }
                .animate-hero-1 { animation: fadeSlideUp 0.7s ease 0.2s both; }
                .animate-hero-2 { animation: fadeSlideUp 0.7s ease 0.35s both; }
                .animate-hero-3 { animation: fadeSlideUp 0.7s ease 0.5s both; }
                .animate-hero-4 { animation: fadeSlideUp 0.7s ease 0.65s both; }
                .animate-hero-5 { animation: fadeSlideUp 0.7s ease 0.8s both; }

                .tag-line {
                    display: inline-block; width: 0; height: 2px;
                    background: #16a34a; border-radius: 2px;
                    animation: lineGrow 1s ease 1s forwards;
                    vertical-align: middle; margin-right: 10px;
                }
                .dot-grid {
                    position: fixed; inset: 0;
                    background-image: radial-gradient(circle, rgba(22,163,74,0.07) 1px, transparent 1px);
                    background-size: 28px 28px; pointer-events: none; z-index: 0;
                }
                .orb-1 {
                    position: fixed; width: 500px; height: 500px;
                    background: radial-gradient(circle, rgba(134,239,172,0.3) 0%, transparent 70%);
                    border-radius: 50%; top: -120px; right: -120px; pointer-events: none; z-index: 0;
                }
                .orb-2 {
                    position: fixed; width: 350px; height: 350px;
                    background: radial-gradient(circle, rgba(253,224,71,0.15) 0%, transparent 70%);
                    border-radius: 50%; bottom: -80px; left: -80px; pointer-events: none; z-index: 0;
                }
                .product-card {
                    background: rgba(255,255,255,0.85);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255,255,255,0.95);
                    box-shadow: 0 2px 4px rgba(0,0,0,0.02), 0 8px 30px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,1);
                    transition: all 0.4s cubic-bezier(.34,1.1,.64,1);
                }
                .product-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 4px 6px rgba(0,0,0,0.03), 0 20px 50px rgba(22,163,74,0.12), 0 40px 60px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1);
                    border-color: rgba(134,239,172,0.5);
                }
                .pg-btn {
                    padding: 6px 14px; border-radius: 10px; font-size: 13px; font-weight: 600;
                    border: 2px solid #dcfce7; background: white; color: #4b5563; cursor: pointer;
                    transition: all 0.2s;
                }
                .pg-btn:hover:not(:disabled) { border-color: #16a34a; color: #16a34a; }
                .pg-btn.active { background: #16a34a; color: white; border-color: #16a34a; }
                .pg-btn:disabled { opacity: 0.35; cursor: not-allowed; }
            `}</style>

            <div
                className="min-h-screen pt-28 pb-20 relative overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #f8fafc 40%, #fafdf7 70%, #f0fdf4 100%)', fontFamily: "'DM Sans', sans-serif" }}
            >
                <div className="dot-grid" />
                <div className="orb-1" />
                <div className="orb-2" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                    {/* ── Header ── */}
                    <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div className="animate-hero-1">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-200 mb-3"
                                style={{ background: 'rgba(240,253,244,0.8)', backdropFilter: 'blur(12px)' }}>
                                <FaFilm className="text-green-500 text-xs" />
                                <span className="text-xs font-semibold text-green-700 tracking-widest uppercase">Popular Movies</span>
                            </div>
                            <p className="text-sm font-semibold text-gray-400 tracking-[0.2em] uppercase mb-2">
                                <span className="tag-line" />
                                Movie Database
                            </p>
                            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight"
                                style={{ fontFamily: "'Playfair Display', serif" }}>
                                Our <span className="shimmer-text">Movies</span>
                            </h1>
                            <p className="text-gray-400 mt-1 text-sm">
                                {totalItems === 0 ? "No movies found" : `Showing ${Math.min(startIndex + 1, totalItems)}–${Math.min(startIndex + itemPerPage, totalItems)} of ${totalItems} movies`}
                            </p>
                        </div>
                        <div className="animate-hero-1 flex items-center gap-3">
                            <div className="px-5 py-2.5 rounded-xl border border-green-100 text-sm"
                                style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                                <span className="text-gray-400">Total: </span>
                                <span className="font-black text-green-600 text-lg">{allProducts.length}</span>
                            </div>
                            <button
                                onClick={() => navigate('/addProduct')}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                                style={{ background: 'linear-gradient(135deg, #15803d, #22c55e)', boxShadow: '0 4px 14px rgba(22,163,74,0.3)' }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add Movie
                            </button>
                        </div>
                    </div>

                    {/* ── Search + Items per page ── */}
                    <div className="animate-hero-2 mb-5 flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search movies..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full py-2.5 px-4 pl-10 text-sm text-gray-700 rounded-xl outline-none transition-all"
                                style={{
                                    background: 'rgba(255,255,255,0.9)',
                                    border: '2px solid #dcfce7',
                                    backdropFilter: 'blur(10px)',
                                }}
                                onFocus={e => e.target.style.borderColor = '#16a34a'}
                                onBlur={e => e.target.style.borderColor = '#dcfce7'}
                            />
                            {searchTerm && (
                                <button onClick={() => { setSearchTerm(""); setCurrentPage(1); }}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    <FaTimes className="text-xs" />
                                </button>
                            )}
                        </div>
                        <div className="relative">
                            <FaFilter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
                            <select
                                onChange={(e) => { setItemPerPage(Number(e.target.value)); setCurrentPage(1); }}
                                className="pl-10 pr-4 py-2.5 rounded-xl text-sm text-gray-700 outline-none cursor-pointer appearance-none"
                                style={{ background: 'rgba(255,255,255,0.9)', border: '2px solid #dcfce7', backdropFilter: 'blur(10px)' }}
                            >
                                <option value={10}>10 per page</option>
                                <option value={20}>20 per page</option>
                                <option value={50}>50 per page</option>
                                <option value={100}>100 per page</option>
                            </select>
                        </div>
                    </div>

                    {/* ── Category Filters ── */}
                    <div className="animate-hero-3 flex flex-wrap gap-2 mb-8">
                        {CATEGORIES.map((cat) => (
                            <button key={cat} onClick={() => handleCategory(cat)}
                                className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer"
                                style={{
                                    border: selectedCategory === cat ? '2px solid #16a34a' : '2px solid #dcfce7',
                                    background: selectedCategory === cat ? '#16a34a' : 'rgba(255,255,255,0.9)',
                                    color: selectedCategory === cat ? 'white' : '#4b5563',
                                    backdropFilter: 'blur(10px)',
                                }}>
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* ── Cards Grid ── */}
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                        </div>
                    ) : currentProducts.length > 0 ? (
                        <div className="animate-hero-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {currentProducts.map((product, index) => (
                                <div key={product.id || index} className="product-card rounded-2xl overflow-hidden cursor-pointer">
                                    {/* Image */}
                                    <div className="relative h-44 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)' }}>
                                        <img src={product.p_image} alt={product.p_name}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold"
                                            style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', color: '#15803d', border: '1px solid rgba(134,239,172,0.4)' }}>
                                            {product.p_category}
                                        </span>
                                        {product.p_stock < 10 && (
                                            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold bg-red-500 text-white">
                                                Low Stock
                                            </span>
                                        )}
                                    </div>

                                    {/* Body */}
                                    <div className="p-4">
                                        <h3 className="font-black text-gray-900 text-base truncate mb-1"
                                            style={{ fontFamily: "'Playfair Display', serif" }}>
                                            {product.p_name}
                                        </h3>
                                        <p className="text-xs text-gray-400 truncate mb-3" title={product.p_description}>
                                            {product.p_description}
                                        </p>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="font-black text-xl shimmer-text"
                                                style={{ fontFamily: "'Playfair Display', serif" }}>
                                                ₹{Number(product.p_price).toLocaleString()}
                                            </span>
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${product.p_stock < 10 ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'}`}>
                                                {product.p_stock} units
                                            </span>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            <button onClick={() => navigate(`/product-detail/${product.id}`)}
                                                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all"
                                                style={{ background: 'rgba(239,246,255,0.9)', color: '#1d4ed8', border: '1px solid rgba(147,197,253,0.3)' }}
                                                onMouseEnter={e => (e.currentTarget.style.background = '#dbeafe')}
                                                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(239,246,255,0.9)')}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                View
                                            </button>
                                            <button onClick={() => navigate(`/edit-product/${product.id}`)}
                                                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all"
                                                style={{ background: 'rgba(240,253,244,0.9)', color: '#15803d', border: '1px solid rgba(134,239,172,0.3)' }}
                                                onMouseEnter={e => (e.currentTarget.style.background = '#dcfce7')}
                                                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(240,253,244,0.9)')}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
                                                </svg>
                                                Edit
                                            </button>
                                            <button onClick={() => handleDelete(product.id)}
                                                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all"
                                                style={{ background: 'rgba(254,242,242,0.9)', color: '#dc2626', border: '1px solid rgba(252,165,165,0.3)' }}
                                                onMouseEnter={e => (e.currentTarget.style.background = '#fee2e2')}
                                                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(254,242,242,0.9)')}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-400">
                            <p className="text-xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>No movies found</p>
                            <p className="text-sm mt-1">Try adjusting your search or filters</p>
                            {(searchTerm || selectedCategory !== "All") && (
                                <button onClick={() => { setSearchTerm(""); setSelectedCategory("All"); setCurrentPage(1); }}
                                    className="mt-4 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                                    style={{ background: 'linear-gradient(135deg, #15803d, #22c55e)', boxShadow: '0 4px 14px rgba(22,163,74,0.3)' }}>
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    )}

                    {/* ── Pagination ── */}
                    <div className="animate-hero-5 mt-8 flex items-center gap-1.5 flex-wrap">
                        <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1} className="pg-btn">{"<"}</button>

                        {[...Array(totalPages)].map((_, i) => (
                            <button key={i} onClick={() => setCurrentPage(i + 1)}
                                className={`pg-btn ${currentPage === i + 1 ? "active" : ""}`}>
                                {i + 1}
                            </button>
                        ))}

                        <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages} className="pg-btn">{">"}</button>
                    </div>

                </div>
            </div>
        </>
    );
}