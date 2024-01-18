import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiUrl } from "../../../Config";
import axios from "axios";

export const createAdminAsync = createAsyncThunk("adminsignup", async (data) => {
    const result = await axios.post(`${ApiUrl}/AdminUser`, data)

    return result
})

export const loginAdminAsync = createAsyncThunk("adminlogin", async (data) => {
    const result = await axios.get(`${ApiUrl}/AdminUser?email=${data.email}&password=${data.password}`)
    return result
})

const initialState = {}

const adminSlice = createSlice({
    name: "adminUser",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createAdminAsync.fulfilled, (state, action) => {
            })
            .addCase(loginAdminAsync.fulfilled, (state, action) => {
            })
    
    }
})

export default adminSlice.reducer