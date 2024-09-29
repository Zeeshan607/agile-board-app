import { createSlice } from "@reduxjs/toolkit";
import CustomRequest from "../utils/customRequest";
import { handleErrors } from "../utils/helpers";


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
    },
    // updateTourStatus:(state,action)=>{
    //   state.user.is_tour_done=action.payload.status
    // }

  },
});

export const { setUserLoginStatus, setAuthenticatedUser, setUserLogoutStatus, setUserLastActiveWorkspace,updateProfile,updateTourStatus } =UserAuthSlice.actions;

export const selectAuthenticatedUser = (state) => state.userAuth.user;
export const selectAuthToken = (state) => state.userAuth.token;

export default UserAuthSlice.reducer;

// export const authUserMethod={
//           setTourStatus:(status)=>async(dispatch)=>{

//                 try{
//                   const resp= CustomRequest.post('/dashboard/update_user_tour_status', {"status":status});
//                   if(resp.status==200){
//                       dispatch(updateTourStatus({"status":status}));
//                   }
//                 }catch(err){
//                     handleErrors(err);
//                 }

//           }


// };