
import { useState,useEffect, } from 'react';
import { useSelector } from 'react-redux';
import { selectBoardsList } from "../features/BoardSlice.js";
import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
// Custom hook to store the selected board
const useBoard = () => {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const activeWsBoardsList=useSelector(selectBoardsList);
  const [loading, setLoading] = useState(false);  // Track the l
  const param = useParams();
  const boardSlug = param.slug;
console.log(boardSlug)
  const selectBoard = (boardSlug, activeWsId) => {
    setLoading(true);
    //find a board with given board slug and current active workspace id
     const requestedBoard= activeWsBoardsList.find(b=> b.slug==boardSlug && b.workspace_id==activeWsId);
     if (requestedBoard) {
      // If found, set it in the state and return true so user can proceed to board-view
      setSelectedBoard(requestedBoard);
      setLoading(false);  // Stop loading after the board is found
      return true;
    }

    // If not found, stop loading and return false
    setLoading(false);
    return false;
  
  };






  return { selectedBoard,loading, selectBoard };
};

export default useBoard;