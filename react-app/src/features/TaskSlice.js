import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list:[],
}

const TaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
        setTasksList:(state, action)=>{
            state.list=action.payload.tasks;
        }

  }
});

export const {setTasksList} = TaskSlice.actions;
export const selectTasks=state=>state.tasks.list;

export default TaskSlice.reducer