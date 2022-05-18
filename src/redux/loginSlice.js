import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'infomationUser',
    initialState: {
        isTeacher: false,
        isLogin: false
    },
    reducers: {
        loginIsTeacher: (state, action) => {
            state.isTeacher = action.payload;
        }
    }
})

export default loginSlice;