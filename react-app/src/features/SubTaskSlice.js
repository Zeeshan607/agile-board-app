import { createSlice, createAsyncThunk, TaskAbortError } from '@reduxjs/toolkit'
import CustomRequest from '../utils/customRequest.jsx';


export const fetchSubTasksByTaskId=createAsyncThunk('fetch/task/subTasks', async (task_id,{rejectWithValue})=>{

  try{
    const resp = await CustomRequest.get(
      `/dashboard/task/${task_id}/subtasks`
    );
    return await resp.data.subTasks;

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
  parent_task:'',
  list:[],
  status:'idle',
  errors:[],

}

const SubTaskSlice = createSlice({
  name: "subTasks",
  initialState,
  reducers: {
    setParentTask:(state, action)=>{
      state.parent_task=action.payload.task;
    },
    addNewSubTask:(state, action)=>{
      state.list.push(action.payload.subtask);
    },
    markSubTaskAsComplete:(state, action )=>{
        state.list.map(t=>{
          if(t.id=action.payload.subtask_id){
            t.is_completed=true;
          }
        })
    },
    markSubTaskAsInComplete:(state, action )=>{
      state.list.map(t=>{
        if(t.id=action.payload.subtask_id){
          t.is_completed=false;
        }
      })
    },
    
    
    
  },
  extraReducers(builder){
    builder.addCase(fetchSubTasksByTaskId.pending, (state, action)=>{
      state.status='pending';
    })
    .addCase(fetchSubTasksByTaskId.fulfilled, (state, action )=>{
        state.status='successfull';
        state.list=action.payload;

    })
    .addCase(fetchSubTasksByTaskId.rejected,(state, action)=>{
      state.status='rejected';
      state.errors.push(action.error.message)
    })
  }
});

export const {setParentTask, addNewSubTask, markSubTaskAsComplete, markSubTaskAsInComplete } = SubTaskSlice.actions
export const selectCurrentParentTask=(state)=>state.subTasks.parent_task;
export const selectSubTaskList=(state)=>state.subTasks.list;


export const subTaskMethods={
  createSubTask:(task_id, subTask)=> async(dispatch)  => {
      try{
        const resp= await CustomRequest.post(`/dashboard/subtask/store`, {'task_id':task_id,'description':subTask});
          if(resp.status==200){
            dispatch(addNewSubTask({"subtask": resp.data.subTask}));
            toast.sucess('Sub Task added successfully');
          }
      }catch(err){
          toast.error(err) ;
      }

  }

}

























export default SubTaskSlice.reducer