import { useEffect, useState } from "react";
import {
  selectActiveWorkspace,
  selectWorkspaceList,
  setActiveWorkspace,
  wsMethods,
} from "../features/workspaceSlice.js";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading.jsx";
import { setUserLastActiveWorkspace } from "../features/UserAuthSlice.js";
import { Modal } from "react-responsive-modal";
import CustomRequest from "../utils/customRequest.jsx";
import { modalMethods } from "../features/modalSlice.js";


const WorkspaceSelectModal = ({ open, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [optionsList,setOptionsList]=useState([]);
  const ws_list = useSelector(selectWorkspaceList);
  const activeWs = useSelector(selectActiveWorkspace);

  const dispatch = useDispatch();

    const defaultValue = activeWs
    ? { value: activeWs.id, label: activeWs.title }
    : { value: null, label: "--Select-Workspace" };

  const handleSelect = async (e) => {

    dispatch(wsMethods.setActiveWorkspace(e.value));
    dispatch(modalMethods.closeSelectWorkspaceModal())
    // try {
    //   const resp = await CustomRequest.post(
    //     "/dashboard/set_last_active_workspace",
    //     { wsId: e.value }
    //   );
    //   const status = resp.status;
    //   if (status == 200) {
    //     dispatch(setActiveWorkspace({ wsId: e.value }));
    //     dispatch(setUserLastActiveWorkspace({ wsId: e.value }));
    //     toast.success("Workspace loaded successfully");
    //     dispatch(modalMethods.closeSelectWorkspaceModal())
    //   }
    // } catch (err) {
    //   toast.error("Workspace data loading error:" + err);
    // }
  };

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


  
  // useEffect(()=>{
  //   if(Object.keys(activeWs).length==0 && Object.keys(ws_list).length !== 0){
  //     handleDefaultWorkspaceSelection(ws_list);
  //   }
  // },[ws_list,activeWs])



  const selectedWorkspace = defaultValue ?? {
    value: "null",
    label: "--Select Workspace--",
  };
  const style = {
    height: "300px",
  };


  return (
    <Modal
      open={open}
      onClose={()=>dispatch(modalMethods.closeSelectWorkspaceModal())}
      center
      classNames={{ modal: ["container-lg"] }}
    >
      <h3>
        <b>Wellcome. </b>
      </h3>
      {defaultValue?.value ? (
        <small>Please select workspace to load. </small>
      ) : (
        ""
      )}

      <hr />

      <div className="container-fluid" style={style}>
        <div className="row mx-0">
          <div className="col-12">
            <div className="form-group my-3">
              <label htmlFor="">Select Workspace</label>
              <Select
                defaultValue={selectedWorkspace}
                onChange={handleSelect}
                options={optionsList}
                placeholder="0 Workspace found"
                id="workspace-select"
                isLoading={isLoading}
              ></Select>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default WorkspaceSelectModal;
