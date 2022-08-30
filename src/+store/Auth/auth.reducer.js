import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  role: '',
  isLoading: false,
  loadingMessage: '',
  isLogged: false,
  error: false,
  isInit: false,
  token: '',
  loggedUser: {},
  loggedUserInfo: {},
};

export const authSlice = createSlice({
  name: 'AUTH',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setLoadingMessage(state, action) {
      state.loadingMessage = action.payload;
    },
    setIsLogged(state, action) {
      state.isLogged = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setToken(state, action) {
      state.token = `Token ${state.loggedUser.api_key}:${action.payload}`;
    },

    setUser(state, action) {
      state.user = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    setLoggedUser(state, action) {
      state.loggedUser = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    setLoggedInfo(state, action) {
      state.loggedUser = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    setIsInit(state, action) {
      state.isInit = action.payload;
    },
    setRole(state, action) {
      state.role = action.payload;
    },
    RESET(state) {
      Object.assign(state, initialState);
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
