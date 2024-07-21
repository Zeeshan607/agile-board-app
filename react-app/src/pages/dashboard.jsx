import { useEffect, useState } from "react";
import CustomRequest from "../utils/customRequest.jsx";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectBoardsList, setBoardsList } from "../features/BoardSlice.js";
import { Link, useSearchParams } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  // const [searchParams, setSearchParams]=useSearchParams();
  // const selectedBoard=searchParams.get('board');
  const boards = useSelector(selectBoardsList);

  useEffect(() => {

      // if(!selectedBoard){
          // boards.filter()
      // }
      // loadBoardColumns(selectedBoard)
  }, [boards]);


    // const loadBoardColumns=async(board)=>{
    //     try{
    //           const resp= await CustomRequest.get(`/dashboard/boards/columns/${board}`);

    //     }catch(err){
    //       toast.error(err.response?.data?.msg);
    //     }
    // }
// console.log(boards)

  
  return (
    <div className="container-fluid ">
      <div className="row mx-0 bg-white p-3 my-3 ">
     
          <div className="col-12">
            <h1>Boards</h1>
            <div className="board-list d-flex flex-row flex-wrap ">
              {
                boards.length?(
                  boards.map((board)=>(
                      <Link to={`/board-view/${board.slug}`} key={board.id} className="card p-4 board-view-card">
                            {board.name}
                      </Link>
                  ))
                ):(<p>0 Board Found! <Link to={'/boards'}>create new Board</Link></p>)
              }
                
            </div>
          </div>


      </div>
    </div>
  );
};
export default Dashboard;
