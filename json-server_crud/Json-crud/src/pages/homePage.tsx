import { NavLink } from "react-router";
import { FaRocket, FaShieldHalved, FaVideo } from "react-icons/fa6";

export default function HomePage() {
    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

                    * { box-sizing: border-box; }

                    @keyframes float {
                        0%   { transform: translateY(0px) rotate(0deg) scale(1); }
                        33%  { transform: translateY(-18px) rotate(2.5deg) scale(1.02); }
                        66%  { transform: translateY(-8px) rotate(-1.5deg) scale(0.99); }
                        100% { transform: translateY(0px) rotate(0deg) scale(1); }
                    }
                    @keyframes shimmer {
                        0%   { background-position: -200% center; }
                        100% { background-position: 200% center; }
                    }
                    @keyframes fadeSlideUp {
                        from { opacity: 0; transform: translateY(32px); }
                        to   { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes orbPulse {
                        0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.45; }
                        50%       { transform: scale(1.12) translate(-12px, 10px); opacity: 0.65; }
                    }
                    @keyframes badgePop {
                        0%   { transform: scale(0.8); opacity: 0; }
                        70%  { transform: scale(1.05); }
                        100% { transform: scale(1); opacity: 1; }
                    }
                    @keyframes lineGrow {
                        from { width: 0; }
                        to   { width: 56px; }
                    }

                    .animate-float      { animation: float 5s ease-in-out infinite; }
                    .animate-badge      { animation: badgePop 0.7s cubic-bezier(.34,1.56,.64,1) 0.2s both; }
                    .animate-hero-1     { animation: fadeSlideUp 0.8s ease 0.3s both; }
                    .animate-hero-2     { animation: fadeSlideUp 0.8s ease 0.5s both; }
                    .animate-hero-3     { animation: fadeSlideUp 0.8s ease 0.65s both; }
                    .animate-hero-4     { animation: fadeSlideUp 0.8s ease 0.8s both; }
                    .animate-card-in    { animation: fadeSlideUp 0.8s ease 0.9s both; }

                    .shimmer-text {
                        background: linear-gradient(
                            120deg,
                            #166534 0%,
                            #15803d 20%,
                            #4ade80 40%,
                            #86efac 50%,
                            #4ade80 60%,
                            #15803d 80%,
                            #166534 100%
                        );
                        background-size: 200% auto;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        animation: shimmer 4s linear infinite;
                    }

                    .orb-1 {
                        position: absolute;
                        width: 480px; height: 480px;
                        background: radial-gradient(circle, rgba(134,239,172,0.35) 0%, rgba(187,247,208,0.15) 60%, transparent 100%);
                        border-radius: 50%;
                        top: -80px; right: -100px;
                        animation: orbPulse 7s ease-in-out infinite;
                        pointer-events: none;
                    }
                    .orb-2 {
                        position: absolute;
                        width: 300px; height: 300px;
                        background: radial-gradient(circle, rgba(253,224,71,0.2) 0%, rgba(254,240,138,0.08) 60%, transparent 100%);
                        border-radius: 50%;
                        bottom: -60px; left: -60px;
                        animation: orbPulse 9s ease-in-out 2s infinite reverse;
                        pointer-events: none;
                    }

                    .noise-bg::before {
                        content: '';
                        position: fixed;
                        inset: 0;
                        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
                        pointer-events: none;
                        z-index: 0;
                    }

                    .glass-card {
                        background: rgba(255,255,255,0.72);
                        backdrop-filter: blur(24px) saturate(180%);
                        -webkit-backdrop-filter: blur(24px) saturate(180%);
                        border: 1px solid rgba(255,255,255,0.9);
                        box-shadow:
                            0 4px 6px rgba(0,0,0,0.02),
                            0 20px 60px rgba(22,163,74,0.06),
                            0 40px 80px rgba(0,0,0,0.06),
                            inset 0 1px 0 rgba(255,255,255,0.95);
                    }
                    .glass-card:hover {
                        box-shadow:
                            0 4px 6px rgba(0,0,0,0.02),
                            0 30px 80px rgba(22,163,74,0.12),
                            0 50px 100px rgba(0,0,0,0.08),
                            inset 0 1px 0 rgba(255,255,255,0.95);
                    }

                    .btn-primary {
                        position: relative;
                        overflow: hidden;
                        background: linear-gradient(135deg, #15803d 0%, #16a34a 50%, #22c55e 100%);
                        box-shadow: 0 4px 20px rgba(22,163,74,0.3), 0 1px 3px rgba(0,0,0,0.1);
                        transition: all 0.35s cubic-bezier(.34,1.2,.64,1);
                    }
                    .btn-primary::after {
                        content: '';
                        position: absolute;
                        inset: 0;
                        background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.15) 100%);
                        opacity: 0;
                        transition: opacity 0.3s;
                    }
                    .btn-primary:hover {
                        transform: translateY(-3px) scale(1.02);
                        box-shadow: 0 10px 40px rgba(22,163,74,0.45), 0 4px 12px rgba(0,0,0,0.1);
                    }
                    .btn-primary:hover::after { opacity: 1; }
                    .btn-primary:active { transform: translateY(0) scale(0.99); }

                    .btn-secondary {
                        background: rgba(255,255,255,0.9);
                        backdrop-filter: blur(10px);
                        border: 1.5px solid rgba(22,163,74,0.2);
                        box-shadow: 0 4px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9);
                        transition: all 0.35s cubic-bezier(.34,1.2,.64,1);
                    }
                    .btn-secondary:hover {
                        transform: translateY(-3px) scale(1.02);
                        border-color: rgba(22,163,74,0.5);
                        box-shadow: 0 10px 30px rgba(22,163,74,0.12), inset 0 1px 0 rgba(255,255,255,0.9);
                    }

                    .feature-card {
                        background: rgba(255,255,255,0.85);
                        backdrop-filter: blur(20px);
                        border: 1px solid rgba(255,255,255,0.9);
                        box-shadow:
                            0 2px 4px rgba(0,0,0,0.02),
                            0 8px 30px rgba(0,0,0,0.05),
                            inset 0 1px 0 rgba(255,255,255,1);
                        transition: all 0.4s cubic-bezier(.34,1.1,.64,1);
                    }
                    .feature-card:hover {
                        transform: translateY(-8px);
                        box-shadow:
                            0 4px 6px rgba(0,0,0,0.03),
                            0 20px 50px rgba(22,163,74,0.1),
                            0 40px 60px rgba(0,0,0,0.06),
                            inset 0 1px 0 rgba(255,255,255,1);
                        border-color: rgba(134,239,172,0.4);
                    }

                    .icon-box {
                        transition: all 0.35s cubic-bezier(.34,1.4,.64,1);
                    }
                    .feature-card:hover .icon-box {
                        transform: scale(1.15) rotate(8deg);
                        background: linear-gradient(135deg, #15803d, #22c55e) !important;
                        color: white !important;
                    }

                    .price-tag {
                        background: linear-gradient(135deg, #15803d 0%, #22c55e 100%);
                        box-shadow: 0 4px 14px rgba(22,163,74,0.4);
                        transition: all 0.3s cubic-bezier(.34,1.4,.64,1);
                    }
                    .glass-card:hover .price-tag {
                        transform: scale(1.08);
                        box-shadow: 0 8px 24px rgba(22,163,74,0.5);
                    }

                    .dot-grid {
                        position: absolute;
                        inset: 0;
                        background-image: radial-gradient(circle, rgba(22,163,74,0.08) 1px, transparent 1px);
                        background-size: 28px 28px;
                        pointer-events: none;
                    }

                    .tag-line {
                        display: inline-block;
                        width: 0;
                        height: 2px;
                        background: #16a34a;
                        border-radius: 2px;
                        animation: lineGrow 1s ease 1.2s forwards;
                        vertical-align: middle;
                        margin-right: 10px;
                    }
                `}
            </style>

            <div
                className="noise-bg min-h-screen font-sans pt-32 pb-24 overflow-hidden relative"
                style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #f8fafc 40%, #fafdf7 70%, #f0fdf4 100%)', fontFamily: "'DM Sans', sans-serif" }}
            >
                {/* Dot grid background */}
                <div className="dot-grid" />

                {/* Ambient orbs */}
                <div className="orb-1" />
                <div className="orb-2" />

                {/* ─── HERO ─── */}
                <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

                    {/* Left — Copy */}
                    <div className="space-y-8 text-center lg:text-left">

                        {/* Badge */}
                        <div className="animate-badge inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-green-200/80 text-green-800 text-xs font-semibold tracking-widest uppercase cursor-pointer"
                            style={{ background: 'rgba(240,253,244,0.8)', backdropFilter: 'blur(12px)', boxShadow: '0 2px 10px rgba(22,163,74,0.08)' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                            <FaRocket className="text-green-500 text-xs" />
                            100% HD &amp; 4K Quality
                        </div>

                        {/* Headline */}
                        <div className="animate-hero-1">
                            <p className="text-sm font-semibold text-gray-400 tracking-[0.2em] uppercase mb-3">
                                <span className="tag-line" />
                                Premium Movie Streaming
                            </p>
                            <h1
                                className="text-5xl sm:text-6xl lg:text-[4.5rem] font-black text-gray-900 leading-[1.08] tracking-tight"
                                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                            >
                                Cinematic Magic,
                                <br />
                                <span className="shimmer-text">
                                    Streamed Instantly.
                                </span>
                            </h1>
                        </div>

                        {/* Sub */}
                        <p className="animate-hero-2 text-base sm:text-lg text-gray-500 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
                            Experience the biggest blockbusters and indie gems sourced directly from top studios —
                            <span className="text-gray-700 font-medium"> real emotions, real entertainment</span>, straight to your screen.
                        </p>

                        {/* CTAs */}
                        <div className="animate-hero-3 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
                            <NavLink
                                to="/product"
                                className="btn-primary w-full sm:w-auto px-9 py-4 rounded-2xl text-white font-semibold text-base tracking-wide"
                            >
                                Browse Movies →
                            </NavLink>
                            <NavLink
                                to="/product"
                                className="btn-secondary w-full sm:w-auto px-9 py-4 rounded-2xl text-gray-700 font-semibold text-base tracking-wide"
                            >
                                Explore Genres
                            </NavLink>
                        </div>

                        {/* Trust stats */}
                        <div className="animate-hero-4 flex items-center gap-8 justify-center lg:justify-start pt-2">
                            {[
                                { value: '12K+', label: 'Happy Customers' },
                                { value: 'Instant', label: 'Streaming' },
                                { value: '4.9★', label: 'Rating' },
                            ].map((s, i) => (
                                <div key={i} className="text-center lg:text-left">
                                    <p className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</p>
                                    <p className="text-xs text-gray-400 font-medium tracking-wide mt-0.5">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — Fruit Card */}
                    <div className="animate-card-in relative flex justify-center lg:justify-end mt-10 lg:mt-0">

                        {/* Glow blob */}
                        <div
                            className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full pointer-events-none"
                            style={{
                                background: 'radial-gradient(circle, rgba(134,239,172,0.4) 0%, rgba(187,247,208,0.2) 50%, transparent 80%)',
                                filter: 'blur(50px)',
                                top: '50%', left: '50%',
                                transform: 'translate(-50%, -50%)',
                                animation: 'orbPulse 5s ease-in-out infinite',
                            }}
                        />

                        {/* Glass card */}
                        <div className="glass-card relative z-10 rounded-[2.5rem] p-8 w-[22rem] sm:w-[26rem] transition-all duration-500 cursor-pointer">

                            {/* Decorative rings */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border-2 border-green-100 opacity-60" />
                            <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full border border-green-50 opacity-40" />

                            {/* Organic badge */}
                            <div className="absolute top-5 left-5 px-3 py-1 rounded-full text-xs font-bold tracking-wider text-green-700"
                                style={{ background: 'rgba(220,252,231,0.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(134,239,172,0.4)' }}>
                                🎬 HD Quality
                            </div>

                            {/* Mango */}
                            <div className="relative w-full h-64 sm:h-72 flex justify-center items-center animate-float">
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 75%, rgba(0,0,0,0.08) 0%, transparent 70%)' }}
                                />
                                <img
                                    src={"https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg"}
                                    alt="Premium Movie"
                                    className="w-64 h-64 object-cover rounded-[2rem] relative z-10 hover:scale-105 transition-transform duration-700 drop-shadow-2xl"
                                    style={{ filter: 'drop-shadow(0 24px 40px rgba(0,0,0,0.18)) drop-shadow(0 8px 16px rgba(0,0,0,0.1))' }}
                                />
                            </div>

                            {/* Product info bar */}
                            <div
                                className="mt-3 rounded-2xl p-5 flex justify-between items-center group"
                                style={{
                                    background: 'rgba(255,255,255,0.95)',
                                    border: '1px solid rgba(220,252,231,0.8)',
                                    boxShadow: '0 4px 20px rgba(22,163,74,0.06), inset 0 1px 0 rgba(255,255,255,1)',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <div>
                                    <h3
                                        className="font-black text-gray-900 text-lg group-hover:text-green-700 transition-colors"
                                        style={{ fontFamily: "'Playfair Display', serif" }}
                                    >
                                        Inception
                                    </h3>
                                    <p className="text-xs text-gray-400 font-medium tracking-wide mt-0.5 uppercase">
                                        Sci-Fi Thriller · Christopher Nolan
                                    </p>
                                </div>
                                <div className="price-tag text-white font-black text-xl px-5 py-2.5 rounded-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    ₹150
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* ─── FEATURES ─── */}
                <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-36 relative z-10">

                    {/* Section header */}
                    <div className="text-center mb-14">
                        <p className="text-xs font-bold tracking-[0.25em] uppercase text-green-600 mb-3">Why Choose Us</p>
                        <h2
                            className="text-3xl sm:text-4xl font-black text-gray-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Our Promise to You
                        </h2>
                        <div className="mt-4 mx-auto w-12 h-0.5 rounded-full bg-gradient-to-r from-green-400 to-lime-400" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <FaRocket />,
                                title: "Lightning Fast Streaming",
                                desc: "From our servers to your screen with zero buffering — zero compromise on quality.",
                                accent: "From servers",
                                num: "01"
                            },
                            {
                                icon: <FaShieldHalved />,
                                title: "100% Entertainment",
                                desc: "Every movie is carefully curated and available in the highest quality just for you.",
                                accent: "curated",
                                num: "02"
                            },
                            {
                                icon: <FaVideo />,
                                title: "Ad-Free Experience",
                                desc: "Enjoy uninterrupted streaming with our premium ad-free platform.",
                                accent: "uninterrupted",
                                num: "03"
                            }
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className="feature-card rounded-3xl p-8 cursor-pointer group relative overflow-hidden"
                            >
                                {/* Number watermark */}
                                <span
                                    className="absolute top-4 right-6 text-6xl font-black text-gray-900 select-none pointer-events-none"
                                    style={{ opacity: 0.025, fontFamily: "'Playfair Display', serif" }}
                                >
                                    {feature.num}
                                </span>

                                {/* Icon */}
                                <div
                                    className="icon-box text-2xl mb-6 bg-green-50 text-green-600 w-14 h-14 flex items-center justify-center rounded-2xl"
                                    style={{ border: '1px solid rgba(134,239,172,0.3)' }}
                                >
                                    {feature.icon}
                                </div>

                                <h4
                                    className="font-black text-gray-900 text-xl mb-3 group-hover:text-green-700 transition-colors"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    {feature.title}
                                </h4>
                                <p className="text-gray-500 text-sm leading-relaxed font-light">
                                    {feature.desc}
                                </p>

                                {/* Bottom accent line */}
                                <div
                                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-400 to-lime-400 rounded-full transition-all duration-500"
                                    style={{ width: '0%' }}
                                    onMouseEnter={e => e.currentTarget.style.width = '100%'}
                                    onMouseLeave={e => e.currentTarget.style.width = '0%'}
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </>
    );
}