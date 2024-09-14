import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import CustomRequest from '../utils/customRequest';
import {setActiveWorkspace,  removeWorkspaceFromSharedWsList, wsMethods} from './workspaceSlice.js'
import { Navigate } from 'react-router-dom';
import { handleErrors } from '../utils/helpers.js';

export const fetchMembers=createAsyncThunk( "workspace/members" , async (wsId, { rejectWithValue})=>{

    try{
        const resp= await CustomRequest.get(`dashboard/workspace/${wsId}/members`);
        return await resp.data.workspaceWithMembers;
  
    }catch(err){
      if (err.response) {
        // The server responded with a status code that falls out of the range of 2xx
        return rejectWithValue(err.response.data);
      } else if (err.request) {
        // The request was made but no response was received
        return rejectWithValue('No response from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log(err.message)
        return rejectWithValue('Request error:'+err.message);
      }
    }
  
  
  });
const initialState = {
    workspaceWithUserAccess:{},
    status:"idle",
    errors:[]
}

const WorkspaceMembers = createSlice({
  name: 'workspaceMembers',
  initialState,
  reducers: {
    removeUserFromUsersWithAcess:(state, action )=>{
    const newUserWithAccessArray= state.workspaceWithUserAccess.usersWithAccess.filter(user=> user.id!==action.payload.user_id);
    const newObj={...state.workspaceWithUserAccess,usersWithAccess:newUserWithAccessArray };
    state.workspaceWithUserAccess=newObj;

    },
    clearErrors: (state) => {
      state.errors = []; // Clear errors from state
    }
  
    
  },
  extraReducers(builder){
    builder
        .addCase(fetchMembers.pending, (state, action)=>{
          state.status="loading";
      })
        .addCase(fetchMembers.fulfilled, (state, action )=>{
            state.status="success"
            state.workspaceWithUserAccess=action.payload;
      
        })
        .addCase(fetchMembers.rejected, (state, action)=>{
            state.status="failed";
            state.errors.push(action.error.message);
                // console.log(action.error)
      })


}
});

export const {removeUserFromUsersWithAcess,clearErrors} = WorkspaceMembers.actions;
export const selectWorkspaceMembers= state=>state.workspaceMembers.workspaceWithUserAccess;

export default WorkspaceMembers.reducer



export const wsWithMemberMethods={
  userLeavingWorkspace:(user_id, ws_id)=> async(dispatch, getState)=>{

    try{

      const resp =await CustomRequest.post('/dashboard/user_leaving_workspace', {"user_id":user_id,"workspace_id":ws_id});
      if(resp.status===200){
        dispatch(removeUserFromUsersWithAcess({"user_id":user_id,"workspace_id":ws_id}));
        dispatch(wsMethods.switchWorkspace("FROM_WORKSPACE_LEAVE",resp.data.user_created_latest_workspace.id));
        dispatch(removeWorkspaceFromSharedWsList({'workspace_id':ws_id}));

        toast.success('Workspace Access removed sucessfully');
      }

    }catch(err){
      // console.log(err);
      // toast.error(err);
      handleErrors(err);
    }


  }

}