import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiUrl } from "../../../Config";

export const createCartAsync = createAsyncThunk("addtocart", async (data) => {
    const result = await axios.post(`${ApiUrl}/cart`, data)
    return result;
})
export const getCartDataAsync = createAsyncThunk("getSingleCartAsync", async (id) => {
    const result = await axios.get(`${ApiUrl}/cart`)
    return result.data;
})
export const getCartDatabyUseridAsync = createAsyncThunk("getCartDatabyUseridAsync", async (userid) => {
    const result = await axios.get(`${ApiUrl}/cart?userid=${userid}`)
    return result.data;
})



const initialState = {
    cartlist: {},
    usercardlist:[]
}
const cartSlice = createSlice({
    name: "cartproduct",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createCartAsync.fulfilled, (state, action) => {
            })
            .addCase(getCartDataAsync.fulfilled, (state, action) => {
                state.cartlist = action.payload
            })
            .addCase(getCartDatabyUseridAsync.fulfilled, (state, action) => {
                state.usercardlist = action.payload
            })
            .addCase(getCartDatabyUseridAsync.rejected, (state, action) => {
                state.usercardlist = []
            })
    }
})
export default cartSlice.reducer;