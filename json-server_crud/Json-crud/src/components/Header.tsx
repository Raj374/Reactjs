import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { fetchCart } from "../Services/ProductService";


interface NavItem {
    path: string;
    label: string;
    exact?: boolean;
}

const App: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [cartCount, setCartCount] = useState<number>(0);

    useEffect(() => {
        const loadCart = () => fetchCart().then((items) => setCartCount(items.reduce((s, i) => s + i.quantity, 0)));
        loadCart();
        window.addEventListener("focus", loadCart);
        return () => window.removeEventListener("focus", loadCart);
    }, []);

    const navLinks: NavItem[] = [
        { path: "/", label: "Home", exact: true },
        { path: "/addProduct", label: "Add movie" },
        { path: "/product", label: "movies" },
        { path: "/cart", label: "Cart" }
    ];

    return (
        <div className="font-sans">
            <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
                <nav className="w-full max-w-6xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300">
                    
                    <div className="flex items-center gap-2 text-xl md:text-2xl font-black tracking-widest cursor-pointer hover:scale-105 transition-transform duration-300">
                        
                        <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-lime-500 bg-clip-text text-transparent">
                            movies
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-x-2">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                end={link.exact}
                                className={({ isActive }: { isActive: boolean }) =>
                                    `px-5 py-2 text-sm font-bold rounded-full transition-all duration-300 ${
                                        isActive
                                            ? "text-emerald-700 bg-emerald-50 shadow-sm scale-105"
                                            : "text-gray-500 hover:text-emerald-600 hover:bg-gray-50"
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <NavLink to="/cart" className="relative p-2 rounded-full hover:bg-green-50 transition-colors">
                            <FaShoppingCart className="text-xl text-gray-600 hover:text-green-600 transition-colors" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 text-white text-xs font-black rounded-full flex items-center justify-center">
                                    {cartCount > 99 ? "99+" : cartCount}
                                </span>
                            )}
                        </NavLink>
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                            </svg>
                        </button>
                    </div>
                </nav>
            </header>

            <div className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
                
                <div className={`absolute top-0 right-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-500 ease-in-out p-8 flex flex-col gap-4 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <span className="font-black text-emerald-600 text-lg">MOVIES</span>
                        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }: { isActive: boolean }) =>
                                `text-lg font-bold px-6 py-4 rounded-2xl transition-all ${
                                    isActive 
                                    ? "bg-emerald-600 text-white shadow-xl shadow-emerald-100 translate-x-2" 
                                    : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;