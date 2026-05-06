import React from "react";
import { FaStar, FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import type { productFetchType } from "../utils/global";

interface Props {
    product: productFetchType;
    onView: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const ProductCard = React.memo(({ product, onView, onEdit, onDelete }: Props) => {
    return (
        <div className="pc-card">
            <div className="pc-img-wrap">
                <img
                    src={product.p_image}
                    alt={product.p_name}
                    width={300}
                    height={176}
                    loading="lazy"
                    decoding="async"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 text-green-700 border border-green-100">
                    {product.p_category}
                </span>
                <span className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold ${product.p_stock < 10 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}>
                    {product.p_stock < 10 ? "Low Stock" : "In Stock"}
                </span>
            </div>

            <div className="p-4">
                <h3 className="font-bold text-gray-800 text-base truncate">{product.p_name}</h3>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{product.p_description}</p>

                <div className="flex items-center gap-1 mt-2">
                    <FaStar className="text-yellow-400 text-xs" />
                    <span className="text-xs text-gray-500">{product.p_stock} in stock</span>
                </div>

                <p className="text-xl font-black text-green-600 mt-3">
                    ₹{product.p_price.toLocaleString()}
                </p>

                <div className="flex gap-2 mt-3">
                    <button className="pc-btn pc-btn-view" onClick={() => onView(product.id)}>
                        <FaEye /> View
                    </button>
                    <button className="pc-btn pc-btn-edit" onClick={() => onEdit(product.id)}>
                        <FaEdit /> Edit
                    </button>
                    <button className="pc-btn pc-btn-del" onClick={() => onDelete(product.id)}>
                        <FaTrashAlt /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
});

ProductCard.displayName = "ProductCard";
export default ProductCard;