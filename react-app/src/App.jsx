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
  selectAuthenticatedUser,
  selectAuthToken,
  setUserLoginStatus,
  setUserLogoutStatus,
} from "./features/UserAuthSlice.js";
import { toast } from "react-toastify";
import CustomRequest from "./utils/customRequest.jsx";
import AppResponse from "./components/AppResponse.jsx";
import {
  selectBoardsList,
  setBoardsList,
  fetchBoardsByWsId,
} from "./features/BoardSlice.js";
import Select from "react-select";
import CreateBoardModel from "./components/CreateBoardModel.jsx";
import WorkspaceSelectModal from "./components/SelectWorkspaceModal.jsx";
import { jwtDecode } from "jwt-decode";
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
import { AuthProvider } from "./hooks/useAuth.jsx";
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
  // console.log(ws_status);

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
    // if (wsSliceErr.length) {
    //   toast.error("Workspace Error: " + wsSliceErr);
    // }
    const { inDb, inStore } = checkActiveWorkspace();
    console.log("checkActiveWorkspace result:", { inDb, inStore });

    if (ws_status !== "idle" && !modalOpenedRef.current) {
      if (ws_status === "success" && Object.keys(workspaceList).length > 0) {
        
            if (!inDb) {
              // console.log("No active workspace in DB, opening modal");
              if(!handleDefaultWorkspaceSelection(workspaceList)){
                  dispatch(modalMethods.openSelectWorkspaceModal());
                  modalOpenedRef.current = true; // Prevent multiple modal openings
                }

            } else if (!inStore) {
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
      dispatch(fetchBoardsByWsId(currentUser.last_active_workspace));
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
                {/* <li className="nav-item dropdown">
                  <a
                    className="nav-icon dropdown-toggle"
                    href="#"
                    id="alertsDropdown"
                    data-bs-toggle="dropdown"
                  >
                    <div className="position-relative">
                      <i className=" fa fa-bell" data-feather="bell"></i>
                      <span className="indicator">4</span>
                    </div>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0"
                    aria-labelledby="alertsDropdown"
                  >
                    <div className="dropdown-menu-header">
                      4 New Notifications
                    </div>
                    <div className="list-group">
                      <a href="#" className="list-group-item">
                        <div className="row g-0 align-items-center">
                          <div className="col-2">
                            <i
                              className="text-danger"
                              data-feather="alert-circle"
                            ></i>
                          </div>
                          <div className="col-10">
                            <div className="text-dark">Update completed</div>
                            <div className="text-muted small mt-1">
                              Restart server 12 to complete the update.
                            </div>
                            <div className="text-muted small mt-1">30m ago</div>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="list-group-item">
                        <div className="row g-0 align-items-center">
                          <div className="col-2">
                            <i className="text-warning" data-feather="bell"></i>
                          </div>
                          <div className="col-10">
                            <div className="text-dark">Lorem ipsum</div>
                            <div className="text-muted small mt-1">
                              Aliquam ex eros, imperdiet vulputate hendrerit et.
                            </div>
                            <div className="text-muted small mt-1">2h ago</div>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="list-group-item">
                        <div className="row g-0 align-items-center">
                          <div className="col-2">
                            <i className="text-primary" data-feather="home"></i>
                          </div>
                          <div className="col-10">
                            <div className="text-dark">
                              Login from 192.186.1.8
                            </div>
                            <div className="text-muted small mt-1">5h ago</div>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="list-group-item">
                        <div className="row g-0 align-items-center">
                          <div className="col-2">
                            <i
                              className="text-success"
                              data-feather="user-plus"
                            ></i>
                          </div>
                          <div className="col-10">
                            <div className="text-dark">New connection</div>
                            <div className="text-muted small mt-1">
                              Christina accepted your request.
                            </div>
                            <div className="text-muted small mt-1">14h ago</div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="dropdown-menu-footer">
                      <a href="#" className="text-muted">
                        Show all notifications
                      </a>
                    </div>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-icon dropdown-toggle"
                    href="#"
                    id="messagesDropdown"
                    data-bs-toggle="dropdown"
                  >
                    <div className="position-relative">
                      <i
                        className="align-middle"
                        data-feather="message-square"
                      ></i>
                    </div>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0"
                    aria-labelledby="messagesDropdown"
                  >
                    <div className="dropdown-menu-header">
                      <div className="position-relative">4 New Messages</div>
                    </div>
                    <div className="list-group">
                      <a href="#" className="list-group-item">
                        <div className="row g-0 align-items-center">
                          <div className="col-2">
                            <img
                              src="public/img/avatars/avatar-5.jpg"
                              className="avatar img-fluid rounded-circle"
                              alt="Vanessa Tucker"
                            />
                          </div>
                          <div className="col-10 ps-2">
                            <div className="text-dark">Vanessa Tucker</div>
                            <div className="text-muted small mt-1">
                              Nam pretium turpis et arcu. Duis arcu tortor.
                            </div>
                            <div className="text-muted small mt-1">15m ago</div>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="list-group-item">
                        <div className="row g-0 align-items-center">
                          <div className="col-2">
                            <img
                              src="/img/avatars/avatar-2.jpg"
                              className="avatar img-fluid rounded-circle"
                              alt="William Harris"
                            />
                          </div>
                          <div className="col-10 ps-2">
                            <div className="text-dark">William Harris</div>
                            <div className="text-muted small mt-1">
                              Curabitur ligula sapien euismod vitae.
                            </div>
                            <div className="text-muted small mt-1">2h ago</div>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="list-group-item">
                        <div className="row g-0 align-items-center">
                          <div className="col-2">
                            <img
                              src="img/avatars/avatar-4.jpg"
                              className="avatar img-fluid rounded-circle"
                              alt="Christina Mason"
                            />
                          </div>
                          <div className="col-10 ps-2">
                            <div className="text-dark">Christina Mason</div>
                            <div className="text-muted small mt-1">
                              Pellentesque auctor neque nec urna.
                            </div>
                            <div className="text-muted small mt-1">4h ago</div>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="list-group-item">
                        <div className="row g-0 align-items-center">
                          <div className="col-2">
                            <img
                              src="/img/avatars/avatar-3.jpg"
                              className="avatar img-fluid rounded-circle"
                              alt="Sharon Lessman"
                            />
                          </div>
                          <div className="col-10 ps-2">
                            <div className="text-dark">Sharon Lessman</div>
                            <div className="text-muted small mt-1">
                              Aenean tellus metus, bibendum sed, posuere ac,
                              mattis non.
                            </div>
                            <div className="text-muted small mt-1">5h ago</div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="dropdown-menu-footer">
                      <a href="#" className="text-muted">
                        Show all messages
                      </a>
                    </div>
                  </div>
                </li> */}
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
                    {/* <a className="dropdown-item" href="index.html">
                      <i
                        className="align-middle me-1"
                        data-feather="settings"
                      ></i>{" "}
                      Settings & Privacy
                    </a> */}
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
