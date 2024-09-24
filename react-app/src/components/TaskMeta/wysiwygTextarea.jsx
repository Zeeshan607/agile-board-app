import React, { useState } from "react";
import FroalaEditorComponent from "react-froala-wysiwyg";
import CustomRequest from "../../utils/customRequest";
import { useDispatch } from "react-redux";
import { EditorConfig } from "../froalaEditorConfig.js";
import {columnsTaskMethods} from "../../features/ColumnsTasksSlice.js";


const WysiwygTextarea = ({ task_id, description }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [data, setData] = useState(description);
  const dispatch = useDispatch();

  const handleDoubleClick = () => {
    setIsEditable(true);
  };
  const handleChange = (val) => {
    setData(`${val}`);
  };
  const handleSave = async (e) => {
    e.target.classList.add("disabled");

    if (data != "") {
      let update = { ["description"]: data };
      dispatch(columnsTaskMethods.editTaskDescription(task_id, update));
      setIsEditable(false);
      e.target.classList.remove("disabled");
    }else{
      toast.error('Description can not be Empty please fill some text');
      e.target.classList.remove("disabled");
    }
  };
  // console.log(data)
  return (
    <div onDoubleClick={handleDoubleClick}>
      {isEditable ? (
        <React.Fragment>
          <FroalaEditorComponent
            tag="textarea"
            model={data}
            config={EditorConfig}
            onModelChange={(e) => handleChange(e)}
          />
          <div className="row mx-0 mt-2">
            <div className="col-12 text-end ">
              <button
                className="btn btn-primary me-2"
                onClick={(e) => handleSave(e)}
              >
                Save
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setIsEditable(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <div
          className="task-description"
          dangerouslySetInnerHTML={{ __html: data }}
        ></div>
      )}
    </div>
  );
};
export default WysiwygTextarea;
