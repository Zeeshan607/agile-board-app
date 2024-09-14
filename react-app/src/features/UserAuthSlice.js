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
    setUserLastActiveWorkspace:(state, action)=>{
      state.user.last_active_workspace=action.payload.wsId;
    },
    updateProfile:(state, action)=>{
      state.user.image=action.payload.imagePath;
    }
  },
});

export const { setUserLoginStatus, setAuthenticatedUser, setUserLogoutStatus, setUserLastActiveWorkspace,updateProfile } =UserAuthSlice.actions;

export const selectAuthenticatedUser = (state) => state.userAuth.user;
export const selectAuthToken = (state) => state.userAuth.token;


export default UserAuthSlice.reducer;
