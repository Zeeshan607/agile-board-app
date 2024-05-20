import React,{useState} from 'react';
import { Form } from 'react-router-dom';
import FormRow from './FormRow.jsx';
import FormTextarea from './FormTextarea.jsx';
import SubmitBtn from './SubmitBtn.jsx';
import {useDispatch, useSelector} from "react-redux";
import TaskViewModal from './taskViewModal.jsx';



const TaskList=({tasks, Board_id, col_id})=>{


   const handleTaskClick=(task_id)=>{

    }

            return (
                <React.Fragment>
                    {
                        
                            tasks.map(task=>(
                  
                              col_id == task.column_id?(
                                <React.Fragment key={task.id}>
                              
                                <li className="task" draggable="true">
                                <div className="task-link" onClick={handleTaskClick}>
                                  <div className="d-flex flex-row task-header">
                                    <div className="priority flex-fill">
                                      <span className="badge bg-danger" title="priority">
                                        High
                                      </span>
                                    </div>
                                    <div className="menu flex-fill text-end ">
                                      <div className="dropdown position-relative">
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
                                    </div>
                
                                  </div>
                          
                                    <h4>{task.title}</h4>
                
                                  <div className="d-flex flex-row task-footer">
                                    <div className="added-by flex-fill">
                                      <a className="comments ms-2 text-decoration-none text-dark-light">
                                        <i className="fa fa-comments"></i>
                                           200+
                                      </a>
                                    </div>
                                    <div className="created_at flex-fill text-end">
                                     <span><b>Due:</b> 18 Jul 2018</span> 
                                    </div>
                                    
                                  </div>
                                  </div>
                                </li>
                
                                <TaskViewModal></TaskViewModal>
                                </React.Fragment>
                         
                              ):null
                             
                              
                          
                               
                            ))
                       
                    }
               
               </React.Fragment>
            )
}

export default TaskList;