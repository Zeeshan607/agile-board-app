import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const fetchTaskSubTasks=createAsyncThunk('dashboard/task/subTask',async(task_id,{rejectWithValue})=>{

    try{
        const resp = await CustomRequest.get(`/dashboard/task/${task_id}/subtasks`);
        return await resp.data.subtasks;
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
        errors:[],
}

const TaskDiscussionSlice = createSlice({
  name: 'taskDiscussions',
  initialState,
  reducers: {
            
  },
  extraReducers(builder){
    builder.addCase(fetchTaskSubTasks.pending,(state, action)=>{
            state.status='pending';
    })
    .addCase(fetchTaskSubTasks.fulfilled,(state, action )=>{
        state.status='success';
        state.list=action.payload;
    })
    .addCase(fetchTaskSubTasks.rejected,(state, action )=>{
        state.status='failed';
        state.errors.push(action.error.message)
    })
  }
});

export const {} = TaskDiscussionSlice.actions
export const selectComments=(state)=>state.taskDiscussions.list;

export default TaskDiscussionSlice.reducer