import { useEffect } from "react";
import CustomRequest from "../utils/customRequest.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveWorkspace } from "../features/workspaceSlice.js";
import { fetchMembers } from "../features/WorkspaceMembersSlice.js";

const WorkspaceMembers=()=>{

const dispatch=useDispatch();
const activeWs=useSelector(selectActiveWorkspace);

useEffect(()=>{
    dispatch(fetchMembers(activeWs.id))
})


// const fetchActiveWorkspaceMembers=async()=>{

//     try{
//         // dispatch(setUsersList({
//         //     users:users
//         // }))
//     }catch(err){
//         toast.error(err.response?.data?.msg);
//     }


//     }




    return (
        <div className="container-fluid bg-white p-3">
            <div className="row mx-0">
                <div className="col-12">
                    <h2>Active Workspace Members</h2>
                </div>
            </div>
     <div className="row mx-0 mt-3">
        <div className="col-12">
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Relation</td>
                            <td>Actions</td>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
     </div>
            </div>
    )
}
export default  WorkspaceMembers;