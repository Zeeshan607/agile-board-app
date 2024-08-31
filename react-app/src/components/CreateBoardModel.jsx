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
import { modalMethods,selectCreateBoardModal } from "../features/modalSlice.js";


const CreateBoardModel =({ws_id })=>{
        const [form, setForm]= useState({name:'', description:'', ws_id:''});
        const dispatch=useDispatch();
        const isOpenCreateBoardModal=useSelector(selectCreateBoardModal); 


      const saveBoard= async (e)=>{  
                e.target.classList.add('disabled');
                form.ws_id=ws_id;
                dispatch(boardMethods.create(form));
                e.target.classList.remove('disabled');
                setForm({...form});

        }




    const boards=useSelector(selectBoardsList);
            
    return (

        <Modal open={isOpenCreateBoardModal} onClose={()=>dispatch(modalMethods.closeCreateBoardModal())} center classNames={{modal:["container-lg"]}}>
      
                    {
                    !boards.length?(
                        <div className="">
                        <h3><b>Wellcome. </b></h3>
                        <small>It seems that you don't have any boards in this workspace. Please create your first board. </small>
                        </div>

                    ):(
                        <div className="">
                            <h3><b>Create new Board</b></h3>
                        </div>
                    )
                    }
             

                <hr/>

                <div className="container-fluid">
                    <div className="row mx-0">
                        <div className="col-12">
                        <Form>
                
                            <FormRow
                            name="name"
                            type="text"
                            placeholder="Board name here"
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                          
                            <FormTextarea
                            name="description"
                            placeholder="Board description here"
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            />

                            <SubmitBtn text="Create" onClick={(e)=>saveBoard(e)}  />
                        </Form>
                        </div>
                    </div>
               
           
          </div>
        </Modal>
    )
}

export default CreateBoardModel;