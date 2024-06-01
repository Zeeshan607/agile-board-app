import React , {useState,useEffect, useCallback} from "react";
import CreateNewTask from "./createNewTaskModal.jsx";
import TaskList from "../components/TaskList.jsx";
import { selectTasks } from "../features/TaskSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers } from '../features/WorkspaceMembersSlice.js';

const ColumnsList = ({column, wsId})=>{
  const dispatch= useDispatch();
    const [openNewTaskModal, setOpenNewTaskModal] = useState(false);
    
    const openTaskModal = useCallback(() =>{
      setOpenNewTaskModal(true)
      dispatch(fetchMembers(wsId));
    },[]);
    const closeTaskModal = useCallback(() => setOpenNewTaskModal(false),[]);




// useEffect(()=>{
// console.log('column list component mounted');
// },[])



    const tasks = useSelector(selectTasks);
    return (

        <div className="card column" >
        <div className="card-header bg-transparent">
          <h1 className="card-title">{column.name}</h1>
          <p className="card-subtitle">{column.description}</p>
        </div>
        <div className="card-body">
          <ul className="list-unstyled tasks-list">
            <TaskList tasks={tasks} col_id={column.id} />
          </ul>
        </div>
        <div className="card-footer bg-transparent">
          <button role="button"
            onClick={openTaskModal }
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
    )
};

export default ColumnsList;