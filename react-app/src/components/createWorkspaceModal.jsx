import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {modalMethods, selectCreateWorkspaceModal } from '../features/modalSlice.js';
import Modal from 'react-responsive-modal';
import { wsMethods } from '../features/workspaceSlice.js';


const CreateWorkspaceModal=()=>{

const [title, setTitle]=useState('');
const isOpenCreateWorkspaceModal=useSelector(selectCreateWorkspaceModal);
const dispatch=useDispatch();



const handleCreateWorkspace=(e)=>{
    dispatch(wsMethods.create(title));
}


    return (
        <Modal
        open={isOpenCreateWorkspaceModal}
        onClose={()=>dispatch(modalMethods.closeCreateWorkspaceModal())}
        center
        classNames={{ modal: ["container-lg"] }}>

        <h3>Create Workspace</h3>
        <hr />

        <div className="container-fluid bg-white">
            <div className="row mx-0">
                <div className="col-12">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" className="form-control" onChange={(e)=>setTitle(e.target.value)} />
                    </div>
                    <div className="row mx-0 mt-4">
                        <div className="col-12 text-end">
                            <button type="button" className="btn btn-primary" onClick={(e)=>handleCreateWorkspace(e)}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Modal>
    )
}

export default CreateWorkspaceModal;