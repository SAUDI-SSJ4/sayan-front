import { createSlice } from "@reduxjs/toolkit";

import Cookies from "js-cookie";

const initialState = {
  user: null,
  isAuthenticated: !!Cookies.get("student_token"),
  token: Cookies.get("student_token") || null,
  type: Cookies.get("type") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.access_token;
      state.type = action.payload.user.type;
      Cookies.set("student_token", action.payload.access_token, { expires: 1 / 24 });
      Cookies.set("type", action.payload.user.type, { expires: 1 / 24 });
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      Cookies.remove("student_token") ?? Cookies.remove("academy_token");
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
