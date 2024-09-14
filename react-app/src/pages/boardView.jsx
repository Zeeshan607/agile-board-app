import {
  Link,
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import "./boardView.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useCallback } from "react";
import {
  fetchColumnsTasks,
  selectColumnsTasks,
} from "../features/ColumnsTasksSlice.js";
import Loading from "../components/Loading.jsx";
import { selectActiveWorkspace } from "../features/workspaceSlice.js";
import { selectBoardsList, boardMethods, selectActiveBoard } from "../features/BoardSlice.js";
import Select from "react-select";
import ColumnsList from "../components/ColumnsList.jsx";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useAuth } from "../hooks/useAuth.jsx";
import {
  modalMethods,
  selectCreateBoardModal,
} from "../features/modalSlice.js";
import { columnsTaskMethods } from "../features/ColumnsTasksSlice.js";
import { selectCreateNewColumnModal } from "../features/modalSlice.js";
import CreateColumnModel from "../components/CreateColumnModel.jsx";

const BoardView = React.memo(() => {
  const param = useParams();
  const boardSlug = param.slug;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useAuth();
  const authenticatedUser = user;
  const [isLoading, setIsLoading] = useState(false);
  const activeWorkspace = useSelector(selectActiveWorkspace);
  const columnsTasksStatus = useSelector((state) => state.columnsTasks.status);
  const wsStatus = useSelector((state) => state.workspace.status);
  const boardStatus = useSelector((state) => state.boards.status);
  const activeWsId = useSelector((state) => state.workspace.active.id);
  const [activeId, setActiveId] = useState(null);
  const [activeDragTask, setActiveDragTask] = useState({});
  const columnsTasks = useSelector(selectColumnsTasks);
  const isOpenCreateColumnModal = useSelector(selectCreateNewColumnModal);
  const activeBoard=useSelector(selectActiveBoard);

  useEffect(() => {
    dispatch(boardMethods.setActiveBoardData(boardSlug));
    if (boardStatus == "success") {
      if (columnsTasksStatus == "idle" || columnsTasksStatus == "success") {
        dispatch(fetchColumnsTasks(boardSlug));
      }
    }
  }, [boardSlug, dispatch, boardStatus]);

  const handleDragStart = (event) => {
    // console.log(event)
    const { active } = event;
    const { id } = active;
    setActiveId(id);
    setActiveDragTask(active.data.current.task);
  };

  // const handleDragOver = (event) => {
  //   console.log("drag-Over event");
  //   console.log(event);

  // };

  const handleDragEnd = (event) => {
    const {
      source,
      draggableId: activeDragingElId,
      destination,
      type: eventType,
    } = event;
    console.log("on drag end triggering: ");
    console.log(event);

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (eventType == "TASK") {
      const sInd = source.droppableId; //sInd = source Index
      const dInd = destination.droppableId; //dInd = destination Index
      // Get the source and destination columns
      const sourceColumn = columnsTasks.find((col) => col.id === sInd);
      const destinationColumn = columnsTasks.find((col) => col.id === dInd);

      if (sInd === dInd) {
        let newTaskOrder = Array.from(sourceColumn.Tasks);
        const [movedTask] = newTaskOrder.splice(source.index, 1);
        newTaskOrder.splice(destination.index, 0, movedTask);

        newTaskOrder = newTaskOrder.map((task, index) => {
          return {
            ...task,
            order: index + 1, // Set new order (starting from 1 or 0, depending on your logic)
          };
        });
        console.log(newTaskOrder);
        dispatch(
          columnsTaskMethods.updateTaskOrder(newTaskOrder, source.droppableId)
        );
      } else {
        if (activeDragingElId !== destination.droppableId) {
          let sourceTaskOrder = Array.from(sourceColumn.Tasks);
          let destinationTaskOrder = Array.from(destinationColumn.Tasks);

          // Remove the task from the source column
          const [movedTask] = sourceTaskOrder.splice(source.index, 1);

          // Insert the task in the destination column at the specified index
          destinationTaskOrder.splice(destination.index, 0, movedTask);

          // Update the order of tasks in the source and destination columns
          destinationTaskOrder = destinationTaskOrder.map((task, index) => ({
            ...task,
            order: index + 1, // Update order in the destination column
          }));

          sourceTaskOrder = sourceTaskOrder.map((task, index) => ({
            ...task,
            order: index + 1, // Update order in the source column if needed
          }));

          let data = {
            sourceColumnId: source.droppableId,
            destinationColumnId: destination.droppableId,
            task_id: activeDragingElId,
          };

          dispatch(columnsTaskMethods.updateTaskColumnId(data));

          // Dispatch to update both source and destination column tasks in the Redux store
          dispatch(
            columnsTaskMethods.updateTaskOrder(
              sourceTaskOrder,
              source.droppableId
            )
          );
          dispatch(
            columnsTaskMethods.updateTaskOrder(
              destinationTaskOrder,
              destination.droppableId
            )
          );
        }
      }
    }

    if (eventType == "COLUMN") {
      const newColumns = Array.from(columnsTasks);
      const [movedColumn] = newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, movedColumn);

      // Update order in the backend and Redux store (assuming a method for updating columns)
      const reorderedColumns = newColumns.map((column, index) => ({
        ...column,
        order: index + 1, // Adjust the order of columns based on their new index
      }));

      // console.log(reorderedColumns);
      dispatch(columnsTaskMethods.updateColumnsOrder(reorderedColumns)); //
    }

    setActiveId(null);
  };

  const boards = useSelector(selectBoardsList);
  let options = boards?.map((b) => {
    return { value: b.slug, label: b.slug };
  });

  const handleSelect = (op) => {
    dispatch(boardMethods.setActiveBoardData(op.value));
    navigate(`/board-view/${op.value}`);
  };

  const selectedBoard = boardSlug
    ? { value: boardSlug, label: boardSlug }
    : { value: "null", label: "--select Board--" };

  if (wsStatus !== "success") {
    return <Loading />;
  }

  return (
    <div className="container-fluid bg-white pt-3 h-100 board-view">
      <div className="row mx-0 bg-white p-3 shadow-md bg-body ">
        <div className="col-12 col-sm-12 col-md-12 col-lg-6 d-flex flex-row flex-sm-wrap flex-wrap flex-md-nowrap flex-lg-nowrap justify-content-start align-items-center">
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
        
          <div className="input-group-inline ms-2 d-flex flex-row align-items-center">
          <label className="text-success ">Board:</label>
            <Select
              defaultValue={
                selectedBoard
                  ? selectedBoard
                  : { value: "null", label: "--select Board--" }
              }
              onChange={(op) => handleSelect(op)}
              options={options}
              placeholder="0 board found"
            />
            <div className="input-group-append">
            <button
              className="btn btn-transparent"
              onClick={() => dispatch(modalMethods.openCreateBoardModal())}
            >
              <i className="fa fa-plus"></i>
            </button>
            </div>
         
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-6  text-center text-md-end text-lg-end text-sm-end">
        {activeWorkspace.createdBy == authenticatedUser.userId ? (
            <button
              className="btn btn-primary mt-2 mt-sm-0"
              title="Give access of this workspace to someone you know."
              onClick={() => dispatch(modalMethods.openSendInvitationModal())}
            >
              <i className="fa fa-user-plus mx-1"></i>Share
            </button>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="kanban-container">
        <DragDropContext onDragEnd={handleDragEnd} >
          {isLoading ? (
            <p>
              <i
                className="fa fa-spinner fa-spin"
                style={{ fontSize: "32px" }}
              ></i>
            </p>
          ) : columnsTasks.length ? (
            <Droppable
              droppableId="columns" // An ID for the columns container
              type="COLUMN" // Specify that this Droppable is for columns
              direction="horizontal" // Allow horizontal dragging
            >
              {(provided, snapshot) => (
                <div
                  className="columns-wrapper" // Add a CSS class for horizontal scrolling
                  {...provided.droppableProps}
                  ref={provided.innerRef}
              
                >
                  {columnsTasks.map((column, index) => (
                    <Draggable
                      key={column.id}
                      draggableId={column.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            margin: "0 5px", // Add margin between columns
                            minWidth: "250px", // Ensure columns have a fixed width
                          }}
                        >
                          <Droppable
                            droppableId={column.id.toString()}
                            index={index}
                            key={column.id}
                            type="TASK"
                          >
                            {(provided, snapshot) => (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                              >
                                <ColumnsList
                                  column={column}
                                  key={index}
                                  wsId={activeWsId}
                                  draggingActiveId={activeId}
                                  activeDragTask={activeDragTask}
                                  provided={provided}
                                />
                              
                              </div>
                            )}
                          </Droppable>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ) : (
            <Loading />
          )}
        </DragDropContext>
        <div className=" position-relative">
          <button
            role="button"
            onClick={()=>dispatch(modalMethods.openCreateNewColumnModal())}
            className=" btn btn-outline-primary mt-2 text-nowrap"
          >
            <i className="fa fa-plus"></i> Add New Column
          </button>
          {isOpenCreateColumnModal && (
            <CreateColumnModel board_id={activeBoard.id} />
          )}
        </div>
      </div>
    </div>
  );
});

export default BoardView;
