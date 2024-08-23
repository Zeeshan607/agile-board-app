import React,{useState,useEffect, useRef} from 'react';
import './CommentsList.css';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { taskDiscussionMethods } from '../../features/TaskDiscussionSlice.js';
import { EditorConfig } from '../froalaEditorConfig.js';
import FroalaEditorComponent from 'react-froala-wysiwyg';

export default function CommentsList({list}) {
    const dispatch=useDispatch();
    const [editComment,  setEditComment]=useState("");
    const [editingCommentId, setEditingCommentId]=useState(null);
    const editFormRef = useRef(null);



    const getCommentEditHTML=()=>(
                  <div className='d-flex flex-column' ref={editFormRef}>
                        <FroalaEditorComponent tag='textarea' model={editComment} config={EditorConfig} onModelChange={(value) => setEditComment(`${value}`)}/>
                          <div className='row mx-0 mt-2'>
                              <div className='col-12 text-end'>
                                <button className='btn btn-primary me-2' onClick={()=>handleCommentUpdate()}>Update</button>
                                <button className='btn btn-secondary' onClick={()=>handleCommentEditCancelation()}>Cancel</button>
                              </div>
                          </div>
                      </div>
    )
    

    const HandleCommentEdit =(comment)=>{
        setEditComment(comment.message);
        setEditingCommentId(comment.id);
    }

    const handleCommentEditCancelation=()=>{
      setEditComment("");
      setIsEditing(false);
    }

    const handleCommentUpdate=()=>{
      dispatch(taskDiscussionMethods.editComment(editComment, editingCommentId))
      setEditingCommentId(null);

    }

    const handleClickOutside = (event) => {
      if (editFormRef.current && !editFormRef.current.contains(event.target)) {
        setEditingCommentId(null);
      }
    };
  
  const handleCommentDelete =(id)=>{
    Swal.fire({
      title:'Are you sure?',
      text:"You want to delet this Comment. You won't be able to retrive it again.",
      showCancelButton: true,
      confirmButtonText: "Yes Delete",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(taskDiscussionMethods.deleteComment(id));
      } 
    });
  }


  useEffect(() => {
    if (editingCommentId !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editingCommentId]);




  return (
    <div className='comments-list'>
      <ul className='list-group list-unstyled m-0'>
        {
          list.map(comment=>(
            <li className='comment my-3' key={comment.id} id={'comment-'+comment.id}>
              {
               comment.id === editingCommentId?(
                   getCommentEditHTML()
                ):(
                  <div className="comment-wrapper d-flex flex-row">
                  <div className="flex-col">
                    <img src="/img/avatars/person-placeholder.png" className=' img-fluid rounded-circle comment-profile-img' alt="Commenter-profile" />
                  </div>
                  <div className=" d-flex flex-column flex-grow-1 align-items-start justify-content-center ps-3">
                      <h5 className='mb-1' ><b>{comment.user?comment.user.username:"Unknown"}</b></h5>
                      <div className='m-0' dangerouslySetInnerHTML={{ __html: comment.message }}></div>
                    <div className="row mx-0">
                      <div className="col-12 p-0">
                          <small className='text-decoration-underline me-2 comment-actions' onClick={()=>HandleCommentEdit(comment)}>Edit</small>
                          <small className='text-decoration-underline comment-actions' onClick={()=>handleCommentDelete(comment.id)}>Delete</small>
                      </div>
                    </div>
                  </div>
                  </div>
               ) 
             } 
             
            </li>
          ))
        }
   
   
      </ul>
    </div>
  )
}
