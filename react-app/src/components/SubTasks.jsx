import React, { useEffect, useState } from "react";
import EditableTextTextareaForSubTasks from "./EditableTextTextareaForSubTasks.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubTasksByTaskId,
  subTaskMethods,
  selectSubTaskList,
} from "../features/SubTaskSlice.js";
import "./SubTask.css";
import Swal from "sweetalert2";

export default function SubTasks({ task }) {
  const [addNew, setAddNew] = useState(false);
  const [subTask, setSubTask] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubTasksByTaskId(task.id));
  }, [dispatch]);

  //handling state boolean value, to show input field in order to create new sub task
  const handleAddNewSubTask = () => {
    setAddNew(true);
  };

  const handleCencelationOfNewSubTask = () => {
    setSubTask("");
    setAddNew(false);
  };

  const subTaskInputHtml = () => {
    return (
      <div className="row mx-0 mt-3">
        <div className="col-8">
          <div className="form-group">
            <label htmlFor="sub_task">New Sub Task Discription</label>
            <textarea
              name="sub_task"
              id="sub_task"
              className="form-control"
              defaultValue={subTask}
              onChange={(e) => setSubTask(e.target.value)}
            ></textarea>
            <div className="row mx-0 mt-3">
              <div className="col-12 text-end p-0">
                <button
                  type="button"
                  className="btn btn-primary me-2"
                  onClick={(e) => handleCreateSubTask(e)}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => handleCencelationOfNewSubTask()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleCreateSubTask = (e) => {
    dispatch(subTaskMethods.createSubTask(task.id, subTask));
    setSubTask("");
    setAddNew(false);
  };

  const handleSubTaskEdit = (val) => {
    dispatch(subTaskMethods.updateSubTask(val));
  };

  const handleIsComplete = (e) => {
    if ($(e.target).prop("checked")) {
      dispatch(subTaskMethods.markAsComplete($(e.target).attr("id")));
      e.target.classList.add("completed");
    } else {
      dispatch(subTaskMethods.markAsInComplete($(e.target).attr("id")));
      e.target.classList.remove("completed");
    }
  };

  const handleSubTaskDelete = (id) => {
      Swal.fire({
        title:'Are you sure?',
        text:"You want to delet this sub task.",
        showCancelButton: true,
        confirmButtonText: "Yes Delete",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          dispatch(subTaskMethods.delete(id));
        } 
      });
  };

  const subTasks = useSelector(selectSubTaskList);

  return (
    <div>
      <ul className="list-group list-unstyled">
        {subTasks.length
          ? subTasks.map((task, index) => (
              <li className="list-group-item" key={index}>
                <div className="d-flex flex-row">
                  <div className="sbt-wrapper d-flex flex-row flex-grow-1 pe-3">
                    <input
                      className={
                        "form-check-input  me-2 " +
                        (task.is_completed ? "completed" : "")
                      }
                      type="checkbox"
                      checked={task.is_completed}
                      id={task.id}
                      onChange={(e) => handleIsComplete(e)}
                      aria-label="isCompleted"
                    />
                    <EditableTextTextareaForSubTasks
                      task={task}
                      saveMethod={handleSubTaskEdit}
                      styles={["subtask-description"]}
                    />
                  </div>
                  <div className="subtask-actions me-0">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      // id={task.id}
                      onClick={(e) => handleSubTaskDelete(task.id)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
              </li>
            ))
          : "0 Sub Tasks Found."}
      </ul>
      {addNew ? subTaskInputHtml() : ""}
      <button
        className="btn btn-primary btn-sm mt-4"
        onClick={() => handleAddNewSubTask()}
      >
        Add New Sub Task
      </button>
    </div>
  );
}
