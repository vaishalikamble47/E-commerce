import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiUrl } from "../../../Config";

export const addProductAsync = createAsyncThunk("addProductAsync", async (data) => {
    const result = await axios.post(`${ApiUrl}/products`, data)
    return result;
})

export const getProductAsync = createAsyncThunk("getProductAsync", async () => {
    const result = await axios.get(`${ApiUrl}/products`)
    return result.data;
})

export const filterProductCategoryAsync = createAsyncThunk("filterProductCategory", async (category) => {
    const result = await axios.get(`${ApiUrl}/products/?category=${category}`)
    return result.data;
})

export const getSingleProductAsync = createAsyncThunk("getSingleProductAsync", async (id) => {
    const result = await axios.get(`${ApiUrl}/products/${id}`)
    return result.data;
})



const initialState = {
    addProduct: {},
    productList: [],
    singleProduct: {}
}
const productSlice = createSlice({
    name: "Products",
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            if (state.productList) {
                const filteredProducts = state.productList.filter((product) =>
                  product.productname.toLowerCase().includes(action.payload.toLowerCase())
                );
                state.productList = filteredProducts;
              }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addProductAsync.fulfilled, (state, action) => {
                state.addProduct = action.payload
            })
            .addCase(getProductAsync.fulfilled, (state, action) => {
                state.productList = action.payload
            })
            .addCase(filterProductCategoryAsync.fulfilled, (state, action) => {
                state.productList = action.payload
            })
            .addCase(getSingleProductAsync.fulfilled, (state, action) => {
                state.singleProduct = action.payload
            })

    }
})
export const { setSearchTerm } = productSlice.actions;
export default productSlice.reducer;