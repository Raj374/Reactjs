import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/homePage";
import NoFound from "../pages/noFoundPage";
import AddProductPage from "../pages/addProductPage";
import ProductPage from "../pages/ProductPage";
import EditProductPage from "../pages/EditProductPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: HomePage,
            },
            {
                path: "addProduct",
                Component: AddProductPage,
            },
            {
                path: "product",
                Component: ProductPage,
            },
            {
                path: "edit-product/:productId",
                Component: EditProductPage,
            },
            {
                path: "product-detail/:productId",
                Component: ProductDetailPage,
            },
            {
                path: "cart",
                Component: CartPage,
            },
            {
                path: "*",
                Component: NoFound,
            },
        ],
    },
]);