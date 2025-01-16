import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookReducer";
import authReducer from "./AuthSlice";
import cartReducer from "./CartSlice";

const store = configureStore({
  reducer: {
    books: bookReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;
