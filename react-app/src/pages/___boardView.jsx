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
import { selectBoardsList } from "../features/BoardSlice.js";
import Select from "react-select";
import CreateBoardModel from "../components/CreateBoardModel.jsx";
import { setActiveBoard } from "../features/BoardSlice.js";
import ColumnsList from "../components/___-ColumnsList.jsx";
import {
  DndContext,
  useSensors,
  useSensor,
  closestCenter,
  closestCorners,
  rectIntersection,
  MouseSensor,
  TouchSensor,
  PointerSensor,
  KeyboardSensor,
  DragOverlay,
} from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import TaskList from "../components/___TaskList.jsx";
// REMEMBER we are using BoardStatus as Columns in client side app, in server side its logics are as BoardStatus

const BoardView = React.memo(() => {
  // const [searchParams, setSearchParams]=useSearchParams();
  const param = useParams();
  const boardSlug = param.slug;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openCreateBoardModel, setOpenCreateBoardModel] = useState(false);
  const onOpenCreateBoardModal = useCallback(
    () => setOpenCreateBoardModel(true),
    []
  );
  const onCloseCreateBoardModal = useCallback(
    () => setOpenCreateBoardModel(false),
    []
  );
  const activeWorkspace = useSelector(selectActiveWorkspace);
  const columnsErr = useSelector((state) => state.columns.errors);
  const columnsStatus = useSelector((state) => state.columns.status);
  const wsStatus = useSelector((state) => state.workspace.status);
  const boardStatus = useSelector((state) => state.boards.status);
  const taskStatus = useSelector((state) => state.tasks.status);
  const activeWsId = useSelector((state) => state.workspace.active.id);
  const mouseSensor = useSensor(MouseSensor); // Initialize mouse sensor
  const touchSensor = useSensor(TouchSensor); // Initialize touch sensor
  const pointerSensor = useSensor(PointerSensor); //initialize pointer sensor
  useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
  });
  const sensors = useSensors(mouseSensor, touchSensor, pointerSensor);

  const [activeId, setActiveId] = useState(null);
  const [activeDragTask, setActiveDragTask] = useState({});

  useEffect(() => {
    console.log("boardView component mounted");

    dispatch(setActiveBoard({ slug: boardSlug }));

    console.log(`ws status changed to ${wsStatus}`);
    if (boardStatus == "success") {
      console.log(wsStatus);
      if (columnsStatus == "idle") {
        dispatch(fetchColumns(boardSlug));
      }
      if (columnsErr.length != 0) {
        columnsErr.map((err) => {
          toast.error("Columns Error: " + err);
        });
      }
      if (taskStatus == "idle") {
        dispatch(fetchTasks(boardSlug));
      }
    }
  }, [boardSlug, dispatch, boardStatus]);

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
    const { active, over } = event;
    // const overId=over.id;
    const id = active.id;
    // if (!over) return;
    console.log("drag-Over event");
    // console.log( "over "+over)
    console.log(event);

    // Find the containers
    // const activeContainer = active.data.current.type=="container"?active.data.current.parent?.id:null;
    // const overContainer = over.data.current.type=="container"?over.data.current.parent?.id:null;

    // if (
    //   !activeContainer ||
    //   !overContainer ||
    //   activeContainer === overContainer
    // ) {
    //   return;
    // }

    //   const { id: overId } = over;
    // if (overId === activeId) return;

    // const overData = over.data.current;
    // if (overData.type === "container") {
    //   // Handle when a task is dragged over a column container
    //   console.log('task dragged over container/column')
    // } else if (overData.type === "task") {
    //   // Handle when a task is dragged over another task
    //   console.log('task draged over other task')
    // }

    // const { id: overId } = over;
    // const { id: activeId } = active;

    // if (overId === activeId) return;

    // const overData = over.data.current;
    // const activeData = active.data.current;

    // if (overData.type === "container" && activeData.type === "task") {
    //   // Handle when a task is dragged over an empty column
    //   dispatch(updateTasksColumn({
    //     "column_id": overId,
    //     'task_id': activeId
    //   }));
    // } else if (overData.type === "task" && activeData.type === "task" && activeData.parent.id !== overData.parent.id) {
    //   // Handle when a task is dragged over another task in a different column
    //   dispatch(updateTasksColumn({
    //     "column_id": overData.parent.id,
    //     'task_id': activeId
    //   }));
    // }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log("on drag end triggering: ");
    console.log(event);
    //  if (!over) {
    //   setActiveId(null);
    //   return;
    // }
    // if condition for moving task from one column to other, even the column is completely empty
    //  if(over.data.current.type =="container" || active.data.current.parent?.id != over.data.current.parent?.id){
    //   console.log('can be pushed in new column')
    //   console.log(over.data.current.parent && over.data.current.type =='item'?over.data.current.parent.id : over.id)
    //   dispatch(updateTasksColumn({"column_id":over.data.current.parent && over.data.current.type =='item'?over.data.current.parent.id : over.id, 'task_id':active.id}))
    // }
    // if (over.data.current.type === "container" && active.data.current.parent?.id !== over.data.current.parent?.id) {
    //   dispatch(updateTasksColumn({
    //     "column_id": over.data.current.parent && over.data.current.type === 'item' ? over.data.current.parent.id : over.id,
    //     'task_id': active.id
    //   }));
    // }

    if (!over) return;

    const { id: overId } = over;
    const { id: activeId } = active;

    const overData = over.data.current;
    const activeData = active.data.current;

    if (
      overData.type === "container" &&
      activeData.sortable.index !== overData.sortable.index
    ) {
      dispatch(
        updateTasksColumn({
          column_id: overId,
          task_id: activeId,
        })
      );
    } else if (overData.type === "task") {
      if (activeData.parent?.id !== overData.parent?.id) {
        dispatch(
          updateTasksColumn({
            column_id: overId,
            task_id: activeId,
          })
        );
      } else {
        console.log("task moving over task");
      }
    }
    // if (overData.type === "container" && activeData.type === "task" && activeData.parent.id !== overId) {
    //   dispatch(updateTasksColumn({
    //     "column_id": overId,
    //     'task_id': activeId
    //   }));
    // } else if (overData.type === "task" && activeData.type === "task" && activeData.parent.id !== overData.parent.id) {
    //   dispatch(updateTasksColumn({
    //     "column_id": overData.parent.id,
    //     'task_id': activeId
    //   }));
    // }
    setActiveId(null);
  };

  const boards = useSelector(selectBoardsList);
  let options = boards?.map((b) => {
    return { value: b.id, label: b.slug };
  });
  const handleSelect = (e) => {
    // setSearchParams({ board: e.label });
  };
  const boardQuery = searchParams.get("slug");
  const selectedBoard = boardQuery
    ? { value: boardQuery, label: boardQuery }
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
              onClick={(e) => setOpenCreateBoardModel(true)}
            >
              <i className="fa fa-plus"></i>
            </button>
          </div>

          <CreateBoardModel
            open={openCreateBoardModel}
            ws_id={activeWorkspace?.id}
            onClose={onCloseCreateBoardModal}
          />
        </div>
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 text-end"></div>
      </div>

      <div className="d-flex flex-row flex-wrap justify-content-start kanban-container">
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          sensors={sensors}
        >
          {/* <SortableContext items={columns.map((column)=> column.id)} strategy={horizontalListSortingStrategy}> */}
          {isLoading ? (
            <p>
              <i
                className="fa fa-spinner fa-spin"
                style={{ fontSize: "32px" }}
              ></i>
            </p>
          ) : columns.length ? (
            columns.map((column, index) => (
              <ColumnsList
                column={column}
                key={index}
                wsId={activeWsId}
                draggingActiveId={activeId}
                activeDragTask={activeDragTask}
              />
            ))
          ) : (
            <p>0 Columns found..</p>
          )}
          {/* </SortableContext> */}
          <DragOverlay>
            {activeId ? (
              <TaskList
                task={activeDragTask}
                parent={columns.map((col) => {
                  return activeDragTask.column_id == col.id ? col : null;
                })}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
});

export default BoardView;
