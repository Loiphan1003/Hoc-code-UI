import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLogin: false
    },
    reducers: {
        login: (state, action) => {
            state.isLogin = action.payload;
        }
    }
})

export default loginSlice;