import { Link,useParams } from "react-router-dom";
import { useDispatch, useSelector ,} from "react-redux";
import {useState, useEffect} from "react";
import {toast} from 'react-toastify';
import CustomRequest from "../utils/customRequest";
import { selectColumnsList, setColumnsList } from "../features/ColumnSlice";
import "./boardView.css";
import AddNewTask from "../components/addNewTaskModal.jsx";
import { selectActiveWorkspace } from "../features/workspace.js";
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



const handleTaskClick=()=>{


}




const columns = useSelector(selectColumnsList);
const activeWorkspace = useSelector(selectActiveWorkspace);
return (
    <div className="container-fluid bg-white pt-3">
    <div className="row mx-0 bg-white p-3 shadow-md bg-body ">
      <div className="col-12 col-sm-12 col-md-6 col-lg-6">
      {
          activeWorkspace?(
            <h6 className="m-0 d-inline"> <b className="text-success">Workspace:</b> <span title="Default Workspace">{activeWorkspace.title} </span></h6>
          ):('No active workspace')
        }
        <button className="btn btn-primary mx-2"><i className="fa fa-plus "></i> Create</button>
      </div>
      <div className="col-12 col-sm-12 col-md-6 col-lg-6 text-end">
         
      </div>
    </div>

    <div className="d-flex flex-row flex-wrap justify-content-start kanban-container">
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
            <div className="card-header bg-transparent">
              <h1 className="card-title">{column.name}</h1>
              <p className="card-subtitle">{column.description}</p>
            </div>
            <div className="card-body">
              <ul className="list-unstyled tasks-list">
                <li className="task" draggable="true">
                <div className="task-link" onClick={handleTaskClick}>
                  <div className="d-flex flex-row task-header">
                    <div className="priority flex-fill">
                      <span className="badge bg-danger" title="priority">
                        High
                      </span>
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
          
                    <h4>Create landing page</h4>

                  <div className="d-flex flex-row task-footer">
                    <div className="added-by flex-fill">
                      <a className="comments ms-2 text-decoration-none text-dark-light">
                        <i className="fa fa-comments"></i>
                           200+
                      </a>
                    </div>
                    <div className="created_at flex-fill text-end">
                     <span><b>Due:</b> 18 Jul 2018</span> 
                    </div>
                    
                  </div>
                  </div>
                </li>

              </ul>
            </div>
            <div className="card-footer bg-transparent">
            <button onClick={()=>openTaskModal(column.id)} className=' board-column-btn'><i className="fa fa-plus"></i> Add New Task </button>
            <AddNewTask open={openNewTaskModal}   onClose={closeTaskModal} column_id={column.id} />
            </div>
          </div>






      ))
       ) : (
         <p>0 Columns found..</p>
       )} 



{/* <div className="card board">
          <div className="card-header">
            <h1 className="card-title">Queue</h1>
            <p className="card-subtitle">All tasks assigned by project owner</p>
          </div>
          <div className="card-body">
            <ul className="list-unstyled tasks-list">
            <li className="task" draggable="true">
                <a href="#" className="task-link">
                  <div className="d-flex flex-row task-header">
                    <div className="priority flex-fill">
                      <span className="badge bg-danger" title="priority">
                        High
                      </span>
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
          
                    <h4>Create landing page</h4>

                  <div className="d-flex flex-row task-footer">
                    <div className="added-by flex-fill">
                      <a className="comments ms-2 text-decoration-none text-dark-light">
                        <i className="fa fa-comments"></i>
                           200+
                      </a>
                    </div>
                    <div className="created_at flex-fill text-end">
                     <span><b>Due:</b> 18 Jul 2018</span> 
                    </div>
                    
                  </div>
                  </a>
                </li>
            
            </ul>
          </div>
        </div> */}


    </div>
  </div>
)
}

export default BoardView;