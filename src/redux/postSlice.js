import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks for CRUD operations
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('http://localhost:5000/api/posts');
  return response.data;
});

// Async thunk for creating a post with image upload
export const createPost = createAsyncThunk('posts/createPost', async (postData, { rejectWithValue }) => {

  const token = localStorage.getItem('token');

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`, // Attach the token
    },
  };

  try {
    // postData will include both text and image
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    formData.append('tags', postData.tags);
    if (postData.image) {
      formData.append('image', postData.image); // Append the image file
    }

    const response = await axios.post('http://localhost:5000/api/posts', formData, config
    );

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || 'Error creating post');
  }
});

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async ({id}, thunkAPI) => {
  const response = await axios.put(`http://localhost:5000/api/posts/${id}`);
  return response.data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, updatedPost }, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`http://localhost:5000/api/posts/${id}`, updatedPost, config);
  return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.delete(`http://localhost:5000/api/posts/${id}`, config);
  return id;
});

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((post) => post._id === action.payload._id);
        state.posts[index] = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      });
  },
});

export default postSlice.reducer;
