import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (page = 1) => {
  const response = await axios.get(`https://blog-backend-y38r.onrender.com/api/posts?page=${page}`);
  return response.data;
});

export const createPost = createAsyncThunk('posts/createPost', async (postData, { rejectWithValue }) => {

  const token = localStorage.getItem('token');

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`, 
    },
  };

  try {
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    formData.append('categories', postData.categories);
    if (postData.image) {
      formData.append('image', postData.image);
    }

    const response = await axios.post('https://blog-backend-y38r.onrender.com/api/posts', formData, config
    );

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || 'Error creating post');
  }
});

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://blog-backend-y38r.onrender.com/api/posts/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || 'Error fetching post');
  }
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, updatedPost }, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  console.log("token", token)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.put(`https://blog-backend-y38r.onrender.com/api/posts/${id}`, updatedPost, config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      status: error.response?.status,
      message: error.response?.data.message || error.message,
    });
  }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    await axios.delete(`https://blog-backend-y38r.onrender.com/api/posts/${id}`, config);
    return id;
  }
  catch (error) {
    return thunkAPI.rejectWithValue({
      status: error.response?.status,
      message: error.response?.data.message || error.message,
    });
  }
});

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    post: null,
    totalPages : 0,
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
        state.totalPages = action.payload.totalPages;
        state.posts = action.payload.posts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; 
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
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
