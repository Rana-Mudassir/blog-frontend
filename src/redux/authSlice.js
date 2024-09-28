import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks for login and registration
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:4000/api/auth/login', credentials);
    localStorage.setItem('token', response?.data?.token);
    return response?.data;
  } catch (error) {
    return error;
    // return thunkAPI.rejectWithValue({
    //   status: error.response?.status,
    //   message: error.response?.data.message || error.message,
    // });
  }
});

export const registerUser = createAsyncThunk('auth/registerUser', async (userData, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:4000/api/auth/register', userData);
    localStorage.setItem('token', response?.data?.token);
    return response?.data;
  } catch (error) {
      return error;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('token'), // Check if user is authenticated based on token
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false; // Set authenticated state to false on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload?.token;
        state.isAuthenticated = true; // Set authenticated state to true on successful login
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        state.isAuthenticated = true; // Set authenticated state to true on successful registration
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
