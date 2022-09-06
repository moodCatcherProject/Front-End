import { api } from "../../shared/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//검색페이지에서 추천 게시물 조회하기
export const __getSearch = createAsyncThunk(
  "GET/POSTS",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get("");
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

//검색 결과창에서 조회하기
export const __getSearchResult = createAsyncThunk(
  "GET/RESULT",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get("");
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState = {
  search: false,
  recommendedPosts: {},
  searchResult: {},
};

//리듀서
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      //추천게시물 조회하기
      .addCase(__getSearch.fulfilled, (state, action) => {
        state.recommendedPosts = action.payload;
      })
      //검색 결과 보기
      .addCase(__getSearchResult.fulfilled, (state, action) => {
        state.searchResult = action.payload;
      }),
});

export const searchAction = searchSlice.actions;
export default searchSlice.reducer;