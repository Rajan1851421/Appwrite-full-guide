import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  IsloggedIn: false,
  status: "",
  session: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.IsloggedIn = true;
      state.status = "Login sucessfully";
      
    },
    logout: (state) => {
      state.IsloggedIn = false;
      state.status = "Logout Successfully";
      state.session = null;
    },
    session: (state) => {
      state.session = 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, session } = authSlice.actions;

export default authSlice.reducer;
