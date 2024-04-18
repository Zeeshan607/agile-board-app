import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProjectList, setProjectsList } from "../features/ProjectSlice";
import CustomRequest from "../utils/customRequest";
import { toast } from "react-toastify";
import { genResp } from "../features/ResponseSlice";
import AppResponse from "../components/AppResponse";
import { Modal } from "react-responsive-modal";
import "./projects.css";
import Swal from "sweetalert2";

const Projects = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  /////
  useEffect(() => {
    getProjects();
  }, [dispatch]);

  const getProjects = async () => {
    setIsLoading(true);
    try {
      const resp = await CustomRequest.get("dashboard/projects/");
      const projects = await resp.data.projects;
      dispatch(setProjectsList({ projects }));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast.error(err.response?.data?.msg);
    }
  };

  const del = (e, id) => {
    e.target.classList.add("disabled");
    // window.confirm("Delete the item?");

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then( async (result) => {
      if (result.isConfirmed) {
          try {
          const resp = await CustomRequest.delete(`/dashboard/project/${id}`);
          toast.success(resp.data?.msg);
          e.target.classList.remove("disabled");
          location.reload();
          } catch (err) {
            toast.error(err.response?.data?.msg);
            e.target.classList.remove("disabled");
          }
        }
        e.target.classList.remove("disabled");
    });
  
   
    // Swal.fire({
    //   title: "Deleted!",
    //   text: "Your file has been deleted.",
    //   icon: "success",
    // });

  };

  const projects = useSelector(selectProjectList);
  return (
    <div className="container-fluid bg-white p-3">
      <div className="row mx-0">
        <div className="col-12 text-end">
          <Link to={"/add-project"} className="btn btn-primary">
            Add
          </Link>
        </div>
      </div>

      {/* <AppResponse/> */}

      <div className="row mx-0 mt-3">
        <div className="col-12 text-center">
          {isLoading ? (
            <p>
              <i
                className="fa fa-spinner fa-spin"
                style={{ fontSize: "32px" }}
              ></i>
            </p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    {/* <th>Description</th> */}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.length ? (
                    projects.map((project) => (
                      <tr key={project._id}>
                        <td onClick={onOpenModal}>
                          <b className="text-primary cursor-pointer ">
                            {project.name}
                          </b>
                        </td>
                        {/* <td>{ project.description.slice(0, project.description.length/2) +'....'}</td> */}
                        <Modal open={open} onClose={onCloseModal} center>
                          <h2>{project.name}</h2>
                          <hr />
                          <p>{project.description}</p>
                        </Modal>
                        <td>
                          <Link
                            to={`/edit-project/${project._id}`}
                            className="btn btn-primary btn-sm mx-1"
                          >
                            <i className="fa fa-edit "></i>
                          </Link>
                          <button
                            className="btn btn-danger btn-sm mx-1"
                            onClick={(e) => del(e, project._id)}
                          >
                            <i className="fa fa-trash "></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3}>
                        OOPs! its seems like you don't have any projects
                        available yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Projects;
