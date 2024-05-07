import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list:[],
    active:{},
}

const workspace = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
        setWorkspaceList:(state, action)=>{
            state.list=action.payload.workspaces;
        },
        setActiveWorkspace:(state, action)=>{
            state.active=action.payload.workspace;
        }
  }
});

export const {setActiveWorkspace, setWorkspaceList} = workspace.actions

export const selectActiveWorkspace=state=>state.workspace.active;
export const selectWorkspaceList=state=>state.workspace.list;


export default workspace.reducer