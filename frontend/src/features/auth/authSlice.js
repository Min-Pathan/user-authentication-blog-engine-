import { createSlice } from "@reduxjs/toolkit";

import {
  getStoredAuth,
} from "./authStorage.js";

const storedAuth = getStoredAuth();

const initialState = {
  user: storedAuth.user,
  token: storedAuth.token,

  isAuthenticated: Boolean(
    storedAuth.token &&
      storedAuth.user,
  ),
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setCredentials: (
      state,
      action,
    ) => {
      state.user =
        action.payload.user;

      state.token =
        action.payload.token;

      state.isAuthenticated = true;
    },

    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  setCredentials,
  clearCredentials,
} = authSlice.actions;

export default authSlice.reducer;