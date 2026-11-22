import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },

    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    },

    setAuthError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setCredentials,
  logout,
  setAuthLoading,
  setAuthError,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;
