import React,{useState} from "react";
import { Form, useNavigate } from "react-router-dom";
import FormRow from "../components/FormRow.jsx";
import FormTextarea from "../components/FormTextarea.jsx";
import SubmitBtn from "../components/SubmitBtn.jsx";
import CustomRequest from "../utils/customRequest.jsx";
import {toast} from 'react-toastify';
import {useDispatch} from 'react-redux';
import { insertBoard } from "../features/BoardSlice.js";


const AddBoard = () => {
  const [form, setForm ]= useState({});
   const navigate= useNavigate();
   const dispatch= useDispatch()

const addBoard=async ()=>{
      try{
       const resp=await CustomRequest.post('/dashboard/board/create',form);
          const status=  resp.status;
          if(status==200){
            toast.success('Board Created successfully')
            const board= await resp.data.board;
           dispatch(insertBoard({board:board}))
          }
          navigate('/boards')


      }catch(err){
        toast.error(err.response?.data?.msg)
      }
}



  return (
    <div className="container-fluid bg-white">
      <div className="row mx-0">
        <div className="col-12 p-4">
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
            <SubmitBtn text="Save" onClick={addBoard}/>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddBoard;
