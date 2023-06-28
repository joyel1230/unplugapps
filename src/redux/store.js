import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "./slices/headerSlice";
import detailSlice from "./slices/datailSlice";

const store = configureStore({
    reducer:{
        header:headerSlice,
        detail:detailSlice
    }
});

export default store;
