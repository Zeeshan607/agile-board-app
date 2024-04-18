
import { Form ,useNavigate} from "react-router-dom";
import FormRow from '../components/FormRow.jsx';
import SubmitBtn from "../components/SubmitBtn.jsx"
import CustomRequest from "../utils/customRequest.jsx";
import {toast} from 'react-toastify';
import {useState} from 'react';


const AddProject= ()=>{
    
const [form, setForm]=useState({})
const navigate=useNavigate();



const create=async (e)=>{
        e.preventDefault

        try{
          const resp= await CustomRequest.post('/dashboard/project/create',form)
            if(resp.status==200){
                toast.success(resp.data?.msg)
            }
            setForm({})
           navigate('/projects')
        }catch(err){
            toast.error(err.response?.data?.msg);
            setForm({})
        }


}



return (
    <div className="container-fluid bg-white p-4">
        <div className="row mx-0">
            <div className="col-12">
                <h1>Add New Project</h1>
            </div>
        </div>
        <div className="row mx-0">
            <div className="col-12 py-5">

                <Form >
                    <FormRow type="text"  name="name" onChange={(e)=>setForm({...form, name:e.target.value})} />
                    <FormRow type="text" name="description" onChange={(e)=>setForm({...form, description:e.target.value})}/>
                    <SubmitBtn onClick={create} text="Save" />
                </Form>

            </div>
        </div>
    </div>
)

}
export default AddProject;