import { useEffect } from "react";
import CustomRequest from "../utils/customRequest.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveWorkspace, setActiveWorkspace } from "../features/workspaceSlice.js";
import { fetchMembers,selectWorkspaceMembers,wsWithMemberMethods } from "../features/WorkspaceMembersSlice.js";
import { modalMethods } from "../features/modalSlice.js";
import { useAuth } from "../hooks/useAuth.jsx";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const WorkspaceMembers=()=>{

const dispatch=useDispatch();
const activeWs=useSelector(selectActiveWorkspace);
const workspaceWithMembers=useSelector(selectWorkspaceMembers);
const navigate=useNavigate()
;const {user}=useAuth();
const authenticatedUser=user;
// console.log(authenticatedUser.userId);
useEffect(()=>{

    if(activeWs){
        dispatch(fetchMembers(activeWs.id));
      
    }else{
        if(authenticatedUser.last_active_workspace){
            dispatch(setActiveWorkspace({"ws_id":authenticatedUser.last_active_workspace}));
        }else{
            dispatch(modalMethods.openSelectWorkspaceModal());
        }
    
    }

   
},[activeWs])

const handleUserLeavingWorkspace=(user_id, ws_id)=>{

    Swal.fire({
        title: "Are you sure?",
        text: "You want to leave this workspace!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Leave!",
      }).then( (result) => {
            if(result.isConfirmed){
                dispatch(wsWithMemberMethods.userLeavingWorkspace(user_id, ws_id));
                navigate('/');
            }

      });
}



    return (
        <div className="container-fluid bg-white p-3">
            <div className="row mx-0">
                <div className="col-12">
                    <h2>Active Workspace Members</h2>
                    <h4>Workspace: {workspaceWithMembers.title}</h4>
                </div>
            </div>
     <div className="row mx-0 mt-3">
        <div className="col-12">
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <td>Relation</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Actions</td>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td><b>{workspaceWithMembers.creator?"Owner":''}</b></td>
                            <td>{workspaceWithMembers.creator?.username}</td>
                            <td>{workspaceWithMembers.creator?.email}</td>
                         
                            <td><Link className={"btn btn-outline-primary" + (workspaceWithMembers.createdBy!==authenticatedUser.userId?" disabled d-none":"" ) } to={`/`}>View Boards</Link></td>
                        </tr>
                        {
                            
                           workspaceWithMembers?.usersWithAccess?.length?workspaceWithMembers.usersWithAccess.map(user=>(
                            // printing invited users [this is workspace is share with these users]
                            <tr key={user.id}>
                                <td><b>{user.id !==workspaceWithMembers.createdBy?"Shared With":''}</b></td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    {
                                        //if current active workspace is not created by current authenticated user
                                    authenticatedUser.userId!==workspaceWithMembers.createdBy?(
                                        <div className="actions-wrap">
                                                <button className="btn btn-warning me-2" onClick={()=>handleUserLeavingWorkspace(authenticatedUser.userId, workspaceWithMembers.id)}>leave action</button>
                                                <Link className="btn btn-outline-primary" to={`/`}>View Boards</Link>
                                        </div>
                                       
                                        ):('' )
                                    }

                                </td>
                            </tr>
                            )):(
                                    //if current active workspace is not created by current authenticated user
                                authenticatedUser.userId==workspaceWithMembers.createdBy?(
                                    <tr>
                                      <td colSpan="3">Not Shared with anyone yet</td>
                                      <td><button className="btn btn-primary" onClick={()=>dispatch(modalMethods.openSendInvitationModal())}><i className="fa fa-user-plus me-1"></i>Send Invite</button></td>
                                   </tr>
                                ):(
                                    <tr>
                                    <td colSpan="4">Not Shared with anyone yet</td>
                                    </tr>
                                )
                                
                              
                            )
                        }
                      
                    </tbody>
                </table>
            </div>
        </div>
     </div>
            </div>
    )
}
export default  WorkspaceMembers;