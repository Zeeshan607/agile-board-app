import { Modal } from "react-responsive-modal";
import {Form } from 'react-router-dom';
import FormRow from "./FormRow.jsx";
import FormTextarea from "./FormTextarea.jsx";
import SubmitBtn  from './SubmitBtn.jsx';
import { useEffect, useState } from "react";
import CustomRequest from "../utils/customRequest.jsx";
import {toast} from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { boardMethods, selectBoardsList } from "../features/BoardSlice.js";
import { modalMethods,selectCreateBoardModal, selectCreateNewColumnModal } from "../features/modalSlice.js";
import { columnsTaskMethods } from "../features/ColumnsTasksSlice.js";


const CreateColumnModel =({board_id})=>{
        const [form, setForm]= useState({name:'', description:'', board_id:''});
        const dispatch=useDispatch();
        const isOpenCreateColumnModal=useSelector(selectCreateNewColumnModal);

      const saveColumn= async (e)=>{  
                e.target.classList.add('disabled');
                form.board_id=board_id;
                dispatch(columnsTaskMethods.createColumn(form));
                e.target.classList.remove('disabled');
                setForm({...form});
                dispatch(modalMethods.closeCreateNewColumnModal());

        }




    const boards=useSelector(selectBoardsList);
            
    return (

        <Modal open={isOpenCreateColumnModal} onClose={()=>dispatch(modalMethods.closeCreateNewColumnModal())} center classNames={{modal:["container-lg"]}}>
      
                
            <div className="">
                <h3><b>Create new Column</b></h3>
            </div>
                
                <hr/>

                <div className="container-fluid">
                    <div className="row mx-0">
                        <div className="col-12">
                        <Form>
                            <FormRow
                            name="name"
                            type="text"
                            placeholder="Column name here"
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                          
                            <FormTextarea
                            name="description"
                            placeholder="Column description here"
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            />

                            <SubmitBtn text="Save" onClick={(e)=>saveColumn(e)}  />
                        </Form>
                        </div>
                    </div>
               
           
          </div>
        </Modal>
    )
}

export default CreateColumnModel;