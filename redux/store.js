import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import usersReducer from "./usersSlice";
import postsReducer from "./postSlice";
import categoryReducer from "./categorySlice";


const combinedReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  category: categoryReducer,
});

export const makeStore = () =>
  configureStore({
    reducer: combinedReducer,
  });

export const wrapper = createWrapper(makeStore);