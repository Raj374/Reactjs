export interface cartItemType {
    id: string;
    productId: string;
    p_name: string;
    p_price: number;
    p_image: string;
    p_category: string;
    quantity: number;
}

export interface productType {
    p_name: string;
    p_price: number;
    p_stock: number;
    p_image: string;
    p_category: string;
    p_description: string;
}

export interface productFetchType {
    id: string;
    p_name: string;
    p_price: number;
    p_stock: number;
    p_image: string;
    p_category: string;
    p_description: string;
}