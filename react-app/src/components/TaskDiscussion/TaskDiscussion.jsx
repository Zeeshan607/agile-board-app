import React, { useEffect, useState } from "react";
import CommentsList from "./CommentsList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskDiscussions, selectComments , taskDiscussionMethods} from "../../features/TaskDiscussionSlice.js";

import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/plugins.pkgd.min.js';
import FroalaEditorComponent from "react-froala-wysiwyg";
import { EditorConfig } from "../froalaEditorConfig.js";
import CustomRequest from "../../utils/customRequest.jsx";




export default function TaskDiscussion({task}) {
  const [comment, setComment] = useState("");
  const comments = useSelector(selectComments);
  const [isAddingNew,setIsAddingNew]=useState(false);
  const dispatch = useDispatch();


  useEffect(()=>{
    // console.log(task)
      dispatch(fetchTaskDiscussions(task.id));
  },[dispatch])

  const handleCommentSave = () => {
    if(!comment){
      setIsAddingNew(true);
    }else{
        dispatch(taskDiscussionMethods.createNewComment(comment,task.id));
        setComment('');
        setIsAddingNew(false);
    }

  };


  return (
    <div className="container-fluid p-0">
      <div className="row mx-0">
        <div className="col-12 ps-0">
          <div className="form-group" >
            {
              isAddingNew?(
               <FroalaEditorComponent tag='textarea' model={comment} config={EditorConfig} onModelChange={(value) => setComment(`${value}`)}/>
              ):(
                <input type="text" name="comment" id="comment" placeholder="Write a comment" onBlur={()=>setIsAddingNew(false)} onFocus={()=>setIsAddingNew(true)} className="form-control" />
              )
            }
            
            <div className="row mx-0  mt-2">
              <div className="col-12 text-end pe-0">
                {
                  isAddingNew?(
                    <button type="button" className="btn btn-outline-secondary me-2" onClick={()=>setIsAddingNew(false)}>Cencel</button>
                  ):('')
                }

                <button
                  type="button"
                  className={"btn btn-primary"+ (!isAddingNew?" disabled":'')}
                  onClick={() => handleCommentSave()}
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mx-0">
        <div className="col-12 ps-0">
          {!comments.length ? (
            <p>Be first to start Discussion.</p>
          ) : (
            <CommentsList list={comments} />
          )}
        </div>
      </div>
    </div>
  );
}
