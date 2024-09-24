import React, { useEffect,useState } from 'react';
import { useNavigate,useParams, useLocation, Link } from "react-router-dom";
import CustomRequest from './../utils/customRequest.jsx';
import { toast } from "react-toastify";
import { handleErrors } from '../utils/helpers.js';
import moment from 'moment';
function Invitation() {
  const { workspace_id } = useParams();
  const location = useLocation();
  // Parse the query parameters
  const searchParams = new URLSearchParams(location.search);
  const invitedEmail = searchParams.get('invite');
  const token = searchParams.get('token');
  const navigate=useNavigate();
  const [invitedWorkspace, setInvitedWorkspace]=useState(null);
  const [invite, setInvite]=useState(null);
 const [isInviteExpire, setIsInviteExpire]=useState(false);

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
    const getInvite=async (token, invitedEmail)=>{

        try{
          const resp=await CustomRequest.get(`/invite/get_by_email_and_token/${token}/${invitedEmail}`);
          if(resp.status==200){
            // console.log(resp.data.invite)
            setInvite(resp.data.invite);
          }
        }catch(err){
            handleErrors(err);
        }

    }


  // Check for invite expiry
  useEffect(() => {
    if (invite) {
      const now = moment();
      if (now.isAfter(moment(invite.expires_at))) {
        setIsInviteExpire(true);
      }
    }
  }, [invite, token]);



  useEffect(()=>{

      if(!token || !workspace_id){
          navigate('/page_not_found')
      }
      getInvite(token, invitedEmail);
      getWorkspaceById(workspace_id);

  },[workspace_id, token,])



  if(!invite){
    return (
      <main className="d-flex w-100">
      <div className="container d-flex flex-column">
          <div className="row vh-100">
            <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
              <div className="d-table-cell align-middle">
                <div className="card">
                  <div className="card-body">
                    <h3 className='text-danger'>Invalid or declined Invite: Please ask administrator to re-invite </h3>
                   <Link to={'/'} className="btn btn-primary"> Go to Login Page</Link>
                 </div>
               </div>
              </div>
           </div>
          </div>
       </div>
      </main>
    )
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
              isInviteExpire?(
                <>
                  <h3 className='text-danger'>Invite Expired: Please ask administrator to re-invite  </h3>
                  <Link to={'/'} className="btn btn-primary"> Go to Login Page</Link>
                  </>
                ):(
                  !invitedWorkspace?(
                    <>
                    <h3 className='text-danger'>Invalid Invite: Please ask administrator to re-invite </h3>
                    <Link to={'/'} className="btn btn-primary"> Go to Login Page</Link>
                    </>
                ):(
                  <>
                  <div className="m-sm-4 text-center">
                  <div className="wrap">
                  <h3><b>{invitedWorkspace.title}</b></h3>
                    {
                      invite.status!=="accepted"?(
                        <button className="btn btn-success btn-lg" onClick={(e)=>acceptInvite(e)}>Accept</button>
                      ):(
                        <span>You have already accepted this invite <Link to="/">Login</Link> to access the workspace</span>
                      )
                    }  
                  
                  <br/>
                  </div>
                  </div>

               <span className='d-flex'>If you received this email by mistake or don't want to accept this invite click &nbsp; <a className='link-opacity-10-hover d-inline' onClick={(e)=>declineInvite(e)}> Decline</a></span>

                  </>
                )

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
