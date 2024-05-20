import React,{useState} from 'react';
import {Modal} from 'react-responsive-modal';
import { Form } from 'react-router-dom';
import FormRow from './FormRow.jsx';
import FormTextarea from './FormTextarea.jsx';
import SubmitBtn from './SubmitBtn.jsx';
import {useDispatch, useSelector} from "react-redux";
import { selectColumnsList, insertTaskInColumn } from '../features/ColumnSlice.js';
import Select from 'react-select';


const TaskViewModal=({open, onClose, Task_id, column_name})=>{


    const handleSelect = (e) => {
    //     setSearchParams({ board: e.label });
      };
    //   const boardQuery = searchParams.get("board");
    //   const selectedBoard=boardQuery?{value:boardQuery,label:boardQuery}:{value:"null",label:"--select Board--"}
    //   let options = boards?.map((b) => {
    //     return { value: b.id, label: b.slug };
    //   });

            return (
                    <Modal open={open} onClose={onClose} center  classNames={{modal:['container-lg']}}>
                    
                        <h1>Create New Task</h1>
                            <span>In List <b><small>Queue</small></b></span>
                             <br/>
                        <div className="row mx-0">
                            <div className="col-12">
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