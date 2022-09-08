import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import { api } from "../../shared/api";

// 인기 게시물 조회
export const __getHotPosts = createAsyncThunk(
  "GET/HOTPOST",
  async (data, thunkAPI) => {
    const response = await api.get(`/posts/popular`);
    return response.data;
  }
);

// 게시물 전체 조회(메인페이지)
export const __getMainAllPosts = createAsyncThunk(
  "GET/MAINALLPOSTS",
  async (data, thunkAPI) => {
    const response = await api.get(`/post?page=${data}&count=${data}`);
    return response.data;
  }
);

const rankSlice = createSlice({
  name: "rank",
  initialState: {
    hotPosts: [],
    allPosts: [],
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      // 인기 게시물 조회
      .addCase(__getHotPosts.fulfilled, (state, action) => {
        state.hotPosts = action.payload;
      })
      // 게시물 전체 조회(메인페이지)
      .addCase(__getMainAllPosts.fulfilled, (state, action) => {
        state.allPosts = action.payload;
      }),
});

export const {} = rankSlice.actions;
export default rankSlice.reducer;

const rank_Infinity = (state) => state.rank.allPosts;

export const InfinityRank = createSelector(rank_Infinity, (rank_Infinity) => {
  return rank_Infinity;
});
