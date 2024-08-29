import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./loader";

 const store = configureStore({
    reducer:{loader:loaderSlice.reducer}
})

export default store;