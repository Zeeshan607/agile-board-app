import React ,{useState} from 'react';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import CustomRequest from '../../utils/customRequest';
import { useDispatch } from 'react-redux';
import { taskMethods } from '../../features/TaskSlice';



const WysiwygTextarea =({task_id,description})=>{

    const [isEditable, setIsEditable]= useState(false);
    const [data, setData]=useState(description);
    const dispatch=useDispatch();



    const handleDoubleClick=()=>{
        setIsEditable(true);
    }
    const handleChange=(val)=>{
            setData(`${val}`);

    }
const handleSave= async (e)=>{
    e.target.classList.add('disabled');

   
    if(data!=""){
        let update={['description']:data};
        dispatch(taskMethods.editTaskDescription(task_id, update))
        e.target.classList.remove('disabled');
    }



}
// console.log(data)
return(
    <div onDoubleClick={handleDoubleClick} >
    {isEditable?(
        <React.Fragment> 
     <FroalaEditorComponent tag='textarea' model={data} onModelChange={(e)=>handleChange(e)}/>
      <div className="row mx-0 mt-2">
        <div className="col-12 text-end ">
        <button className="btn btn-primary me-2" onClick={(e)=>handleSave(e)}>Save</button>
        <button className="btn btn-outline-secondary" onClick={()=>setIsEditable(false)}>Cancel</button>
        </div>

      </div>  
      </React.Fragment>
):( <div className='task-description' dangerouslySetInnerHTML={{__html: data}}></div> )


}


</div>
)
}
export default WysiwygTextarea