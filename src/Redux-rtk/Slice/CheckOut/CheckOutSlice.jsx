import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiUrl } from "../../../Config";


export const createOrderAsync = createAsyncThunk("createOrderAsync", async (data) => {
    const result = await axios.post(`${ApiUrl}/orders`, data)
    return result;
})
export const getOrderByUserIdAsync = createAsyncThunk("getOrderByUserIdAsync", async (userid) => {
    const result = await axios.get(`${ApiUrl}/orders?userid=${userid}`)
    return result.data;
})
export const deleteOrderByUserIdAsync = createAsyncThunk("deleteOrderByUserIdAsync", async (orderid) => {
    const result = await axios.delete(`${ApiUrl}/orders/${orderid}`)
    return result.data;
})

const initialState = {
    isloading:false,
    orderList: []
}
const checkOutSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrderAsync.fulfilled, (state, action) => {
            })
            .addCase(getOrderByUserIdAsync.pending, (state, action) => {
                state.isloading = true
            })
            .addCase(getOrderByUserIdAsync.fulfilled, (state, action) => {
                state.orderList = action.payload
                state.isloading = false
            })
            .addCase(getOrderByUserIdAsync.rejected, (state, action) => {
                state.orderList = []
                state.isloading = false
            })
            .addCase(deleteOrderByUserIdAsync.fulfilled, (state, action) => {
                
            })
    }
})
export default checkOutSlice.reducer;