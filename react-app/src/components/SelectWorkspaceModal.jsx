import {useEffect, useState} from 'react';
import { selectActiveWorkspace,selectWorkspaceList,setActiveWorkspace } from "../features/workspaceSlice.js";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading.jsx";
import { setUserLastActiveWorkspace} from "../features/UserAuthSlice.js";
import {Modal} from 'react-responsive-modal';
import CustomRequest from '../utils/customRequest.jsx';

const WorkspaceSelectModal= ({open, onClose})=>{

  let ws_list= useSelector(selectWorkspaceList);
  const [isLoading, setIsLoading]=useState(true);
  const activeWs=useSelector(selectActiveWorkspace);
  const defaultValue=activeWs?{value:activeWs.id,label:activeWs.title}:null;
  const dispatch=useDispatch();



useEffect(()=>{

  if(Object.keys(ws_list).length !== 0){
    setIsLoading(false);
    }

},[ ws_list])

    // const activeWs=useSelector(selectActiveWorkspace);
    // const defaultValue=activeWs?{value:activeWs.id,label:activeWs.title}:null;
    // const dispatch=useDispatch();

    let options = ws_list.workspace?.owned?.map((w) => {
      return { value: w.id, label: w.title };
    })??ws_list.workspace?.shared?.map((w) => {
      return { value: w.id, label: w.title };
    });
    const handleSelect = async (e) => {


        try{
          const resp= await CustomRequest.post('/dashboard/set_last_active_workspace',{wsId:e.value});
          const status= resp.status;
          // console.log(resp)
          if(status==200){
            dispatch(setActiveWorkspace({wsId:e.value}));
            dispatch(setUserLastActiveWorkspace({wsId:e.value}))
            toast.success('Workspace loaded successfully');
            onClose();
          }
        }catch(err){
          toast.error("Workspace data loading error:"+err);
        }
      

    };

    const selectedWorkspace = defaultValue??{ value: "null", label: "--Select Workspace--" };
    const style={
      'height':"300px",
    }

return (

  <Modal open={open} onClose={onClose} center classNames={{modal:["container-lg"]}}>
                <h3><b>Wellcome. </b></h3>
                    {
                    defaultValue?.value?(
                        <small>Please select workspace to load. </small>
                    ):('')
                    }
             

                <hr/>

                <div className="container-fluid" style={style}>
                    <div className="row mx-0">
                        <div className="col-12">
                    
                          <div className="form-group my-3">
                            <label htmlFor="">Select Workspace</label>
                              <Select defaultValue={ selectedWorkspace}
                                    onChange={handleSelect}
                                    options={options}
                                    placeholder="0 Workspace found"
                                    id="workspace-select"
                                    isLoading={isLoading} 
                                    >
                                      
                              </Select>
                          </div>
                        </div>
                    </div>
               
           
          </div>
        </Modal>

)


}
export default WorkspaceSelectModal;