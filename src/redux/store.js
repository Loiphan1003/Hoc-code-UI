import { configureStore } from "@reduxjs/toolkit";
import createTestSlice from "./createTestSlice";

const store = configureStore({
    reducer: {
        tests: createTestSlice.reducer
    }
})

export default store;