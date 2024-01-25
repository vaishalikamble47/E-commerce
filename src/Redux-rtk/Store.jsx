import { configureStore } from "@reduxjs/toolkit";
import AdminUserSlice from "./Slice/AdminSlice/AdminUserSlice";
import ProductSlice from "./Slice/ProductSlice/ProductSlice";
import userSlice from "./Slice/UserSlice/UserSlice";
import CartSlice from "./Slice/CartSlice/CartSlice";
import CheckOutSlice from "./Slice/CheckOut/CheckOutSlice";



export const store = configureStore({
    reducer: {
        adminUser: AdminUserSlice,
        products: ProductSlice,
        user: userSlice,
        cart: CartSlice,
        checkout:CheckOutSlice
    }
})