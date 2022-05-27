import { configureStore } from "@reduxjs/toolkit";
import createTestSlice from "./createTestSlice";
import doTestSlice from "./doTestSlice";

const store = configureStore({
    reducer: {
        createTest: createTestSlice.reducer,
        doTest: doTestSlice.reducer
    }
})

export default store;