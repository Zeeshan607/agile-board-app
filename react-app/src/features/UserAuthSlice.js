import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  token: "",
};

const UserAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setUserLoginStatus: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;

    },
    setUserLogoutStatus: (state, action) => {
      state.user = "";
      state.token = "";
    },
  },
});

export const { setUserLoginStatus, setAuthenticatedUser, setUserLogoutStatus } =UserAuthSlice.actions;

export const selectAuthenticatedUser = state => state.userAuth.user;
export const selectAuthToken = state=> state.userAuth.token;


export default UserAuthSlice.reducer;
