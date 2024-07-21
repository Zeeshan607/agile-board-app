import React,{useState} from 'react';
import {Modal} from 'react-responsive-modal';
import { Form } from 'react-router-dom';
import FormRow from './FormRow.jsx';
import FormTextarea from './FormTextarea.jsx';
import SubmitBtn from './SubmitBtn.jsx';
import {useDispatch, useSelector} from "react-redux";
import { selectColumnsList, insertTaskInColumn } from '../features/ColumnSlice.js';
import Select from 'react-select';
import moment from 'moment';

const TaskViewModal=({open, onClose, task, col_name})=>{


    const handleSelect = (e) => {
    //     setSearchParams({ board: e.label });
      };
    //   const boardQuery = searchParams.get("board");
    //   const selectedBoard=boardQuery?{value:boardQuery,label:boardQuery}:{value:"null",label:"--select Board--"}
    //   let options = boards?.map((b) => {
    //     return { value: b.id, label: b.slug };
    //   });
    const priorityOptions=[
        {value:1, label:'High'},
        {value:2, label:'Medium'},
        {value:3, label:'Normal'}
    ]
    const taskPriority=()=>{
        console.log(task.priority)
        if(task.priority){
            if(task.priority==1){
                return {value:1, label:'High'}
            }
            if(task.priority==2){
                return {value:2, label:'Medium'}
            }
            if(task.priority==3){
                return {value:3, label:'Normal'}
            }
        }
      return null;
    }

            return (
                    <Modal open={open} onClose={onClose} center id={task.id} classNames={{modal:['container-lg','py-4','']}}>
                    
                        <h1 className='text-uppercase'>{task.title}</h1>
                            <span>In List <b><small className='text-primary'>{col_name}</small></b></span>
                             <br/>
                             <hr/>
                        <div className="row mx-0">
                            <div className="col-6">

                                <div className="form-group my-2">
                                    <label htmlFor="priority">Priority</label>
                                     <Select
                                        defaultValue={taskPriority??{value:"null",label:"--select Priority--"}}
                                        onChange={handleSelect}
                                        options={priorityOptions}
                                        placeholder="--select Priority--"
                                        /> 
                                </div>

                                <div className="form-group my-4">
                                    <label htmlFor="due_date">Due Date</label>
                                   <input type="date" name="due_date" id="due_date" defaultValue={ moment(task.due_date).format('YYYY-MM-DD')} className='form-control' />
                                </div>

                                <div className="form-group my4">
                                    <label htmlFor="description">Descripiton</label>
                                    <textarea name="description" id="description" className='form-control' defaultValue={task.description}></textarea>
                                </div>
                            {/* <Select
                                defaultValue={{value:"null",label:"--select Board--"}}
                                onChange={handleSelect}
                                options={}
                                placeholder="0 board found"
                                />  */}
                                </div>
                            </div>
                    </Modal>
            )
}

export default TaskViewModal;