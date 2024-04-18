import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list:[]
}

const ProjectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjectsList:(state, action)=>{
        state.list=action.payload.projects;
    }
  }
});

export const {setProjectsList} = ProjectSlice.actions;
export const selectProjectList=state=>state.projects.list;
export default ProjectSlice.reducer