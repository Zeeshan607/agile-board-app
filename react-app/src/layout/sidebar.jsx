import react, {useEffect, useState} from "react";
import { Link ,useNavigate} from "react-router-dom";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveWorkspace, selectWorkspaceList, setActiveWorkspace, wsMethods, } from "../features/workspaceSlice.js";
import { setUserLastActiveWorkspace } from "../features/UserAuthSlice.js";
import CustomRequest from "../utils/customRequest";
import { modalMethods } from "../features/modalSlice.js";
import { useAuth } from "../hooks/useAuth.jsx";
import Loading from "../components/Loading.jsx";




export default function Sidebar() {

  const [sortedWs, setSortedWs]=useState([]);
  const workspaces=useSelector(selectWorkspaceList);
  const ws_status=useSelector(state=>state.workspace.status)
  const dispatch =useDispatch();
  const navigate=useNavigate();
const {user}=useAuth();
const authUser=user;

useEffect(()=>{

  let list=[]
  if(Object.keys(workspaces).length !== 0){
    const shared= workspaces.workspace.shared;
    const owned= workspaces.workspace.owned;
    shared.forEach(ws => {
      list.push({ ...ws, type: 'shared' });
    });
  
    owned.forEach(ws => {
      list.push({ ...ws, type: 'owned' });
    });

  }
      setSortedWs(list);

},[workspaces ]);


const handleWorkspaceSwitch=async (id)=>{

  // try{
  //   const resp= await CustomRequest.post('/dashboard/set_last_active_workspace',{wsId:id});
  //   const status= resp.status;
  //   if(status==200){
  //     dispatch(setActiveWorkspace({wsId:id}));
  //     dispatch(setUserLastActiveWorkspace({wsId:id}));
  //     toast.success('Workspace switched successfully');
  //       navigate('/');
  //   }
  // }catch(err){
  //   toast.error("Error while switching workspace:"+err);
  // }

  dispatch(wsMethods.switchWorkspace("FROM_SIDEBAR",id));
  navigate('/');
}

const active_ws=useSelector(selectActiveWorkspace);
if(Object.keys(workspaces).length==0 && ws_status !=="success" ){
return <i className="fa fa-spinner fa-spin"></i>
}


  return (
    <nav id="sidebar" className="sidebar js-sidebar">
      <div className="sidebar-content js-simplebar" style={{height:"100%"}}>
        <a className="sidebar-brand" href="/">
          <span className="align-middle">Agile Board</span>
        </a>

        <ul className="sidebar-nav">
          <li className="sidebar-header">Pages</li>

          <li className="sidebar-item">
            <Link className="sidebar-link" to={"/"}>
              <i className="fas fa-home" ></i>
              <span className="align-middle">Dashboard</span>
            </Link>
          </li>

      
          <li className="sidebar-item">
            <Link className="sidebar-link" to={"/boards"}>
              <i className="fas fa-columns"></i>
              <span className="align-middle">Boards</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to={"/workspace_members"}>
              <i className="fa fa-users" ></i>
              <span className="align-middle">Members</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to={"/about_project"}>
              <i className="far fa-map" ></i>
              <span className="align-middle">About This Project</span>
            </Link>
          </li>
         
     


        </ul>
      
        <div className="sidebar-bottom flex-shrink-0">
           <div className="dropup position-relative">
           <a className="nav-icon dropdown-toggle" href="#" id="settingsdropup" data-bs-toggle="dropdown"   >
                    <div className="position-relative">
                      <i className=" fa fa-cog" data-feather="cog"></i>
                    </div>
                </a>

              <div className="dropdown-menu dropdown-menu-sm dropdown-menu-dark py-3 " aria-labelledby="settingsdropup">
                
                      <li className="dropend hoverable-dropdown">
                      <a className="dropdown-item  "  id="subdropend" data-bs-toggle="dropdown" aria-expanded="false" href="#">Switch
                        <i className="fa fa-angle-right drop-icon"></i>
                      </a>
                        <ul className="dropdown-menu dropdown-menu-dark dropend settings-workspace-list" id="workspace-switch-list"  style={{minWidth:"250px"}} aria-labelledby="subdropend">
                            {
                              !active_ws?(
                                  <li><i className="fa fa-spinner fa-spin"></i></li>
                              ):(
                                sortedWs?sortedWs.map((ws,index)=>(
                                  <li key={index}><a className={"dropdown-item " + (active_ws?.id==ws.id ? " bg-primary active" : '')} href="#" onClick={()=>handleWorkspaceSwitch(ws.id)}>{ws.title} <small>{(ws.type=="shared"?' (Shared)':'')}</small></a></li>
                                )):''
                              )
                           
                            }
                        
                        
                        </ul>
                 
                      </li>
                    <li><a className="dropdown-item" href="#">Setting & Privacy</a></li>
   
                 
              </div>
              </div>

          {/* <div className="sidebar-cta-content">
            <strong className="d-inline-block mb-2">Upgrade to Pro</strong>
            <div className="mb-3 text-sm">
              Are you looking for more components? Check out our premium
              version.
            </div>
            <div className="d-grid">
              <a href="upgrade-to-pro.html" className="btn btn-primary">
                Upgrade to Pro
              </a>
            </div>
          </div> */}

          
        </div>
      </div>
    </nav>
  );
}
