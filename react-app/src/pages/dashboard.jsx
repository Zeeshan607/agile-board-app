import { useEffect, useState } from "react";
import CustomRequest from "../utils/customRequest.jsx";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBoardsList,
  setBoardsList,
  boardMethods,
} from "../features/BoardSlice.js";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import {
  selectActiveWorkspace,
  wsMethods,
} from "../features/workspaceSlice.js";
import EditableText from "../components/EditableTextInput.jsx";
import { modalMethods } from "../features/modalSlice.js";
import { useAuth } from "../hooks/useAuth.jsx";
import "./dashboard.css";
import Loading from "../components/Loading.jsx";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const activeWorkspace = useSelector(selectActiveWorkspace);
  const boards = useSelector(selectBoardsList);
  const boardSliceStatus=useSelector(state=>state.boards.status);
  const { user } = useAuth();
  const authenticatedUser = user;

  useEffect(() => {
    const isActiveWorkspace=Object.keys(activeWorkspace).length;
    if (boards.length == 0 && isActiveWorkspace != 0 && boardSliceStatus=="success") {
      // console.log('tried to open create board modal')
        dispatch(modalMethods.openCreateBoardModal());
        setIsLoading(false);
    } else {
      setIsLoading(false);
    }


    // initializing tooltip
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map((tooltipTriggerEl) => {
      return new window.bootstrap.Tooltip(tooltipTriggerEl);
    });

  }, [boards, activeWorkspace]);

  const handleWorkspaceNameEdit = (input) => {
    dispatch(wsMethods.update({ id: activeWorkspace.id, value: input }));
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="container-fluid bg-white">
      <div className="row mx-0 pt-5">
        <div className="col-6 p-5 d-flex flex-column align-items-center">
          {activeWorkspace ? (
            <div className="ws-wrapper text-start" id="workspace-title">
              <small>
                <b className="text-success">
                  Workspace{" "}
                  <sup>
                    <i className="fa fa-lock"></i>
                  </sup>
                </b>
              </small>
              <h1 className="m-0"  data-bs-toggle="tooltip" data-bs-placement="top" title="Double click to Edit workspace name" >
                {
                  <EditableText
                    initialText={activeWorkspace.title}
                    saveMethod={(input) => handleWorkspaceNameEdit(input)}
                  />
                }
              </h1>
            </div>
          ) : (
            "No active workspace"
          )}
        </div>
        <div className="col-6 p-5 text-center">
          {activeWorkspace.createdBy == authenticatedUser.userId ? (
            <button
              className="btn btn-primary"
              title="Give access of this workspace to someone you know."
              onClick={() => dispatch(modalMethods.openSendInvitationModal())}
            >
              <i className="fa fa-user-plus mx-1"></i>Invite Workspace Member
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <hr />
      <div className="row mx-0  p-3 my-3 ">
        <div className="col-12">
          <h1>Your Boards</h1>
          <div className="board-list d-flex flex-row flex-wrap mt-5">
            {boards.length ? (
              boards.map((board) => (
                <Link
                  to={`/board-view/${board.slug}`}
                  key={board.id}
                  className="card p-4 board-view-card"
                >
                  {board.name}
                </Link>
              ))
            ) : (
              <p>
                0 Board Found! <Link to={"/add-board"}>create new Board</Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
