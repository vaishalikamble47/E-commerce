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
    isLoading:false,
    addProduct: {},
    productList: [],
    singleProduct: {},
    filterList:[]
}
const productSlice = createSlice({
    name: "Products",
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            if (state.productList && action.payload) {
                const filteredProducts = state.filterList.filter((product) =>
                  product.productname.toLowerCase().includes(action.payload.toLowerCase())
                );
                state.productList = filteredProducts;
              }else{
                state.productList=state.filterList
              }
        },
        filterByPrice:(state,action)=>{
            if (action.payload=="low") {
                const sortProductByPrice = state.filterList.sort((a,b)=>parseFloat(a.price) - parseFloat(b.price))
                state.productList = sortProductByPrice;   
            }else if (action.payload=="high") {
                const sortData = state.filterList.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
                state.productList = sortData; 
            } 
       
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addProductAsync.fulfilled, (state, action) => {
                state.addProduct = action.payload
            })
            .addCase(getProductAsync.pending, (state, action) => {
                state.isLoading =true
            })
            .addCase(getProductAsync.fulfilled, (state, action) => {
                state.productList = action.payload
                state.filterList = action.payload
                state.isLoading = false
            })
            .addCase(getProductAsync.rejected, (state, action) => {
                state.isLoading = false
            })
            .addCase(filterProductCategoryAsync.fulfilled, (state, action) => {
                state.productList = action.payload
                state.filterList = action.payload
            })
            .addCase(getSingleProductAsync.fulfilled, (state, action) => {
                state.singleProduct = action.payload
            })

    }
})
export const { setSearchTerm } = productSlice.actions;
export const { filterByPrice } = productSlice.actions;
export default productSlice.reducer;