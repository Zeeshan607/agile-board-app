import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import CustomRequest from '../utils/customRequest';
import { setBoardsList } from './BoardSlice';





export const fetchWorkspaces=createAsyncThunk('dashboard/workspaces',async(thunkAPI)=>{
    const resp = await CustomRequest.get(`/dashboard/workspaces`);
            return await resp.data;
})


const initialState = {
    list:[],
    active:{},
    activeHasBoards:false,
    status:"idle",
    error:[]

}

const workspace = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
        setWorkspaceList:(state, action)=>{
            state.list=action.payload.workspaces;
        },
        setActiveWorkspace:(state, action)=>{
            const active=state.list.workspace.owned.filter(ws=> ws.is_active==true)??state.list.workspace.shared.filter(ws=> ws.is_active==true);
            state.active=active[0];
        }
  },
  extraReducers(builder){
        builder
        .addCase(fetchWorkspaces.pending, (state, action)=>{
            state.status="loading";
        })
        .addCase(fetchWorkspaces.fulfilled, (state, action )=>{
            state.status="success"
            state.list =action.payload;
            const active=state.list.workspace.owned.filter(ws=> ws.is_active==true)??state.list.workspace.shared.filter(ws=> ws.is_active==true);
            state.active=active[0];
            state.activeHasBoards =state.active.boards?.length > 0;
        })
        .addCase(fetchWorkspaces.rejected, (state, action)=>{
            state.status="failed";
            state.error= action.error.message;
                console.log(action.error)
        })
  }
});

export const {setActiveWorkspace, setWorkspaceList} = workspace.actions

export const selectActiveWorkspace=state=>state.workspace.active;
export const selectWorkspaceList=state=>state.workspace.list;
export const selectWorkspaceErrors=state=>state.workspace.error;


export default workspace.reducer