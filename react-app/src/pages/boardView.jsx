import { Link,useParams } from "react-router-dom";
import { useDispatch, useSelector ,} from "react-redux";
import {useState, useEffect} from "react";
import {toast} from 'react-toastify';
import CustomRequest from "../utils/customRequest";
import { selectColumnsList, setColumnsList } from "../features/ColumnSlice";
import "./boardView.css";
import AddNewTask from "../components/addNewTaskModal.jsx";

// REMEMBER we are using BoardStatus as Columns in client side app, in server side its logics are as BoardStatus

const BoardView=()=>{

// const [searchParams, setSearchParams]=useSearchParams();
const param=useParams()
const boardSlug= param.slug;
const dispatch =useDispatch();
const [isLoading, setIsLoading]=useState(false);
const [tasksForm, setTasksForm]= useState({title:'',description:''});
const [openNewTaskModal, setOpenNewTaskModal]= useState(false);
const openTaskModal=()=>setOpenNewTaskModal(true);
const closeTaskModal=()=>setOpenNewTaskModal(false);




useEffect(()=>{
    loadBoardColumns(boardSlug);
},[boardSlug])


 const loadBoardColumns=async (slug)=>{
  setIsLoading(true);
    try{
        const resp= await CustomRequest.get(`/dashboard/board/columns/${slug}`);
        const columns= await resp.data.columns;
          dispatch(setColumnsList({columns:columns}));
          setIsLoading(false);

    }catch(err){
      toast.error(err.response?.data?.msg);
      setIsLoading(false);
    }
}




const columns = useSelector(selectColumnsList);
return (
    <div className="container-fluid ">
    <div className="row mx-0 bg-white p-3 my-3 ">
      <div className="col-12 col-sm-12 col-md-6 col-lg-6">

      </div>
      <div className="col-12 col-sm-12 col-md-6 col-lg-6 text-end">
         
      </div>
    </div>

    <div className="d-flex flex-row flex-wrap justify-content-center kanban-container">
      {isLoading ? (
        <p>
          <i
            className="fa fa-spinner fa-spin"
            style={{ fontSize: "32px" }}
          ></i>
        </p>
      ) : columns.length ? (
        columns.map((column) => ( 
          <div className="card board" key={column.id} >
            <div className="card-header">
              <h1 className="card-title">{column.name}</h1>
              <p className="card-subtitle">{column.description}</p>
            </div>
            <div className="card-body">
              <ul className="list-unstyled tasks-list">
                <li className="task" draggable="true">
                  <div className="d-flex flex-row task-header">
                    <div className="priority flex-fill">
                      <span className="badge bg-danger" title="priority">
                        High
                      </span>
                    </div>
                    <div className="created_at flex-fill text-end">
                      18 Jul 2018
                    </div>
                  </div>
                  <a href="#" className="task-link">
                    <h4>Create landing page</h4>
                  </a>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Corporis, repellat est quam sit asperiores esse sint unde
                    accusantium doloribus ipsa.
                  </p>
                  <div className="d-flex flex-row task-footer">
                    <div className="added-by flex-fill">
                      <span>
                        Added by: <b>Admin</b>
                      </span>
                      <a className="comments ms-2 text-decoration-none">
                        <i className="fa fa-comments"></i>
                        200+
                      </a>
                    </div>
                    <div className="menu flex-fill text-end ">
                      <div className="dropdown position-relative">
                        <a
                          href="#"
                          data-bs-toggle="dropdown"
                          data-bs-display="static"
                          aria-expanded="true"
                        >
                          <i className=" fa fa-ellipsis-v"></i>
                        </a>

                        <div
                          className="dropdown-menu dropdown-menu-end "
                          data-bs-popper="static"
                        >
                          <a className="dropdown-item" href="#">
                            Action
                          </a>
                          <a className="dropdown-item" href="#">
                            Another action
                          </a>
                          <a className="dropdown-item" href="#">
                            Something else here
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="task">
                  <div className="d-flex flex-row">
                    <div className="priority flex-fill">
                      <span className="badge bg-info">low</span>
                    </div>
                    <div className="created_at flex-fill text-end">
                      18 Jul 2018
                    </div>
                  </div>
                  <a href="#">
                    <h4>Fix post comments cystem</h4>
                  </a>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Corporis, repellat est quam sit asperiores esse sint unde
                    accusantium doloribus ipsa, harum voluptates quidem porro,
                    possimus maiores ad maxime suscipit. Sequi.
                  </p>

                  <div className="d-flex flex-row">
                    <div className="added-by flex-fill">
                      <span>
                        Added by: <b>Admin</b>
                      </span>
                    </div>
                    <div className="menu flex-fill text-end">
                      <div className="dropdown position-relative">
                        <a
                          href="#"
                          data-bs-toggle="dropdown"
                          data-bs-display="static"
                          aria-expanded="true"
                        >
                          <i className=" fa fa-ellipsis-v"></i>
                        </a>

                        <div
                          className="dropdown-menu dropdown-menu-end "
                          data-bs-popper="static"
                        >
                          <a className="dropdown-item" href="#">
                            Action
                          </a>
                          <a className="dropdown-item" href="#">
                            Another action
                          </a>
                          <a className="dropdown-item" href="#">
                            Something else here
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="card-footer">
            <button onClick={()=>openTaskModal(column.id)} className=' board-column-btn'><i className="fa fa-plus"></i> Add New Task </button>
            <AddNewTask open={openNewTaskModal}   onClose={closeTaskModal} column_id={column.id} />
            </div>
          </div>
      ))
       ) : (
         <p>0 Columns found..</p>
       )} 


    </div>
  </div>
)
}

export default BoardView;