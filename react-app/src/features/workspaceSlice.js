import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import CustomRequest from '../utils/customRequest.jsx';
import { produce } from 'immer';
import { modalMethods } from './modalSlice.js';
import { setUserLastActiveWorkspace } from "../features/UserAuthSlice.js";


// Utility function to add delay
// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// AsyncThunk with retry mechanism
// export const fetchWorkspaces=createAsyncThunk('dashboard/workspaces',async(_,{rejectWithValue})=>{

//     const MAX_RETRIES = 3;
//     const INITIAL_DELAY = 1000; // 1 second
//     let attempt = 0;

//     while (attempt < MAX_RETRIES) {
//     try{
//         // console.log(`Attempt ${attempt + 1}: Fetching workspaces...`);

//         const resp = await CustomRequest.get(`/dashboard/workspaces`);
//         return await resp.data;

//     }catch(err){
//         if (err.code === 'ECONNREFUSED' || (err.response && err.response.status === 500)) {
//             attempt++;
//             if (attempt < MAX_RETRIES) {
//               const delayTime = INITIAL_DELAY * Math.pow(2, attempt); // Exponential backoff
//             //   console.error(`Connection refused, retrying in ${delayTime / 1000} seconds...`);
//               await delay(delayTime);
//             } else {
//             //   console.error('Max retries reached. Giving up.');
//               return rejectWithValue('Server is not ready. Please try again later.');
//             }



//         }else{
//             // original error handling
//             if (err.response) {
//                 // The server responded with a status code that falls out of the range of 2xx
//                 return rejectWithValue(err.response.data);
//               } else if (err.request) {
//                 // The request was made but no response was received
//                 return rejectWithValue('No response from server');
//               } else {
//                 // Something happened in setting up the request that triggered an Error
//                 console.log(err.message)
//                 return rejectWithValue('Request error:'+err.message);
//               }

//         }
      
//     }
//     }
// });



export const fetchWorkspaces=createAsyncThunk('dashboard/workspaces',async(_,{rejectWithValue})=>{

  try{
    const resp = await CustomRequest.get(`/dashboard/workspaces`);
    return await resp.data;

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
    list:{},
    active:{},
    status:"idle",
    errors:[],

}

const workspace = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
        setWorkspaceList:(state, action)=>{
            state.list=action.payload.workspace;
        },
        setActiveWorkspace:(state, action)=>{
            const active=state.list.workspace.owned.find((ws)=> ws.id==action.payload.wsId)??state.list.workspace.shared.find(ws=> ws.id==action.payload.wsId);
            state.active=active;
        },
        addNewWorkspace:(state, action)=>{
            state.list.workspace.owned.push(action.payload.workspace);
        },
        editWsName:(state, action)=>{
          if(state.active){
            if(state.active.id == action.payload.workspace.id){
              state.active.title=action.payload.workspace.title;
            }
          }
        },
        removeWorkspaceFromSharedWsList:(state, action)=>{
          const newSharedWsList=state.list.workspace.shared.filter(ws=>ws.id!==action.payload.workspace_id);
          const newObj={workspace:{...state.list.workspace, shared:newSharedWsList}}
          state.list=newObj;
        },
        clearErrors: (state) => {
          state.errors = []; // Clear errors from state
        }
  },
  extraReducers(builder){
        builder
        .addCase(fetchWorkspaces.pending, (state, action)=>{
            state.status="pending";
        })
        .addCase(fetchWorkspaces.fulfilled, (state, action )=>{
            state.status="success"
            state.list =action.payload;
      
        })
        .addCase(fetchWorkspaces.rejected, (state, action)=>{
            state.status="failed";
            state.errors.push(action.error.message)
        })



  }
});

export const {setActiveWorkspace, setWorkspaceList, editWsName,addNewWorkspace, removeWorkspaceFromSharedWsList,clearErrors} = workspace.actions

export const selectActiveWorkspace=state=>state.workspace.active;
export const selectWorkspaceList=state=>state.workspace.list;
export const selectWorkspaceErrors=state=>state.workspace.errors;
export const selectWsStatus=state=>state.workspace.status;

export default workspace.reducer


export const wsMethods={
  update:(ws)=>async(dispatch)=>{
    try{
        // console.log(ws);
        const resp =await CustomRequest.post(`/dashboard/workspace/${ws.id}/update`, {'title':ws.value});
        if(resp.status==200){
          // console.log(resp)
            dispatch(editWsName({"workspace":resp.data.workspace}));
            toast.success('Workspace Name updated successfully');
            dispatch(fetchWorkspaces());
        }
    }catch(err){
      // console.log(err);
      // toast.error('Oops! something went wrong. Please try again');
      handleErrors(err);
    }
  },
  create:(title)=>async(dispatch)=>{
    try{

      const resp= await CustomRequest.post('/dashboard/workspace/store',{'title':title});
      if(resp.status==200){
        dispatch(addNewWorkspace({"workspace":resp.data.workspace}));
        toast.success('Workspace Created successfully. Please visit settings menu to switch');
        dispatch(modalMethods.closeCreateWorkspaceModal());
        dispatch(fetchWorkspaces());
      }

    }catch(err){
      // console.log(err);
      // let err_resp=JSON.parse(err.response);
      // if(err.response.status==400){
      //   toast.error("Workspace title already exists."+err.response.data.message[0]);
      // }else{
      //   toast.error('Oops! something went wrong. Please try again');
      // }
      handleErrors(err);

    }
  },
  switchWorkspace:(dispatch_source, ws_id)=>async(dispatch)=>{

    if(dispatch_source=="FROM_SIDEBAR"){
      try{
        const resp= await CustomRequest.post('/dashboard/set_last_active_workspace',{wsId:ws_id});
        const status= resp.status;
        if(status==200){
          dispatch(setActiveWorkspace({wsId:ws_id}));
          dispatch(setUserLastActiveWorkspace({wsId:ws_id}));
          toast.success('Workspace switched successfully');
        }
      }catch(err){
        handleErrors(err);
        // toast.error("Error while switching workspace:"+err);
      }
    }
    if(dispatch_source=="FROM_WORKSPACE_LEAVE"){
      try{
        const resp= await CustomRequest.post('/dashboard/set_last_active_workspace',{wsId:ws_id});
        const status= resp.status;
        if(status==200){
          dispatch(setActiveWorkspace({wsId:ws_id}));
          dispatch(setUserLastActiveWorkspace({wsId:ws_id}));
          toast.success('Workspace switched successfully');
        }
      }catch(err){
        handleErrors(err);
        // toast.error("Error while switching workspace:"+err);
      }
    }
    
  },
  setActiveWorkspace:(ws_Id)=>async(dispatch)=>{
    try {
      const resp = await CustomRequest.post(
        "/dashboard/set_last_active_workspace",
        { wsId:ws_Id }
      );
      const status = resp.status;
      if (status == 200) {
        dispatch(setActiveWorkspace({ wsId: ws_Id }));
        dispatch(setUserLastActiveWorkspace({ wsId: ws_Id }));
        toast.success("Workspace loaded successfully");
      }
    } catch (err) {
      // toast.error("Workspace data loading error:" + err);
      handleErrors(err);
    }

  }


}