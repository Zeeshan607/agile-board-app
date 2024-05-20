import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWorkspaces} from "./workspaceSlice.js";


const initialState = {
  list: [],
  activeBoard: "",
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
    builder.addCase(fetchWorkspaces.fulfilled,(state, action)=>{
      const wss=action.payload;
      const activeWs= wss.workspace.owned.filter(ws=> ws.is_active==true)??wss.workspace.shared.filter(ws=> ws.is_active==true);
       state.list=activeWs[0].boards.length?activeWs[0].boards:[];
    })
  }
});

export const { setBoardsList, setActiveBoard, insertBoard, removeBoard } = BoardSlice.actions;
export const selectBoardsList = (state) => state.boards.list;
export const selectActiveBoard = (state) => state.boards.loadedBoard?state.boards.loadedBoard:"--Select--";

export default BoardSlice.reducer;
