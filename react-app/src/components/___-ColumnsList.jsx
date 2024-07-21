import React, { useState, useEffect, useCallback } from "react";
import CreateNewTask from "./createNewTaskModal.jsx";
import TaskList from "./___TaskList.jsx";
import { selectTasks } from "../features/TaskSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers } from "../features/WorkspaceMembersSlice.js";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
  rectSwappingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./ColumnsList.css";
import { createPortal } from "react-dom";

const ColumnsList = ({ column, wsId, draggingActiveId, activeDragTask }) => {
  const dispatch = useDispatch();
  const [openNewTaskModal, setOpenNewTaskModal] = useState(false);

  const openTaskModal = useCallback(() => {
    setOpenNewTaskModal(true);
    dispatch(fetchMembers(wsId));
  }, []);
  const closeTaskModal = useCallback(() => setOpenNewTaskModal(false), []);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: { type: "container", column: column },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const tasks = useSelector(selectTasks);
  return (
    <div
      className="card column"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      id={column.id}
    >
      <i className="fas fa-arrows-alt mx-3 column-drag-icon"></i>
      <div className="card-header bg-transparent">
        <h1 className="card-title">{column.name}</h1>
        <p className="card-subtitle">{column.description}</p>
      </div>
      <div className="card-body">
        <ul className="list-unstyled tasks-list">
          <SortableContext items={tasks.map((task) => task.id)}>
            {tasks.map((task) =>
              column.id == task.column_id ? (
                <React.Fragment key={task.id}>
                  <TaskList task={task} parent={column} />
                </React.Fragment>
              ) : null
            )}
          </SortableContext>
        </ul>
      </div>
      <div className="card-footer bg-transparent">
        <button
          role="button"
          onClick={openTaskModal}
          className=" board-column-btn"
        >
          <i className="fa fa-plus"></i> Add New Task
        </button>
        {openNewTaskModal && (
          <CreateNewTask
            open={openNewTaskModal}
            onClose={closeTaskModal}
            column_id={column.id}
          />
        )}
      </div>
    </div>
  );
};

export default ColumnsList;
