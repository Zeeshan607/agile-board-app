import React, {useState,useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { modalMethods, selectSendInvitationModal } from "../features/modalSlice.js"
import { Modal } from "react-responsive-modal";
import { selectActiveWorkspace, selectWorkspaceList } from "../features/workspaceSlice.js";
import CustomRequest from "../utils/customRequest.jsx";
import Select from "react-select";


const SendInvitationModal=()=>{

    const isOpenSendInviteModal=useSelector(selectSendInvitationModal);
    let activeWs = useSelector(selectActiveWorkspace);
    const [wsToInvite,setWsToInvite]=useState('');
    const dispatch=useDispatch();
    const [recipientEmail, setRecipientEmail]=useState('');
    

useEffect(() => {

if(activeWs){
    setWsToInvite(activeWs);
}


  }, [activeWs]);


    const handleSendInvite=async(e)=>{
        e.target.classList.add('disabled');
        $(e.target).html('<i class="fa fa-spinner fa-spin"></i>');
        if(!wsToInvite){
            alert('Active workspace is not recognized. Please try again or contact adminstrator');
        }else{
            try{
                const data={
                    'email':recipientEmail,
                    "workspace_id":wsToInvite.id,
                }
                const resp=await CustomRequest.post('/dashboard/send_invite_to_member', data);
                if(resp.status==200){
                    toast.success('Invite Sent successfully');
                    e.target.classList.remove('disabled');
                    $(e.target).html('Send');
                    dispatch(modalMethods.closeSendInvitationModal());
                }
    
            }catch(err){
                if(err.response.status==403){
                    toast.error(err.response.data.error);
                }else{
                    toast.error("Oops! something went Wrong while trying to send Invitation.");
                }
            
                e.target.classList.remove('disabled');
                $(e.target).html('Send');
     
            }
        }
   


    }
 



    return (
        <Modal
            open={isOpenSendInviteModal}
            onClose={()=>dispatch(modalMethods.closeSendInvitationModal())}
            center
            classNames={{ modal: ["container-lg"] }}>

                <h3>Send Invitation to User</h3>
            <hr />
        <div className="container-fluid">
            <div className="row mx-0">
                <div className="col-12">
                    <div className="form-group">
                        <label htmlFor="recipientEmail">Recipient Email</label>
                        <input type="email" name="recipientEmail" placeholder="Enter Recipient Email" onChange={(e)=>setRecipientEmail(e.target.value)} id="recipientEmail" className="form-control " />
                    </div>
                </div>
            </div>
            <div className="row mx-0 mt-3">
                <div className="col-12 text-end ">
                    <button type="button" className="btn btn-primary me-2" onClick={(e)=>handleSendInvite(e)}>Send</button>
                    <button type="button" className="btn btn-outline-secondary" onClick={()=>dispatch(modalMethods.closeSendInvitationModal())}>Cancel</button>
                </div>
            </div>
        </div>

    </Modal>
    )
}

export default SendInvitationModal;