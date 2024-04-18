import { Form, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FormRow from "../components/FormRow.jsx";
import SubmitBtn from "../components/SubmitBtn.jsx";
import FormTextarea from "../components/FormTextarea.jsx";
import { toast } from "react-toastify";
import CustomRequest from "../utils/customRequest";

const EditProject = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const param = useParams();
  const projectId = param.id;

  useEffect(() => {
    try {
      loadEditableProject(projectId);
    } catch (err) {
      toast.error(err.response?.data?.msg);
    }
  }, [projectId]);

  const loadEditableProject = async (id) => {
    const resp = await CustomRequest.get(`/dashboard/project/${projectId}`);
    const project = await resp.data;

    setForm({
      name: project.name,
      description: project.description,
    });
  };

  const update = (e) => {
    e.preventDefault();
    e.target.classList.add("disabled");
    try {
      const req = CustomRequest.patch(`/dashboard/project/${projectId}`, form);
      e.target.classList.remove("disabled");
      toast.success('Project udpated successfully')
      navigate('/projects')
    } catch (err) {
      toast.error(err.response?.data?.msg);
      e.target.classList.remove("disabled");
    }
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
};
export default EditProject;
