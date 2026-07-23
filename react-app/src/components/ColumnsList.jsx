import React, { useState, useEffect, useCallback } from "react";
import CreateNewTask from "./createNewTaskModal.jsx";
import TaskList from "./TaskList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers } from "../features/WorkspaceMembersSlice.js";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./ColumnsList.css";
import { modalMethods, selectCreateNewTaskModal } from "../features/modalSlice.js";
import { getColumnAccentClass } from "../utils/columnColors.js";

const ColumnsList = ({ column, wsId, provided, columnIndex }) => {
  const accentClass = getColumnAccentClass(column, columnIndex);
  const dispatch = useDispatch();
  const isOpenCreateNewTaskModal=useSelector(selectCreateNewTaskModal);
  const [openColumnId, setOpenColumnId] = useState(null);

  const openTaskModal = useCallback(() => {
    setOpenColumnId(column.id);
    dispatch(modalMethods.openCreateNewTaskModal());
    dispatch(fetchMembers(wsId));
  }, []);
  const closeTaskModal = useCallback(() => { 
    setOpenColumnId(null);
    dispatch(modalMethods.closeCreateNewTaskModal());
  }, []);

  const grid = 8;
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250,
  });
  
  // useEffect(()=>{

  // },[column]);
  // console.log(column);

  return (
    <div className={"card column " + accentClass} id={column.id}>
      <i className="fas fa-arrows-alt mx-3 column-drag-icon"></i>
      <div className="card-header bg-transparent">
        <h1 className="card-title"><span className="column-dot"></span>{column.name}</h1>
        <p className="card-subtitle">{column.description}</p>
      </div>
      <div className="card-body">
        <ul className="list-unstyled tasks-list">
          {column.Tasks.length?column.Tasks.map((task, index) =>

              <Draggable
                key={task.id.toString()}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >

                    <TaskList task={task} parent={column} index={task.id} accentClass={accentClass} />

                  </div>
                )}
              </Draggable>

          ):('')}
       {provided.placeholder}
        </ul>
      </div>
      <div className="card-footer bg-transparent">
        <button
          role="button"
          onClick={openTaskModal}
          className="btn btn-dashed btn-sm w-100"
        >
          <i className="fa fa-plus"></i> Add New Task
        </button>
        {openColumnId==column.id && (
          <CreateNewTask
            column_id={column.id}
            onClose={()=>closeTaskModal()}
          />
        )}
      </div>
    </div>
  );
};

export default ColumnsList;
