import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const apiLogin = async (credentials) => {
  return axios.post("http://localhost:5001/users", credentials);
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiLogin(credentials);
      console.log("API response for login:", response.data);
      return response.data;
    } catch (error) {
      console.error("API login error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to log in. Please try again."
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    register: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to log in";
      });
  },
});

export const { logout, register } = authSlice.actions;

export default authSlice.reducer;
