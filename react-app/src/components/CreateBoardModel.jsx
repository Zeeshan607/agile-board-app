import { Modal } from "react-responsive-modal";
import {Form } from 'react-router-dom';
import FormRow from "./FormRow.jsx";
import FormTextarea from "./FormTextarea.jsx";
import SubmitBtn  from './SubmitBtn.jsx';
import { useState } from "react";
import CustomRequest from "../utils/customRequest.jsx";
import {toast} from 'react-toastify';


const CreateBoardModel =({open, onClose, })=>{
        const [form, setForm]= useState({name:'', description:''});

      const  saveBoard= async (e)=>{
                e.target.classList.add('disabled');
                try{
                    const resp=await CustomRequest.post('/dashboard/board/create',form);
                        toast.success('Board Created successfully');
                        setForm({...form});
                        onClose();
                }catch(err){
                    toast.error(err.response?.data?.msg);
                    setForm({...form});
                    onClose();
                }
                // setTimeout(()=>{
                //     location.reload();
                // },2000)

        }






    return (

        <Modal open={open} onClose={onClose} center classNames={{modal:["container-lg"]}}>
                <h2>Create new Board</h2>
                <hr/>
                <div className="container-fluid">
                    <div className="row mx-0">
                        <div className="col-12">
                        <Form>
                
                            <FormRow
                            name="name"
                            type="text"
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                          
                            <FormTextarea
                            name="description"
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            />

                            <SubmitBtn text="Save" onClick={saveBoard}  />
                        </Form>
                        </div>
                    </div>
               
           
          </div>
        </Modal>
    )
}

export default CreateBoardModel;