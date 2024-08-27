import React, {useState,useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { modalMethods, selectSendInvitationModal } from "../features/modalSlice.js"
import { Modal } from "react-responsive-modal";
import { selectWorkspaceList } from "../features/workspaceSlice.js";
import CustomRequest from "../utils/customRequest.jsx";
import Select from "react-select";


const SendInvitationModal=()=>{

    const isOpenSendInviteModal=useSelector(selectSendInvitationModal);
    const [optionsList,setOptionsList]=useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let ws_list = useSelector(selectWorkspaceList);
    const [selectedWorkspace, setSelectedWorkspace]=useState(null);
    const dispatch=useDispatch();
    const defaultValue = { value: null, label: "--Select Workspace--" }
    const [recipientEmail, setRecipientEmail]=useState('');

useEffect(() => {
    let list=[]
    if(Object.keys(ws_list).length !== 0){
      const shared= ws_list.workspace?.shared;
      const owned=ws_list.workspace?.owned;
      shared.forEach(ws => {

         const newObj={...ws,title: ws.title+' (shared)'}

        list.push({ value: newObj.id, label: newObj.title });
      });
      owned.forEach(ws => {
        list.push({ value: ws.id, label: ws.title });
      });

      setOptionsList(list);
      setIsLoading(false);
    }


  }, [ws_list]);


    const handleSendInvite=async(e)=>{
        e.target.classList.add('disabled');
        $(e.target).html('<i class="fa fa-spinner fa-spin"></i>');
        try{
            const data={
                'email':recipientEmail,
                "workspace_id":selectedWorkspace.value,
            }
            const resp=await CustomRequest.post('/dashboard/send_invite_to_member', data);
            if(resp.status==200){
                toast.success('Invite Sent successfully');
                e.target.classList.remove('disabled');
                $(e.target).html('Send');
                dispatch(modalMethods.closeSendInvitationModal());
            }

        }catch(err){
            toast.error(err);
            e.target.classList.remove('disabled');
            $(e.target).html('Send');
 
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
                    <div className="form-group my-3">
                            <label htmlFor="">Select Workspace</label>
                            <Select
                                defaultValue={defaultValue}
                                onChange={(obj)=>setSelectedWorkspace(obj)}
                                options={optionsList}
                                placeholder="0 Workspace found"
                                id="workspace-select"
                                isLoading={isLoading}
                            ></Select>
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