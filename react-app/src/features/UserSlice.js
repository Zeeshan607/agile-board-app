import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list:[]
}

const UserSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersList:(state, action)=>{
        state.list=action.payload.users;
    }
  }
});

export const {setUsersList} = UserSlice.actions;
export const selectUsersList=state=>state.users.list;

export default UserSlice.reducer