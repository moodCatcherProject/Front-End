import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { api } from "../../shared/api";
import { setCookie, removeCookie } from "../../shared/Cookie";

// 로그인
export const __login = createAsyncThunk("LOGIN", async (payload, thunkAPI) => {
  try {
    const response = await api.post("/auth/login", payload);
    window.location.href = response.data.url;
    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
});

//닉네임중복체크
export const __checkNickname = createAsyncThunk(
  "CHECKNICKNAME",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const response = await api.get(
        `/auth/checkNickname?nickname=${encodeURI(payload)}`
      );
      console.log(response);
      if (response.status === 200) {
        return true;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }
);

//성별 닉네임 나이
export const __detail = createAsyncThunk(
  "DETAIL",
  async (payload, thunkAPI) => {
    const response = await api.post("/auth/detail", payload);
    return response.data;
  }
);

//소셜 로그인
export const __socialLogin = createAsyncThunk(
  "SOCIALLOGIN",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get("/auth/kakao");
      console.log(response);
      thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      console.log(err);
      //hunkAPI.rejectWithValue(err);
    }
  }
);

//프로필 수정
export const __editProfile = createAsyncThunk(
  "EDITPROFILE",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const response = await api.put("/user", payload);
      console.log(response);
      return thunkAPI.fulfillWithValue(response.data.userStatus);
    } catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  }
);

//회원탈퇴
export const __delUser = createAsyncThunk(
  "DELUSER",
  async (payload, thunkAPI) => {
    try {
      const response = await api.delete("/user/signout");
      return alert("무드캡처를 퇴장하셨습니다.");
    } catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  }
);

// 유저 정보 불러오기 pjs
export const __userInfo = createAsyncThunk(
  "user/userInfo",
  async (data, thunkAPI) => {
    const response = await api.get(`/user`);
    console.log(response);
    if (
      response.data.message === "fail" &&
      response.data.error === "all tokens are expired"
    ) {
      removeCookie("osid");
      removeCookie("_osidRe");
      alert("로그인기간이 만료되었습니다. 다시 로그인하시겠어요?");
      // window.location.href = "/login";
    }
    return response.data;
  }
);

//유저 정보 조회
export const __getUser = createAsyncThunk(
  "GET/USER",
  async (payload, thunkAPI) => {
    const response = await api.get(`/user/${payload}`);
    return response.data.userStatus;
  }
);

//프로필 아이콘 바꾸기
export const __patchUser = createAsyncThunk(
  "PATCH/USER",
  async (payload, thunkAPI) => {
    const response = await api.patch(`/users`, payload);
    return response.data.userStatus;
  }
);
const initialState = {
  user: {
    result: null,
  },
  checkNickname: false,
  social: null,
  loading: false,
  changeUser: null,
  exist: false,
  userStatus: {},
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    //닉네임이 바뀔 때마다 state 변경
    changeNickname: (state, payload) => {
      state.checkNickname = false;
    },
  },
  extraReducers: (builder) =>
    builder
      //로그인
      .addCase(__login.fulfilled, (state, action) => {
        state.loading = false;
        state.exist = action.payload;
        alert("무드캐처로 입장하셨습니다!");
      })
      .addCase(__login.rejected, (state, action) => {
        state.loading = false;
        state.exist = action.payload;
        alert("이메일이나 비밀번호를 다시 확인해주세요.");
      })
      //성별과 나이 닉네임
      .addCase(__detail.fulfilled, (state, action) => {
        state.user.detail = action.payload;
      })
      //소셜로그인
      .addCase(__socialLogin.fulfilled, (state, action) => {
        state.social = action.payload.message;
        alert("무드캐처로 입장하셨습니다!");
      })
      //닉네임 중복확인
      .addCase(__checkNickname.fulfilled, (state, action) => {
        state.checkNickname = action.payload;
      })
      .addCase(__checkNickname.rejected, (state, action) => {
        state.checkNickname = action.payload;
      })
      //프로필 수정
      .addCase(__editProfile.fulfilled, (state, action) => {
        state.changeUser = action.payload;
      })
      .addCase(__editProfile.rejected, (state, action) => {
        state.changeUser = action.payload;
      })
      //회원탈퇴
      .addCase(__delUser.fulfilled, (state, action) => {})
      //유저정보조회
      .addCase(__getUser.fulfilled, (state, action) => {
        state.userStatus = action.payload;
      })
      //프로필 아이콘 바꾸기
      .addCase(__patchUser.fulfilled, (state, action) => {
        state.userStatus = action.payload;
      }),
});

// // reducer dispatch하기 위해 export 하기
export const { changeNickname } = loginSlice.actions;
export default loginSlice.reducer;
