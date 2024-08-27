import react, {useEffect, useState} from "react";
import { Link ,useNavigate} from "react-router-dom";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveWorkspace, selectWorkspaceList, setActiveWorkspace, } from "../features/workspaceSlice.js";
import { setUserLastActiveWorkspace } from "../features/UserAuthSlice.js";
import CustomRequest from "../utils/customRequest";
import { modalMethods } from "../features/modalSlice.js";




export default function Sidebar() {

  const [sortedWs, setSortedWs]=useState([]);
  const workspaces=useSelector(selectWorkspaceList);
  const ws_status=useSelector(state=>state.workspace.status)
  const dispatch =useDispatch();
  const navigate=useNavigate();

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

  try{
    const resp= await CustomRequest.post('/dashboard/set_last_active_workspace',{wsId:id});
    const status= resp.status;
    // console.log(resp)
    if(status==200){
      dispatch(setActiveWorkspace({wsId:id}));
      dispatch(setUserLastActiveWorkspace({wsId:id}))
      toast.success('Workspace switched successfully');
        navigate('/');
    }
  }catch(err){
    toast.error("Error while switching workspace:"+err);
  }
}




const active_ws=useSelector(selectActiveWorkspace);

if(!active_ws){
  modalMethods.openSelectWorkspaceModal();
}
  return (
    <nav id="sidebar" className="sidebar js-sidebar">
      <div className="sidebar-content js-simplebar">
        <a className="sidebar-brand" href="index.html">
          <span className="align-middle">AdminKit</span>
        </a>

        <ul className="sidebar-nav">
          <li className="sidebar-header">Pages</li>

          <li className="sidebar-item">
            <Link className="sidebar-link" to={"/"}>
              <i className="align-middle" data-feather="sliders"></i>
              <span className="align-middle">Dashboard</span>
            </Link>
          </li>

      
          <li className="sidebar-item">
            <Link className="sidebar-link" to={"/boards"}>
              <i className="align-middle" data-feather="user"></i>
              <span className="align-middle">Boards</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to={"/workspace_members"}>
              <i className="align-middle" data-feather="user"></i>
              <span className="align-middle">Members</span>
            </Link>
          </li>
          {/* <li className="sidebar-item">
            <Link className="sidebar-link" to={"/boards"}>
              <i className="align-middle" data-feather="user"></i>
              <span className="align-middle">Workspace</span>
            </Link>
          </li> */}
     


        </ul>
        {/* <div className="sidebar-bottom">
            <div className="dropup">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="settingsDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-cog"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="settingsDropdown">
                    <li><a className="dropdown-item" href="#">Backup and Sync Settings...</a></li>
                    <li><a className="dropdown-item" href="#">Show Update Release Notes</a></li>
                    <li><a className="dropdown-item" href="#">Restart to Update (1)</a></li>
                    <li>
                        <a className="dropdown-item" href="#">Profile (Default)</a>
                        <ul className="dropdown-menu dropdown-menu-dark dropend">
                            <li><a className="dropdown-item" href="#">Default</a></li>
                            <li><a className="dropdown-item" href="#">Show Profile Contents</a></li>
                            <li><a className="dropdown-item" href="#">Create Profile...</a></li>
                            <li><a className="dropdown-item" href="#">Delete Profile...</a></li>
                            <li><a className="dropdown-item" href="#">Export Profile...</a></li>
                            <li><a className="dropdown-item" href="#">Import Profile...</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div> */}
        <div className="sidebar-bottom">
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
                        <ul className="dropdown-menu dropdown-menu-dark dropend settings-workspace-list"  style={{minWidth:"250px"}} aria-labelledby="subdropend">
                            {
                              sortedWs?sortedWs.map((ws,index)=>(
                                <li key={index}><a className={"dropdown-item " + (active_ws?.id==ws.id ? " bg-primary active" : '')} href="#" onClick={()=>handleWorkspaceSwitch(ws.id)}>{ws.title} <small>{(ws.type=="shared"?' (Shared)':'')}</small></a></li>
                              )):''
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
