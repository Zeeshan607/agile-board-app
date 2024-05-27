import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import CustomRequest from '../utils/customRequest.jsx';

export const fetchTasks=createAsyncThunk('fetch/board/tasks', async (boardSlug,{rejectWithValue})=>{

        try{
          const resp = await CustomRequest.get(
            `/dashboard/board/${boardSlug}/tasks`
          );
          return await resp.data.tasks;

        }catch(err){
          if (err.response) {
            // The server responded with a status code that falls out of the range of 2xx
            return rejectWithValue(err.response.data);
          } else if (err.request) {
            // The request was made but no response was received
            return rejectWithValue('No response from server');
          } else {
            // Something happened in setting up the request that triggered an Error
            return rejectWithValue('Request error:' + err.response.data.msg);
          }
        }
                
})


const initialState = {
    list:[],
    status:"idle",
    errors:[]
}

const TaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
        setTasksList:(state, action)=>{
            state.list=action.payload.tasks;
        }

  },
  extraReducers(builder){
    builder.addCase(fetchTasks.pending, (state, action)=>{
          state.status="pending";
    })
    .addCase(fetchTasks.fulfilled, (state, action)=>{
      state.list=action.payload;
      state.status="success";
    })
    .addCase(fetchTasks.rejected, (state, action)=>{
      state.status="failed";
      state.errors.push(action.error.message)
    })
}
});

export const {setTasksList} = TaskSlice.actions;
export const selectTasks=state=>state.tasks.list;

export default TaskSlice.reducer