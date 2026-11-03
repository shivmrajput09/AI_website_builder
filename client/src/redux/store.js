import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

// Store = poori app ke global data ka ghar
export const store = configureStore({
  reducer: {
    user: userReducer, // state.user ke andar userSlice ka data rahega
  },
});