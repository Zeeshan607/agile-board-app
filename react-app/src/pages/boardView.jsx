import { Link, useParams, useSearchParams } from "react-router-dom";
import "./boardView.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import {
  fetchColumns,
  selectColumnsList,
  setColumnsList,
} from "../features/ColumnSlice.js";
import Loading from "../components/Loading.jsx";
import { selectActiveWorkspace } from "../features/workspaceSlice.js";
import {
  selectTasks,
  fetchTasks,
  updateTasksColumn,
} from "../features/TaskSlice.js";
import { selectActiveBoard, selectBoardsList } from "../features/BoardSlice.js";
import Select from "react-select";
import CreateBoardModel from "../components/CreateBoardModel.jsx";
import { boardMethods } from "../features/BoardSlice.js";
import ColumnsList from "../components/ColumnsList.jsx";
import TaskList from "../components/TaskList.jsx";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {useAuth} from "../hooks/useAuth.jsx";
import CustomRequest from "../utils/customRequest.jsx";
import { modalMethods, selectCreateBoardModal } from "../features/modalSlice.js";
import { model } from "mongoose";

const BoardView = React.memo(() => {
  // const [searchParams, setSearchParams]=useSearchParams();
  const param = useParams();
  const boardSlug = param.slug;
  const dispatch = useDispatch();
  const auth=useAuth();
  const last_active_board=auth.user.last_active_board;
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const createBoardModel=useSelector(selectCreateBoardModal); 

  const activeWorkspace = useSelector(selectActiveWorkspace);
  const columnsErr = useSelector((state) => state.columns.errors);
  const columnsStatus = useSelector((state) => state.columns.status);
  const wsStatus = useSelector((state) => state.workspace.status);
  const boardStatus = useSelector((state) => state.boards.status);
  const taskStatus = useSelector((state) => state.tasks.status);
  const activeWsId = useSelector((state) => state.workspace.active.id);


  const [activeId, setActiveId] = useState(null);
  const [activeDragTask, setActiveDragTask] = useState({});
  const activeBoard=useSelector(selectActiveBoard);
  
  useEffect(() => {



    dispatch(boardMethods.setActiveBoardData(boardSlug));

    if (boardStatus == "success") {
   

      if (columnsStatus == "idle" || columnsStatus == "success" ) {
        dispatch(fetchColumns(boardSlug));
      }
      if (columnsErr.length != 0) {
        columnsErr.map((err) => {
          toast.error("Columns Error: " + err);
        });
      }
      if (taskStatus == "idle"|| taskStatus == "success" ) {
        dispatch(fetchTasks(boardSlug));
      }
    }
  }, [boardSlug, dispatch, boardStatus,columnsErr]);




  const handleDragStart = (event) => {
    // console.log(event)
    const { active } = event;
    const { id } = active;
    setActiveId(id);
    setActiveDragTask(active.data.current.task);
    // console.log(active)
  };

  const handleDragOver = (event) => {
    // console.log(event)
    // const { active, over } = event;
    // // const overId=over.id;
    // const id = active.id;
    // if (!over) return;
    console.log("drag-Over event");

    console.log(event);

  };

  const handleDragEnd = (event) => {
    const { 
      draggableId:activeId, destination } = event;
    console.log("on drag end triggering: ");
    console.log(event);

      if(activeId!== destination.droppableId){
        let data={
          column_id: destination.droppableId,
          task_id: activeId,
        }
        dispatch( updateTasksColumn(data));
            try{
              const resp= CustomRequest.post('/dashboard/task_column/update',data);
              if(resp.status==200){
                toast.success('Task status updated');
              }
            }catch(err){
                toast.error(err)
            }
        
            }

    setActiveId(null);
  };

 

  // let myuuid = uuidv1();
    // console.log('Your UUID is: ' + myuuid);

    // const grid = 8;
// const getListStyle = isDraggingOver => ({
//   background: isDraggingOver ? "lightblue" : "lightgrey",
//   padding: grid,
//   width: 250
// });


  const boards = useSelector(selectBoardsList);
  let options = boards?.map((b) => {
    return { value: b.id, label: b.slug };
  });
  const handleSelect = (e) => {
    // setSearchParams({ board: e.label });
  };
  // const boardQuery = searchParams.get("slug");
  // console.log(boardSlug)
  const selectedBoard = boardSlug
    ? { value: boardSlug, label: boardSlug }
    : { value: "null", label: "--select Board--" };

  // console.log(boardQuery)

  const columns = useSelector(selectColumnsList);

  if (wsStatus !== "success") {
    return <Loading />;
  }

  return (
    <div className="container-fluid bg-white pt-3">
      <div className="row mx-0 bg-white p-3 shadow-md bg-body ">
        <div className="col-12 col-sm-12 col-md-6 col-lg-6">
          {activeWorkspace ? (
            <h6 className="m-0 d-inline-flex ">
              {" "}
              <b className="text-success flex-nowrap">Workspace:</b>{" "}
              <span title="Default Workspace">{activeWorkspace.title} </span>
            </h6>
          ) : (
            "No active workspace"
          )}
          {"        "}
          <b className="text-success flex-nowrap">Board:</b>
          <div className=" input-group-inline ms-2">
         
            <Select
              defaultValue={
                selectedBoard
                  ? selectedBoard
                  : { value: "null", label: "--select Board--" }
              }
              onChange={handleSelect}
              options={options}
              placeholder="0 board found"
            />
            <button
              className="btn btn-transparent"
              onClick={() => modalMethods.openCreateBoardModal()}
            >
              <i className="fa fa-plus"></i>
            </button>
          </div>

          <CreateBoardModel
            open={createBoardModel}
            ws_id={activeWorkspace?.id}
            onClose={modalMethods.closeCreateBoardModal}
          />
        </div>
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 text-end">
        <button className="btn btn-primary" title="Give access of this workspace to someone you know."><i className="fa fa-user-plus mx-1"></i>Invite</button>
        </div>
      </div>

      <div className="d-flex flex-row flex-wrap justify-content-start kanban-container">
      <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragOver}>
      
          {isLoading ? (
            <p>
              <i
                className="fa fa-spinner fa-spin"
                style={{ fontSize: "32px" }}
              ></i>
            </p>
          ) : columns.length ? (
            columns.map((column, index) => (



        <Droppable droppableId={column.id.toString()} index={index} key={column.id}>
             {(provided, snapshot) => (
              <div   {...provided.droppableProps} ref={provided.innerRef}>


              <ColumnsList
                column={column}
                key={index}
                wsId={activeWsId}
                draggingActiveId={activeId}
                activeDragTask={activeDragTask}
              />
             {provided.placeholder}

              </div>

              )}
        </Droppable>


            ))
          ) : (
            <Loading/>
          )}
     
        </DragDropContext>
      </div>
    </div>
  );
});

export default BoardView;
