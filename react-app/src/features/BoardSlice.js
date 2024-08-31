import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchWorkspaces} from "./workspaceSlice.js";
import {authUserSelector} from "../utils/customSelectors.js";
import CustomRequest from "../utils/customRequest.jsx";
import { modalMethods } from "./modalSlice.js";
// import {authUserSelector} from "./UserAuthSlice.js";



export const fetchBoardsByWsId=createAsyncThunk( "workspace/boards" , async (wsId, { rejectWithValue})=>{

  try{
      const resp= await CustomRequest.get(`dashboard/workspace/${wsId}/boards`);
      return await resp.data.boards;

  }catch(err){
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


});






const initialState = {
  list: [],
  activeBoard: "",
  status:"idle",
};




const BoardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setBoardsList: (state, action) => {
      state.list = action.payload.boards;
    },
    insertBoard:(state, action)=>{
      state.list.push(action.payload.board);
    },
    editBoard:(state, action )=>{
      state.list.map((board,index)=>{
        if(board.id==action.payload.id){
          state.list[index]=action.payload.board;
        }
      })
    },
    removeBoard:(state, action)=>{
      const newBoards= state.list.filter(b=> b.id != action.payload.id)
      state.list= newBoards;
    },
    setActiveBoard: (state, action) => {
        state.list.map(board=>{
          if(board.slug==action.payload.slug){
            state.activeBoard = board;
            return;
          }
        })

    },
  },
  extraReducers(builder){
    builder.addCase(fetchBoardsByWsId.pending,(state, action)=>{
       state.status="pending";
    })
    .addCase(fetchBoardsByWsId.fulfilled,(state, action)=>{
      state.status="success";
      state.list=action.payload;

   })
   .addCase(fetchBoardsByWsId.rejected,(state, action)=>{
    state.status="rejected";
    console.log(action.payload)
 })
  }
});

export const { setBoardsList, setActiveBoard, insertBoard, removeBoard,editBoard } = BoardSlice.actions;
export const selectBoardsList = (state) => state.boards.list;
export const selectActiveBoard = (state) => state.boards.activeBoard?state.boards.activeBoard:null;

export default BoardSlice.reducer;


export const boardMethods={
   setActiveBoardData:(slug)=> async(dispatch)=>{
    try{
      const resp=await CustomRequest.post('/dashboard/user/setLastActiveboard/',{boardSlug:slug});
          if(resp.status==200){
            dispatch(setActiveBoard({slug:slug}))
          }
    }catch(err){
        toast.error(err);
    }

  },
  create:(data)=>async(dispatch,getState)=>{
    const modalState=getState().modals;
    try{
      const resp=await CustomRequest.post('/dashboard/board/create',data);
      if(resp.status==200){
        dispatch(insertBoard({'board':resp.data.board}));
        toast.success('Board Created successfully');
        if(modalState.createBoardModal){
          dispatch(modalMethods.closeCreateBoardModal());
        }

      }
 
  }catch(err){
    console.log(err);
      toast.error(err.response?.data?.msg);
      if(modalState.createBoardModal){
        dispatch(modalMethods.closeCreateBoardModal());
      }
  }

  },
  update:(data, id)=>async(dispatch)=>{
    try {
      const resp =await CustomRequest.patch(`/dashboard/board/${id}`, data);
      if(resp.status==200){
        dispatch(editBoard({'id':id, 'board':resp.data.board}));
        toast.success('Board udpated successfully')
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg);

    }
  },
  delete:(id)=>async(dispatch)=>{
    try {
    const resp = await CustomRequest.delete(`/dashboard/board/${id}`);
    const del_id= await resp.data?.board_id;
    dispatch(removeBoard({id:del_id}));
    toast.success(resp.data?.msg);
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.msg);

    }
  }
}
