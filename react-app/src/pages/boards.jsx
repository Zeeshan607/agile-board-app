import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomRequest from "../utils/customRequest";
import { toast } from "react-toastify";
import { Modal } from "react-responsive-modal";
import { setBoardsList,selectBoardsList, removeBoard, boardMethods } from "../features/BoardSlice.js";
import Swal from "sweetalert2";

const Boards = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  /////
  useEffect(() => {
    // loadBoards();
  }, [dispatch]);


  const del = (e, id) => {
    e.target.classList.add("disabled");
    // window.confirm("Delete the item?");
// console.log('function working');
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then( async (result) => {
      if (result.isConfirmed) {
          dispatch(boardMethods.delete(id));
        }
        e.target.classList.remove("disabled");
    });
  
  };

  const boards = useSelector(selectBoardsList);
  return (
    <div className="container-fluid bg-white p-3">
      <div className="row mx-0">
        <div className="col-12 text-end">
          <Link to={"/add-board"} className="btn btn-primary">
            Create New Board
          </Link>
        </div>
      </div>

      {/* <AppResponse/> */}

      <div className="row mx-0 mt-3">
        <div className="col-12 ">
          {isLoading ? (
            <p>
              <i
                className="fa fa-spinner fa-spin"
                style={{ fontSize: "32px" }}
              ></i>
            </p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
   
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {boards.length ? (
                    boards.map((board) => (
                      <tr key={board.id}>
                        <td >
                          <b >
                            {board.name}
                          </b>
                        </td>
                     
                        <td>
                          <Link
                            to={`/edit-board/${board.id}`}
                            className="btn btn-primary btn-sm mx-1"
                          >
                            <i className="fa fa-edit "></i>
                          </Link>
                          <button
                            className="btn btn-danger btn-sm mx-1"
                            onClick={(e) => del(e, board.id)}
                          >
                            <i className="fa fa-trash "></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3}>
                        OOPs! its seems like you don't have any boards
                        available yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Boards;
