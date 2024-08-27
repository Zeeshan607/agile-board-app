import React, { useEffect,useState } from 'react';
import { useNavigate,useParams, useLocation } from "react-router-dom";
import CustomRequest from './../utils/customRequest.jsx';
import { toast } from "react-toastify";

function Invitation() {
  const { workspace_id } = useParams();
  const location = useLocation();
  // Parse the query parameters
  const searchParams = new URLSearchParams(location.search);
  const invitedEmail = searchParams.get('invite');
  const token = searchParams.get('token');
    const navigate=useNavigate();
    const [invitedWorkspace, setInvitedWorkspace]=useState(null);

    useEffect(()=>{

        if(!token || !workspace_id){
            navigate('/page_not_found')
        }

       getWorkspaceById(workspace_id);

    },[workspace_id,token])

   const getWorkspaceById=async (ws_id)=>{
    try{
        const resp= await CustomRequest.get(`/workspace/${ws_id}`);
        if(resp.status===200){
          if(resp.data.workspace){
            setInvitedWorkspace(resp.data.workspace)
          }else{
            toast.error('Invalid Invite URL');
          }
              
        }
    }catch(err){
            toast.error(err);
    }

    }

    const acceptInvite= async ()=>{
        const data={
            'token':token,
            'invitedEmail':invitedEmail,
            'workspace_id':invitedWorkspace.id
        }
        try{
            const resp= await CustomRequest.post('/accept_invite',data);
            if(resp.status===200){
                toast.success('Invite accepted successfully, Please register with your invited Email or Login with your account');
                navigate('/login');
            }
            if(resp.data.error){
                toast.error(resp.data.error);
            }

        }catch(err){
            toast.error('Oops! Something went wrong while trying to accept invitation. please try again or contact administrater');
        }
       
    }

    const declineInvite=async ()=>{
        const data={
          'token':token,
          'invitedEmail':invitedEmail,
          'workspace_id':invitedWorkspace.id
      }
      try{
          const resp= await CustomRequest.post('/decline_invite',data);
          if(resp.status===200 && !resp.data.error){
              toast.success('Invite declined successfully');
              navigate('/login');
          }
          if(resp.data.error){
              toast.error(resp.data.error);
          }

      }catch(err){
          toast.error('Oops! Something when wrong. please try again or contact administrator');
      }
    }

  return (
    <main className="d-flex w-100">
      <div className="container d-flex flex-column">
        <div className="row vh-100">
          <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center mt-4">
                <h1 className="h2">Welcome</h1>
                <p className="lead">Please click "Accept" to accept the invitation For</p>
              </div>

              <div className="card">
                <div className="card-body">

                {
                  !invitedWorkspace?(
                      <h3 className='text-danger'>Invalid Invite: Please ask administrator to re-invite you </h3>
                  ):(
                    <div className="m-sm-4 text-center">
                    <div className="wrap">
                    <h3><b>{invitedWorkspace.title}</b></h3>

                    <button className="btn btn-success btn-lg" onClick={(e)=>acceptInvite(e)}>Accept</button>
                    <br/>
                    </div>
                 <span>If you received this email by mistake click  <a className='link-opacity-10-hover' onClick={(e)=>declineInvite(e)}>Decline</a></span>

                    </div>
                  )
                }
                   

               
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export default Invitation;
