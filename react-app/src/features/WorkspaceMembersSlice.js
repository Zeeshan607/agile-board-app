import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import CustomRequest from '../utils/customRequest';

export const fetchMembers=createAsyncThunk( "workspace/members" , async (wsId, { rejectWithValue})=>{

    try{
        const resp= await CustomRequest.get(`dashboard/workspace/${wsId}/members`);
        return await resp.data.members;
  
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
    members:[],
    status:"idle",
    error:[]
}

const WorkspaceMembers = createSlice({
  name: 'workspaceMembers',
  initialState,
  reducers: {},
  extraReducers(builder){
    builder
        .addCase(fetchMembers.pending, (state, action)=>{
          state.status="loading";
      })
        .addCase(fetchMembers.fulfilled, (state, action )=>{
            state.status="success"
            state.members=action.payload;
      
        })
        .addCase(fetchMembers.rejected, (state, action)=>{
            state.status="failed";
            state.error.push(action.error.message);
                console.log(action.error)
      })


}
});

export const {} = WorkspaceMembers.actions

export default WorkspaceMembers.reducer