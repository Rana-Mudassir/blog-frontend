import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchComments = createAsyncThunk('comments/fetchComments', async (postId) => {
  const response = await axios.get(`http://localhost:5000/api/comments/${postId}`);
  return response.data;
});

export const addComment = createAsyncThunk('comments/addComment', async (commentData) => {
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post('http://localhost:5000/api/comments', commentData, config);
  return response.data;
});

export const deleteComment = createAsyncThunk('comments/deleteComment', async (id) => {
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  await axios.delete(`http://localhost:5000/api/comments/${id}`, config);
  return id;
});

export const updateComment = createAsyncThunk('comments/updateComment', async ({ id, content }) => {
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.put(`http://localhost:5000/api/comments/${id}`, { content }, config);
  return response.data;
});

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(comment => comment._id !== action.payload);
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex(comment => comment._id === action.payload._id);
        state.comments[index] = action.payload;
      });
  },
});

export default commentSlice.reducer;
