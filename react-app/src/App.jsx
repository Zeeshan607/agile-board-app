import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import {
  Outlet,
  useNavigate,
  useLocation,
  Navigate,
  useSearchParams,
  Link,
} from "react-router-dom";
import Sidebar from "./layout/sidebar.jsx";
import Footer from "./layout/footer.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAuthToken,
} from "./features/UserAuthSlice.js";

import {
  selectBoardsList,
  setBoardsList,
  fetchBoardsByWsId,
} from "./features/BoardSlice.js";
import CreateBoardModel from "./components/CreateBoardModel.jsx";
import WorkspaceSelectModal from "./components/SelectWorkspaceModal.jsx";
// import { jwtDecode } from "jwt-decode";
import {
  fetchWorkspaces,
  selectActiveWorkspace,
  selectWorkspaceErrors,
  setActiveWorkspace,
  selectWorkspaceList,
  selectWsStatus,
  wsMethods
} from "./features/workspaceSlice.js";
import Loading from "./components/Loading.jsx";
// import { AuthProvider } from "./hooks/useAuth.jsx";
import { useAuth } from "./hooks/useAuth.jsx";

import {
  modalMethods,
  selectSelectWorkspaceModal,
  selectCreateBoardModal
} from "./features/modalSlice.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import CreateWorkspaceModal from "./components/createWorkspaceModal.jsx";
import SendInvitationModal from "./components/SendInvitationModal.jsx";
import Joyride, {ACTIONS, EVENTS, STATUS } from 'react-joyride';


const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authToken = useSelector(selectAuthToken);
  const [isLoading, setIsLoading] = useState(true);

  const SelectWorkspaceModal = useSelector(selectSelectWorkspaceModal);

  const workspaceList = useSelector(selectWorkspaceList);
  const ws_status = useSelector(selectWsStatus);

  const wsSliceErr = useSelector(selectWorkspaceErrors);
  const activeWorkspace = useSelector(selectActiveWorkspace);
  const auth = useAuth();
  const currentUser = auth.user;
  const modalOpenedRef = useRef(false);
  // const [rideSteps, setRideSteps]=useState([
  //   {
  //     content: <h2>Lets take a small tour</h2>,
  //     locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
  //     placement: 'center',
  //     target: 'body',
  //   },
  //   {
  //     title:  <h2>Active Workspace</h2>,
  //     content: <p>Double Click to Edit workspace name</p>,
  //     placement: 'right',
  //     target: '#workspace-title',
  //   },
  //   {
  //     title:  <h2>Settings</h2>,
  //     content: <p>Contains Options To switch workspace, and other settings</p>,
  //     placement: 'top',
  //     target: '#settingsdropup',
  //   },
  //   {
  //     title:  <h2>Your accessable workspace's list</h2>,
  //     content: <p>Click to switch from one workspace to other</p>,
  //     placement: 'right',
  //     target: '#workspace-switch-list',
  //   },
  //   {
  //     title:  <h2>Boards</h2>,
  //     content: <p>Board Manager module, where you create, edit and delete your boards</p>,
  //     placement: 'right',
  //     target: '#board-menu',
  //   },
  // ])
  // const [ rideRun, setRideRun] = useState(false);

//   const handleJoyrideCallback = (data) => {
//     const {action, index, status, type } = data;
//     const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
// console.log(index)
//     // Check if it's the second step (where dropdown is needed)
//     if (index == 2 && type === EVENTS.STEP_AFTER) {
//       // Trigger click on the dropdown button
//       console.log('step 4 before code')
//         document.querySelector('#settingsdropup').click();
//         // $('#settingsdropup').addClass('show');
//         // $('.settingsdropup-menu').addClass('show');
//         // document.querySelector()
//     }

    
//     if (finishedStatuses.includes(status)) {
//       setRideRun(false);
//       dispatch(authUserMethod.setTourStatus(true));
//     }
  
    
//   };

//   const handleTourStart = () => {
//     // event.preventDefault();
//     setRideRun(true);
//   };

  const checkActiveWorkspace = () => {
    const activeWs=Object.keys(activeWorkspace).length;
    if (currentUser?.last_active_workspace !== null && !activeWs) {
      return { inDb: true, inStore: false };
    } else if (activeWs && currentUser?.last_active_workspace == null) {
      return { inDb: false, inStore: true };
    } else if (activeWs && currentUser?.last_active_workspace !== null) {
      return { inDb: true, inStore: true };
    } else {
      return { inDb: false, inStore: false };
    }
  };

  const handleDefaultWorkspaceSelection=(list)=>{
    const shared= list.workspace?.shared;
    const owned=list.workspace?.owned;
    if (owned.length==1 && shared.length==0){
      if(owned[0].is_default){
        try{
          dispatch(wsMethods.setActiveWorkspace(owned[0].id));
          dispatch(modalMethods.closeSelectWorkspaceModal());
          return true;
        }catch(err){
          console.log(err);
          return false;
        }

      }
    }
  }  



  useEffect(() => {//useEffect for check if user is login or not and if login then fetch workspaces
    if (!authToken) {
      navigate("/login");
      return;
    }
    // if(!currentUser.is_tour_done){
    //   handleTourStart();
    // }
    if (authToken) {
      if (Object.keys(workspaceList).length == 0) {
        if (ws_status === "idle" || ws_status === "failed") {
          // Fetch workspaces only if they haven't been fetched yet
          dispatch(fetchWorkspaces());
        }
      }
    }
  }, [authToken, ws_status, workspaceList, dispatch]);



  useEffect(() => {
   
    const { inDb, inStore } = checkActiveWorkspace();
    // console.log("checkActiveWorkspace result:", { inDb, inStore });

    if (ws_status !== "idle" && !modalOpenedRef.current) {

      if (ws_status === "success" && Object.keys(workspaceList).length > 0) {
 
            if (!inDb) {
            
              if(!handleDefaultWorkspaceSelection(workspaceList)){
      
                  dispatch(modalMethods.openSelectWorkspaceModal());
                  modalOpenedRef.current = true; // Prevent multiple modal openings
                }

            } else if (!inStore) {
              console.log('trying to set from user last active feild')
              dispatch(
                setActiveWorkspace({ wsId: currentUser.last_active_workspace })
              );
            }
    

      }
    }

    setIsLoading(false);
  }, [ws_status, activeWorkspace, dispatch]);




  useEffect(() => {//useEffect for fetching boards if workspaces are fetched correctly and there is an active workspace loaded;
    if (activeWorkspace && ws_status === "success") {
      let wsId=currentUser.last_active_workspace??activeWorkspace?.id;
      if(wsId){
        dispatch(fetchBoardsByWsId(currentUser.last_active_workspace));
      }
    
      setIsLoading(false);
    }
  }, [activeWorkspace, ws_status, currentUser, dispatch]);



  const Logout = async () => {
    await auth.logout();
  };

  return (
    <React.Fragment>

      <div className="wrapper">
        <Sidebar></Sidebar>

        <div className="main">
          <nav className="navbar navbar-expand navbar-light navbar-bg">
            <a className="sidebar-toggle js-sidebar-toggle" onClick={()=>{$('#sidebar').toggleClass('collapsed')}}>
              <i className="hamburger align-self-center"></i>
            </a>

            <div className="header-options d-flex flex-row justify-content-center align-items-center"></div>

            <div className="navbar-collapse collapse">
              <ul className="navbar-nav navbar-align">
                <li className="nav-item"></li>
            
                <li className="nav-item dropdown">
                  <a
                    className="nav-icon dropdown-toggle d-inline-block d-sm-none"
                    href="#"
                    data-bs-toggle="dropdown"
                  >
                    <i className="align-middle" data-feather="settings"></i>
                  </a>

                  <a
                    className="nav-link dropdown-toggle d-none d-sm-inline-block"
                    href="#"
                    data-bs-toggle="dropdown"
                  >
                    <img
                      src={currentUser.image??"/img/avatars/person-placeholder.png"}
                      className="avatar img-fluid rounded me-1"
                      alt="Charles Hall"
                    />{" "}
                    {currentUser ? (
                      <span className="text-dark">{currentUser.name}</span>
                    ) : (
                      ""
                    )}
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <Link className="dropdown-item" to="/profile">
                      <i className="align-middle me-1" data-feather="user"></i>{" "}
                      Profile
                    </Link>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() =>
                        dispatch(modalMethods.openCreateWorkspaceModal())
                      }
                    >
                      <i
                        className="align-middle me-1"
                        data-feather="pie-chart"
                      ></i>{" "}
                      Create Workspace
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#" onClick={(e)=>
                    {if (window.confirm('Click Ok to go to our contact page, Cancel to Stay here')){
                      window.open('https://www.muhammadzeeshan.dev/#contact-section', '_blank');
                      };}
                    }>
  
                      <i
                        className="align-middle me-1"
                        data-feather="help-circle"
                      ></i>{" "}
                      Help Center
                    </a>
                    <div className="dropdown-divider"></div>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => Logout()}
                    >
                      Log out
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>

          <main className="content" id="page-content">
            {/* page content will be here */}

            <WorkspaceSelectModal open={SelectWorkspaceModal} />
            <CreateWorkspaceModal />
            <SendInvitationModal />
            <CreateBoardModel ws_id={activeWorkspace?.id} />
            {/* <Joyride
                callback={handleJoyrideCallback}
                continuous={true}
                run={rideRun}
                // scrollToFirstStep
                showProgress
                showSkipButton
                steps={rideSteps}
                styles={{
                  options: {
                   primaryColor:'#3b7ddd',
                  },
             
                }}
              /> */}


            {isLoading ? <Loading /> : <Outlet></Outlet>}
          </main>

          <Footer></Footer>
        </div>
      </div>
      {/* </AuthProvider> */}
    </React.Fragment>
  );
};

export default App;
