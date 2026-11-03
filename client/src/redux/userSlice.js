
import { createSlice } from "@reduxjs/toolkit";

// Slice = Redux ka ek hissa jo ek cheez (yahan: user) ka data sambhalta hai
const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null, // logged-in user ka data (null = login nahi hai)
    loading: true,  // jab tak server se pata na chale ki user logged-in hai ya nahi
  },
  reducers: {
    // User save karne ke liye. Logout par null bhejte hain.
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.loading = false; // jawab aa gaya, ab loading khatam
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;