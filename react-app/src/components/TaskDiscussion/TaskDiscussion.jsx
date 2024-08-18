import React,{useState} from 'react';
import CommentsList from "./CommentsList.jsx";
import { useSelector } from 'react-redux';
import { selectComments } from '../../features/TaskDiscussionSlice.js';


export default function TaskDiscussion(task) {

    const [comment, setComment]=useState('');


    const handleCommentSave=()=>{
      
    }
    const comments=useSelector(selectComments);


  return (
    <div className='container-fluid'>
    
        <div className="row mx-0">
          <div className="col-8">
            <div className="form-group">
              <textarea name="comment" id="comment" onChange={(e)=>setComment(e.target.value)} className='form-control' defaultValue={comment}></textarea>
              <div className="row mx-0">
                <div className="col-12 text-end pe-0">
                  <button type="button" className='btn btn-primary mt-2' onClick={()=>handleCommentSave}>Comment</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      
        <div className="row mx-0">
          <div className="col-12">
            {
              !comments.length?(
                <p>Be first to start Discussion.</p>
              ):(
                <CommentsList list={comments} />
              )
            }
      
          </div>
        </div>


    </div>
  )
}
