import { createSlice } from "@reduxjs/toolkit";
import {
  __getComments,
  __addComment,
  __editComment,
  __deleteComment,
  __addRecomment,
  __editRecomment,
  __deleteRecomment,
} from "../async/comment";

const initialState = {
  comments: [],
  commentList: [],
  isFetching: false,
  errorMessage: null,
  editComment: true,
  addComment: true,
  delComment: true,
  delReComment: true,
  editReComment: true,
  addReComment: true,
};

const commentSlice = createSlice({
  name: "comment",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 댓글 조회하기
      .addCase(__getComments.fulfilled, (state, action) => {
        state.comments = [...action.payload.comments];
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__getComments.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__getComments.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      // 댓글 작성하기
      .addCase(__addComment.pending, (state, action) => {
        state.isFetching = true;
        state.addComment = false;
      })
      .addCase(__addComment.fulfilled, (state, action) => {
        state.isFetching = false;
        state.errorMessage = null;
        state.addComment = true;
      })
      .addCase(__addComment.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      // 대댓글 추가하기
      .addCase(__addRecomment.fulfilled, (state, action) => {
        state.isFetching = false;
        state.errorMessage = null;
        state.addReComment = true;
      })
      .addCase(__addRecomment.pending, (state, action) => {
        state.isFetching = true;
        state.addReComment = false;
      })
      .addCase(__addRecomment.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
        state.addReComment = true;
      })
      //댓글 수정하기
      .addCase(__editComment.pending, (state, action) => {
        state.editComment = false;
      })
      .addCase(__editComment.fulfilled, (state, action) => {
        state.editComment = true;
      })
      //댓글 삭제하기
      .addCase(__deleteComment.pending, (state, action) => {
        state.delComment = false;
      })
      .addCase(__deleteComment.fulfilled, (state, action) => {
        state.delComment = true;
      })
      //대댓글 삭제하기
      .addCase(__deleteRecomment.pending, (state, action) => {
        state.delReComment = false;
      })
      .addCase(__deleteRecomment.fulfilled, (state, action) => {
        state.delReComment = true;
      })
      //대댓글 수정하기
      .addCase(__editRecomment.pending, (state, action) => {
        state.editReComment = false;
      })
      .addCase(__editRecomment.fulfilled, (state, action) => {
        state.editReComment = true;
      });
  },
});

// // reducer dispatch하기 위해 export 하기
export const {} = commentSlice.actions;
export default commentSlice.reducer;
