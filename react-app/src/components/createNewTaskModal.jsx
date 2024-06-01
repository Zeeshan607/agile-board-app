import React,{useState, useEffect} from 'react';
import {Modal} from 'react-responsive-modal';
import { Form } from 'react-router-dom';
import FormRow from './FormRow.jsx';
import FormTextarea from './FormTextarea.jsx';
import SubmitBtn from './SubmitBtn.jsx';
import {useDispatch, useSelector} from "react-redux";
import { selectColumnsList, insertTaskInColumn } from '../features/ColumnSlice.js';
import { selectActiveBoard } from '../features/BoardSlice.js';


const CreateNewTask=({open, onClose,column_id})=>{
    const [isLoading, setIsLoading]=useState(false);
    const activeBoard= useSelector(selectActiveBoard);
    const [tasksForm, setTasksForm]= useState({title:'',description:'', column_id:column_id, board_id:activeBoard.id, assigned_to:''});
    // const wsStatus= useSelector(state=>state.workspace.status);
    const activeWsId=useSelector(state=>state.workspace.active.id);
    const dispatch= useDispatch();


useEffect(()=>{
console.log('task-modal mounted');
},[])


                    
    const createTask=async (e)=>{
            e.target.classList.add('disabled');
            try{
                const resp= await CustomRequest.post('/dashboard/task/create',formData);
                    if(resp.status==200){
                        const task= await resp.data?.task;
                    //insert task in column's task list
                    dispatch(insertTaskInColumn(task))
                        toast.success("Task created successfully");
                        e.target.classList.remove('disabled');
                        onClose();
                    }
            
            }catch(err){
                toast.error(err.response?.data?.msg);
                e.target.classList.remove('disabled');
                onClose();
            }
    }

        return (
            <Modal open={open} onClose={onClose} center  classNames={{modal:['container-lg']}}>
                    
                    <h1>Create New Task</h1><hr/>
                    <div className="row mx-0">
                        <div className="col-12">
                            <Form>
                                <FormRow type='text' name='title' labelText={'Title'}  onChange={(e)=> setTasksForm({...tasksForm, title:e.target.value})} />
                                {/* <Select></Select> */}
                                <FormTextarea  name='description' labelText={'Description'}  onChange={(e)=> setTasksForm({... tasksForm, description:e.target.value})} />
                                <SubmitBtn text="Save" onClick={createTask} />
                            </Form>
                        </div>
                    </div>
            </Modal>
        )
}
export default CreateNewTask;