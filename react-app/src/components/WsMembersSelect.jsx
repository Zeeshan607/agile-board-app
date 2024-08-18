import {selectWorkspaceMembers} from "../features/WorkspaceMembersSlice.js";
import Select from "react-select";
import { useSelector } from "react-redux";
import Loading from "./Loading.jsx";

const WsMemebersSelect= ({state, defaultValue})=>{

    // const wsMemberStatus=useSelector(state=>state.workspaceMembers.status)
    let members= useSelector(selectWorkspaceMembers);
  
if(!members.length){
  return (
    <div className="form-group my-3">
    <label htmlFor="">Assigned To</label>
    <textarea defaultValue={"0 Members have access to this workspace, Please send an invite to give access of this workspace"} rows={2} className="form-control" readOnly disabled />
  </div>
  )
}

    let options = members?.map((m) => {
      return { value: m.id, label: m.username };
    });
    const handleSelect = (e) => {
      state.setTasksForm({...state.tasksForm, assigned_to:e.value })
    };

    const selectedBoard = defaultValue??{ value: "null", label: "--Select Member--" };
    



return (
    <div className="form-group my-3">
      <label htmlFor="">Assigned To</label>
        <Select defaultValue={ selectedBoard}
              onChange={handleSelect}
              options={options}
              placeholder="0 member found"
              id="memebers-select"
              isLoading={members.length} >
              
        </Select>
    </div>
)


}
export default WsMemebersSelect;