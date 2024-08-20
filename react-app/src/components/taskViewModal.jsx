import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import { Form } from "react-router-dom";
import FormRow from "./FormRow.jsx";
import FormTextarea from "./FormTextarea.jsx";
import SubmitBtn from "./SubmitBtn.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  selectColumnsList,
  insertTaskInColumn,
} from "../features/ColumnSlice.js";
import Select from "react-select";
import moment from "moment";
import WysiwygTextarea from "./TaskMeta/wysiwygTextarea.jsx";
import CustomRequest from "../utils/customRequest.jsx";
import { taskMethods } from "../features/TaskSlice.js";
import SubTasks from "./SubTasks.jsx";
import TaskDiscussion from "./TaskDiscussion/TaskDiscussion.jsx";
import { selectSubTaskList, subTaskMethods } from "../features/SubTaskSlice.js";
import Swal from "sweetalert2";

const TaskViewModal = ({ open, onClose, task, col_name }) => {
  const [ddInputFocus, setDdInputFocus] = useState(false);
  const [textInputFocus, setTextInputFocus] = useState(false);
  const [dueDate, setDueDate] = useState(task.due_date);
  const [title, setTitle] = useState(task.title);
  const dispatch = useDispatch();
  const subTasksList=useSelector(selectSubTaskList); 

  const handleSelect = async (e) => {
    if (e.value != "") {
      let update = { ["priority"]: e.value };
      dispatch(taskMethods.editTaskPriority(task.id, update));
    }
  };

  const handleInputFocus = (e, obj) => {
    let targetId = e.target.getAttribute("id");
    if (targetId == "title") {
      setTextInputFocus(true);
    }
    if (targetId == "due_date") {
      setDdInputFocus(true);
    }
  };

  const cencleInputEdit = (e, obj) => {
    if (textInputFocus) {
      setTextInputFocus(false);
    }
    if (ddInputFocus) {
      setDdInputFocus(false);
    }
  };

  const handleTitleUpdate = async (e) => {
    e.target.classList.add("disabled");
    if (title != "") {
      let update = { ["title"]: title };
      dispatch(taskMethods.editTaskTitle(task.id, update));
      e.target.classList.remove("disabled");
      setTextInputFocus(false);
    }
  };

  const handleDdUpdate = async (e) => {
    e.target.classList.add("disabled");
    if (dueDate != "") {
      let update = { ["due_date"]: moment(dueDate).format("YYYY-MM-DD") };
      dispatch(taskMethods.editTaskDueDate(task.id, update));
      e.target.classList.remove("disabled");
      setDdInputFocus(false);
    }
  };

  const priorityOptions = [
    { value: 1, label: "High" },
    { value: 2, label: "Medium" },
    { value: 3, label: "Normal" },
  ];
  const taskPriority = () => {
    if (task.priority) {
      if (task.priority == 1) {
        return { value: 1, label: "High" };
      }
      if (task.priority == 2) {
        return { value: 2, label: "Medium" };
      }
      if (task.priority == 3) {
        return { value: 3, label: "Normal" };
      }
    }
    return null;
  };

  const handleDeleteAllSubTask = (e, parent_task_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete All sub tasks.",
      showCancelButton: true,
      confirmButtonText: "Yes Delete",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(subTaskMethods.deleteAllSubTasks(parent_task_id));
      }
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      id={task.id}
      classNames={{ modal: ["container-lg", "py-4", ""] }}
      focusTrapped={false}
    >
      <h1 className="text-uppercase">{task.title}</h1>
      <span>
        In List{" "}
        <b>
          <small className="text-primary">{col_name}</small>
        </b>
      </span>
      <br />
      <hr />
      <div className="row mx-0">
        <div className="col-6">
          <h3>Meta</h3>
          <div
            className="form-group my-2"
            onFocus={(e) => handleInputFocus(e, this)}
          >
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={title}
              className="form-control"
            />
            {textInputFocus ? (
              <div className="row mx-0 mt-2">
                <div className="col-12 text-end ">
                  <button
                    className="btn btn-primary me-2"
                    onClick={(e) => handleTitleUpdate(e)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    data-id="title"
                    onClick={(e) => cencleInputEdit(e, this)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-group my-2">
            <label htmlFor="priority">Priority</label>
            <Select
              defaultValue={
                taskPriority ?? { value: "null", label: "--select Priority--" }
              }
              onChange={handleSelect}
              options={priorityOptions}
              placeholder="--select Priority--"
            />
          </div>

          <div
            className="form-group my-4"
            onFocus={(e) => handleInputFocus(e, this)}
          >
            <label htmlFor="due_date">Due Date</label>
            <input
              type="date"
              name="due_date"
              id="due_date"
              onChange={(e) => setDueDate(e.target.value)}
              defaultValue={moment(dueDate).format("YYYY-MM-DD")}
              className="form-control"
            />
            {ddInputFocus ? (
              <div className="row mx-0 mt-2">
                <div className="col-12 text-end ">
                  <button
                    className="btn btn-primary me-2"
                    onClick={(e) => handleDdUpdate(e)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    data-id="due_date"
                    onClick={(e) => cencleInputEdit(e, this)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="form-group my4">
            <label htmlFor="description">Descripiton</label>
            <WysiwygTextarea task_id={task.id} description={task.description} />
          </div>
        </div>
      </div>
      <hr />
      <div className="row mx-0 mt-4">
        <div className="col-12 ps-1">
          <div className="row mx-0">
            <div className="col-6 ps-0">
              <h3 className="">Sub Tasks</h3>
            </div>
            <div className="col-6  text-end">
                {
                    subTasksList.length?(

                        <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={(e) => handleDeleteAllSubTask(e, task.id)}
                      >
                        Delete all
                      </button>

                    ):''
                }
          
            </div>
          </div>

          <SubTasks task={task} />
        </div>
      </div>
      <hr />

      <div className="row mx-0 mt-4">
        <div className="col-12 ps-1">
          <div className="row mx-0">
            <div className="col-6 ps-0">
              <h3 className="">Discussion</h3>
            </div>
            <div className="col-6  text-end">
              <button className="btn btn-sm btn-outline-primary">
                {" "}
                Delete all
              </button>
            </div>
          </div>
          <TaskDiscussion task={task} />
        </div>
      </div>
    </Modal>
  );
};

export default TaskViewModal;
