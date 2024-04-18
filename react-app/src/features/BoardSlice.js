import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  loadedBoard: "",
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
    setLoadedBoard: (state, action) => {
      state.loadedBoard = action.payload.board;
    },
  },
});

export const { setBoardsList, setLoadedBoard, insertBoard, removeBoard } = BoardSlice.actions;
export const selectBoardsList = (state) => state.boards.list;
export const selectLoadedBoard = (state) => state.boards.loadedBoard?state.boards.loadedBoard:"--Select--";

export default BoardSlice.reducer;
