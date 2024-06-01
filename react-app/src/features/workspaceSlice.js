import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import CustomRequest from '../utils/customRequest.jsx';




// Utility function to add delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// AsyncThunk with retry mechanism
export const fetchWorkspaces=createAsyncThunk('dashboard/workspaces',async(_,{rejectWithValue})=>{

    const MAX_RETRIES = 3;
    const INITIAL_DELAY = 1000; // 1 second
    let attempt = 0;

    while (attempt < MAX_RETRIES) {
    try{
        // console.log(`Attempt ${attempt + 1}: Fetching workspaces...`);

        const resp = await CustomRequest.get(`/dashboard/workspaces`);
        return await resp.data;

    }catch(err){
        if (err.code === 'ECONNREFUSED' || (err.response && err.response.status === 500)) {
            attempt++;
            if (attempt < MAX_RETRIES) {
              const delayTime = INITIAL_DELAY * Math.pow(2, attempt); // Exponential backoff
            //   console.error(`Connection refused, retrying in ${delayTime / 1000} seconds...`);
              await delay(delayTime);
            } else {
            //   console.error('Max retries reached. Giving up.');
              return rejectWithValue('Server is not ready. Please try again later.');
            }



        }else{
            // original error handling
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
      
    }
    }
});



const initialState = {
    list:[],
    active:{},
    activeHasBoards:false,
    members:[],
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
            state.error.push(action.error.message);
                console.log(action.error)
        })



  }
});

export const {setActiveWorkspace, setWorkspaceList} = workspace.actions

export const selectActiveWorkspace=state=>state.workspace.active;
export const selectWorkspaceList=state=>state.workspace.list;
export const selectWorkspaceErrors=state=>state.workspace.error;


export default workspace.reducer