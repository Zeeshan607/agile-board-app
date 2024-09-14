import React,{useState} from 'react';
import { Form } from 'react-router-dom';
import FormRow from './FormRow.jsx';
import FormTextarea from './FormTextarea.jsx';
import SubmitBtn from './SubmitBtn.jsx';
import {useDispatch, useSelector} from "react-redux";
import TaskViewModal from './taskViewModal.jsx';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { useDraggable } from '@dnd-kit/core';
import "./TaskList.css";
import moment from 'moment';





const TaskList=({task, parent, index})=>{

const [isOpenTaskViewModel,setIsOpenTaskViewModel]=useState(false);
const openTaskViewModel=()=>setIsOpenTaskViewModel(true);
const closeTaskViewModel=()=>setIsOpenTaskViewModel(false);


  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({id:task.id,data:{type:'item', parent:parent, task:task}});


  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity:isDragging?'.7':1,
  };
  // console.log(style);

   const handleTaskClick=(task_id)=>{
      openTaskViewModel();

    }

            return (
           
                    // <React.Fragment key={task.id}> ///style={style} {...attributes} {...listeners}
                  
                    <li className="task" draggable="true" ref={setNodeRef} style={style} {...attributes}  {...listeners}   id={task.id} key={index}>
                    <div className="task-link" onClick={handleTaskClick}>
                      <div className="d-flex flex-row task-header">
                        <div className="priority flex-fill">
                          {
                            task.priority==1?(
                              <span className="badge bg-danger" title="priority">
                                High
                              </span>
                            ): task.priority ==2?(
                                  <span className="badge bg-warning" title="priority">
                                   Medium
                                  </span>
                            ):(
                            <span className="badge bg-secondary" title="priority">
                              Normal
                             </span>
                             )
                          }
                         
                        </div>
                        {/* <div className="menu flex-fill text-end ">
                          <div className="dropdown position-relative">
                          <i className="fas fa-arrows-alt mx-3"></i>
                            <a
                              href="#"
                              data-bs-toggle="dropdown"
                              data-bs-display="static"
                              aria-expanded="true"
                            >
                              <i className=" fa fa-ellipsis-v"></i>
                            </a>
    
                            <div
                              className="dropdown-menu dropdown-menu-end "
                              data-bs-popper="static"
                            >
                              <a className="dropdown-item" href="#">
                                Action
                              </a>
                              <a className="dropdown-item" href="#">
                                Another action
                              </a>
                              <a className="dropdown-item" href="#">
                                Something else here
                              </a>
                            </div>
                          </div>
                        </div> */}
    
                      </div>
              
                        <h4>{task.title}</h4>
    
                      <div className="d-flex flex-row task-footer">
                        <div className="added-by flex-fill">
                          <a className="comments ms-2 text-decoration-none text-dark-light">
                            <i className="fa fa-comments me-1"></i>
                               {task.discussionsCount>0?task.discussionsCount+"+":task.discussionsCount}
                          </a>
                        </div>
                        <div className="created_at flex-fill text-end">
                          { !task.due_date?(""): (<small><b>Due Date:</b> {moment(task.due_date).format('DD-MM-YYYY')} </small> )}
                        </div>
                        
                      </div>
                      </div>
                      <TaskViewModal onClose={closeTaskViewModel} task={task} col={parent} open={isOpenTaskViewModel}></TaskViewModal>
                    </li>
    
        
                    // </React.Fragment>
              
            )
}

export default TaskList;