import type { cartItemType, productFetchType, productType } from "../utils/global";

const productURL = "http://localhost:3000/product";
const cartURL = "http://localhost:3000/cart";

export const addProduct = async (body: productType) => {
    try {
        const res = await fetch(productURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        return res.ok;
    } catch {
        return false;
    }
};

export const fetchAllProducts = async (): Promise<productFetchType[]> => {
    try {
        const res = await fetch(productURL);
        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
};

export const deleteProduct = async (id: string) => {
    try {
        const res = await fetch(`${productURL}/${id}`, { method: "DELETE" });
        return res.ok;
    } catch {
        return false;
    }
};

export const fetchSingleProduct = async (id: string): Promise<productFetchType | null> => {
    try {
        const res = await fetch(`${productURL}/${id}`);
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
};

export const updateProduct = async (body: productFetchType) => {
    try {
        const res = await fetch(`${productURL}/${body.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        return res.ok;
    } catch {
        return false;
    }
};

// ── Cart APIs ──
export const fetchCart = async (): Promise<cartItemType[]> => {
    try {
        const res = await fetch(cartURL);
        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
};

export const addToCart = async (item: Omit<cartItemType, "id">) => {
    try {
        const res = await fetch(cartURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
        });
        return res.ok;
    } catch {
        return false;
    }
};

export const updateCartItem = async (item: cartItemType) => {
    try {
        const res = await fetch(`${cartURL}/${item.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantity: item.quantity }),
        });
        return res.ok;
    } catch {
        return false;
    }
};

export const removeFromCart = async (id: string) => {
    try {
        const res = await fetch(`${cartURL}/${id}`, { method: "DELETE" });
        return res.ok;
    } catch {
        return false;
    }
};

export const clearCart = async (cartItems: cartItemType[]) => {
    try {
        await Promise.all(cartItems.map((item) => removeFromCart(item.id)));
    } catch {
        // silent fail
    }
};