import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiUrl } from "../../../Config";
import axios from "axios";

export const createUserAsync=createAsyncThunk("usersignup", async (data) => {
    const result = await axios.post(`${ApiUrl}/user`, data)

    return result
})
export const loginUserAsync = createAsyncThunk("userlogin", async (data) => {
    const result = await axios.get(`${ApiUrl}/user?email=${data.email}&password=${data.password}`)
    return result
})
const initialState = {};

const userSlice = createSlice({
    name: "userlog",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createUserAsync.fulfilled, (state, action) => {
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
            })
    }
})

export default userSlice.reducer