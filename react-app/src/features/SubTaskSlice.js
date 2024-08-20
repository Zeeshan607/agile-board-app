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
    updateSubTask:(state, action )=>{
      // const target_task= state.list.filter(task=> task.id==action.payload.subTask.id);
      // target_task[0].due_date= action.payload.due_date;
      state.list.map((t, index)=>{
        if(t.id== action.payload.subtask.id){
          state.list[index]=action.payload.subtask;
        }
      })
    },
    deleteSubTask:(state, action)=>{
        let  newList=state.list.filter(t=> t.id !== action.payload.subtask.id);
        state.list=newList;
    },
    markSubTaskAsComplete:(state, action )=>{
      const target_task= state.list.find(task=> task.id==action.payload.subtask_id);
      target_task.is_completed= true;
      state.list.map((t, index)=>{
        if(t.id== action.payload.subtask_id){
          state.list[index]=target_task;
        }
      })
    },
    markSubTaskAsInComplete:(state, action )=>{
      const target_task= state.list.find(task=> task.id==action.payload.subtask_id);
      target_task.is_completed= false;
      state.list.map((t, index)=>{
        if(t.id== action.payload.subtask_id){
          state.list[index]=target_task;
        }
      })
    },
    deleteAllSubTasks:(state,action)=>{
      state.list=[];
    }
    
    
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

export const {setParentTask, addNewSubTask, updateSubTask,deleteSubTask,deleteAllSubTasks, markSubTaskAsComplete, markSubTaskAsInComplete } = SubTaskSlice.actions
export const selectCurrentParentTask=(state)=>state.subTasks.parent_task;
export const selectSubTaskList=(state)=>state.subTasks.list;


export const subTaskMethods={
  createSubTask:(task_id, subTask)=> async(dispatch)  => {
      try{
        const resp= await CustomRequest.post(`/dashboard/subtask/store`, {'task_id':task_id,'description':subTask});
          if(resp.status==200){
            dispatch(addNewSubTask({"subtask": resp.data.subTask}));
            toast.success('Sub Task added successfully');
          }
      }catch(err){
          toast.error(err) ;
      }

  },
  updateSubTask:(subTask)=> async(dispatch)=>{
    try{
      const resp= await CustomRequest.patch(`/dashboard/subtask/${subTask.id}/update`, {'subTask':subTask});
        if(resp.status==200){
          dispatch(updateSubTask({"subtask": resp.data.subTask}));
          toast.success('Sub Task updated successfully');
        }
    }catch(err){
        toast.error(err) ;
    }
  },
  markAsComplete:(id)=>async(dispatch)=>{
    try{
      const resp= await CustomRequest.patch(`/dashboard/subtask/${id}/mark_as_complete`, {'is_completed':1});
        if(resp.status==200){
          dispatch(markSubTaskAsComplete({"subtask_id": resp.data.subTask.id}));
          toast.success('Sub Task marked as complete successfully');
        }
    }catch(err){
        toast.error(err) ;
    }


  },
  markAsInComplete:(id)=>async(dispatch)=>{
    try{
      const resp= await CustomRequest.patch(`/dashboard/subtask/${id}/mark_as_in_complete`,  {'is_completed':0});
        if(resp.status==200){
          dispatch(markSubTaskAsInComplete({"subtask_id": resp.data.subTask.id}));
          toast.success('Sub Task marked as in-complete successfully');
        }
    }catch(err){
        toast.error(err) ;
    }
  },
  delete:(id)=> async(dispatch)=>{
    try{
      const resp= await CustomRequest.delete(`/dashboard/subtask/${id}/delete`);
        if(resp.status==200){
          dispatch(deleteSubTask({"subtask": resp.data.subTask}));
          toast.success('Sub Task deleted successfully');
        }
    }catch(err){
        toast.error(err) ;
    }
  },
  deleteAllSubTasks:(parent_task_id)=> async (dispatch)=>{
    try{
      const resp= await CustomRequest.delete(`/dashboard/task/${parent_task_id}/subtasks/delete_all`);
        if(resp.status==200){
          dispatch(deleteAllSubTasks());
          toast.success('Sub Tasks list deleted successfully');
        }
    }catch(err){
        toast.error(err) ;
    }
  }

}

























export default SubTaskSlice.reducer