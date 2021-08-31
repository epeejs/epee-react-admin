import type { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAuthInfo, getUserInfo } from 'src/services/user';

export interface AuthInfo {
  code: string;
  name: string;
}
export type User = Record<string, any>;
export type AuthType = Record<string, AuthInfo[]>;

export interface LoginState {
  currAuth: AuthType;
  userInfo: User;
  loading: boolean;
}

const initialState: LoginState = {
  currAuth: {},
  userInfo: {},
  loading: false,
};

export const fetchAuthInfo = createAsyncThunk<AuthType>('login/fetchAuthInfo', () => {
  return getAuthInfo();
});

export const fetchUserInfo = createAsyncThunk<User>('login/fetchUserInfo', async (__, API) => {
  const userInfo = await getUserInfo();

  await API.dispatch(fetchAuthInfo());

  return userInfo;
});

const setAuthInfo: CaseReducer<LoginState, PayloadAction<AuthType>> = (state, action) => {
  state.currAuth = action.payload;
};
const setUser: CaseReducer<LoginState, PayloadAction<User>> = (state, action) => {
  state.userInfo = action.payload;
  state.loading = false;
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setAuthInfo,
    setUser,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserInfo.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchAuthInfo.fulfilled, setAuthInfo);
    builder.addCase(fetchUserInfo.fulfilled, setUser);
  },
});
