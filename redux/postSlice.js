import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

const origin =
  typeof window !== "undefined" && window.location.origin
    ? window.location.origin
    : "";

export const createPost = createAsyncThunk(
  "posts/create",
  async (post, { rejectWithValue,getState, dispatch }) => {
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    const newPost = {...post}
    try {
      console.log(post)
      const { data } = await axios.post(`${origin}/api/post`,newPost,config);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const updatePostAction = createAsyncThunk(
  "posts/update",
  async (postData, { rejectWithValue,getState, dispatch }) => {
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    const {id,post} = postData
    try {
      console.log(post)
      const { data } = await axios.put(`${origin}/api/post/edit/${id}`,post,config);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const allPosts = createAsyncThunk(
  "posts/all",
  async (_, { rejectWithValue, dispatch }) => {

    //http call
    try {
      const { data } = await axios.get(`${origin}/api/test`);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const FilteredPosts = createAsyncThunk(
  "posts/byCategory",
  async (category, { rejectWithValue, dispatch }) => {

    //http call
    try {
      console.log(category)
      let link;
      if(category) {
        link = `${origin}/api/post/category/${category}`
      } else {
        link = `${origin}/api/post`
      }
      const { data } = await axios.get(link);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const getPostDetails = createAsyncThunk(
  "posts/post",
  async (id, { rejectWithValue, dispatch }) => {

    //http call
    try {
      const { data } = await axios.get(`${origin}/api/post/${id}`);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);


//get user from local storage and place into store
//slices
const usersSlices = createSlice({
  name: "posts",
  initialState: {
    posts:[],
    postDetails:{},
    isCreated:false,
    isDeleted:false,
    isUpdated:false,
  },
  reducers: {
    reset: (state) => {
      state.appErr = null;
      state.serverErr = null;
      state.isCreated = false;
      state.isDeleted = false;
      state.isUpdated = false;
    },
  },
  extraReducers: (builder) => {
    //create
    builder.addCase(createPost.pending, (state, action) => {
      state.loading = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.loading = false;
      state.isCreated = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //create
    builder.addCase(allPosts.pending, (state, action) => {
      state.loading = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(allPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload?.posts;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(allPosts.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // post details
    builder.addCase(getPostDetails.pending, (state, action) => {
      state.loading = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(getPostDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.postDetails = action.payload?.post;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(getPostDetails.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // update
    builder.addCase(updatePostAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      const updatedPosts = state?.posts?.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.loading = false;
      state.posts = updatedPosts;
      state.isUpdated = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(updatePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // update
    builder.addCase(FilteredPosts.pending, (state, action) => {
      state.loading = true;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(FilteredPosts.fulfilled, (state, action) => {
      console.log("Redux fulfulled", action.payload)
      state.posts = action.payload.posts;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(FilteredPosts.rejected, (state, action) => {
      console.log("Redux rej", action.payload)
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export const { reset } = usersSlices.actions;

export default usersSlices.reducer;
