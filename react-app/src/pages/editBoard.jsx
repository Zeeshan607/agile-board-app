import { Form, useNavigate,useParams,  } from "react-router-dom";
import {useState, useEffect} from 'react';
import FormRow from "../components/FormRow.jsx";
import FormTextarea from "../components/FormTextarea.jsx";
import SubmitBtn from "../components/SubmitBtn.jsx";
import {toast} from "react-toastify";
import CustomRequest from "../utils/customRequest.jsx";
import { boardMethods } from "../features/BoardSlice.js";
import { useDispatch } from "react-redux";

const EditBoard=()=>{
    const [form, setForm] = useState({});
    const navigate = useNavigate();
    const param = useParams();
    const boardId = param.id;
    const dispatch=useDispatch();
    useEffect(() => {
      try {
        loadEditableBoard(boardId);
      } catch (err) {
        toast.error(err.response?.data?.msg);
      }
    }, [boardId]);
  
    const loadEditableBoard = async (id) => {
      const resp = await CustomRequest.get(`/dashboard/board/${boardId}`);
      const board = await resp.data;
  
      setForm({
        name: board.name,
        description: board.description,
      });
    };
  
    const update = (e) => {
      e.preventDefault();
      e.target.classList.add("disabled");
       dispatch(boardMethods.update(form, boardId));
       e.target.classList.remove("disabled");
       navigate('/boards');
    };
  
    return (
      <div className="container-fluid bg-white p-3">
        <div className="row mx-0">
          <div className="col-12">
            <Form>
              <FormRow
                type="text"
                name="name"
                defaultValue={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <FormTextarea
                name="description"
                defaultValue={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              <SubmitBtn onClick={update} text="Update" />
            </Form>
          </div>
        </div>
      </div>
    );
}
export default EditBoard;