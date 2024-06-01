import { Link, useParams, useSearchParams } from "react-router-dom";
import "./boardView.css";
import { useDispatch, useSelector } from "react-redux";
import React,{ useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import CustomRequest from "../utils/customRequest";
import { fetchColumns, selectColumnsList, setColumnsList } from "../features/ColumnSlice.js";
import Loading from "../components/Loading.jsx";
import { selectActiveWorkspace } from "../features/workspaceSlice.js";
import { selectTasks, setTasksList,fetchTasks } from "../features/TaskSlice.js";
import { selectBoardsList } from "../features/BoardSlice.js";
import Select from "react-select";
import CreateBoardModel from "../components/CreateBoardModel.jsx";
import { setActiveBoard } from "../features/BoardSlice.js";
import ColumnsList from "../components/ColumnsList.jsx";
// REMEMBER we are using BoardStatus as Columns in client side app, in server side its logics are as BoardStatus

const BoardView =React.memo( () => {
  // const [searchParams, setSearchParams]=useSearchParams();
  const param = useParams();
  const boardSlug = param.slug;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openCreateBoardModel, setOpenCreateBoardModel] = useState(false);
  const onOpenCreateBoardModal = useCallback(() => setOpenCreateBoardModel(true),[]);
  const onCloseCreateBoardModal = useCallback(() => setOpenCreateBoardModel(false),[]);
  const activeWorkspace = useSelector(selectActiveWorkspace);
  const columnsErr= useSelector(state=>state.columns.errors);
  const columnsStatus= useSelector(state=>state.columns.status);
  const wsStatus=useSelector(state=>state.workspace.status);
  const boardStatus=useSelector(state=>state.boards.status);
  const taskStatus=useSelector(state=>state.tasks.status);
  const activeWsId=useSelector(state=>state.workspace.active.id);

  // useEffect(()=>{



  // },[boardSlug])
  
  useEffect(() => {
    console.log('boardView component mounted');

      dispatch(setActiveBoard({ slug: boardSlug }));

    console.log(`ws status changed to ${wsStatus}`);
      if(boardStatus=="success"){

        console.log(wsStatus);
      if(columnsStatus=='idle'){
        dispatch(fetchColumns(boardSlug))
      }
      if(columnsErr.length!=0){
          columnsErr.map(err=>{
            toast.error("Columns Error: "+err);
          });
      }
      if(taskStatus=="idle"){
        dispatch(fetchTasks(boardSlug))
      }
  
    }


  }, [boardSlug, dispatch, boardStatus]);


  // const loadBoardColumns = async (slug) => {
  //   setIsLoading(true);
  //   try {
  //     const resp = await CustomRequest.get(`/dashboard/board/${slug}/columns`);
  //     const columns = await resp.data.columns;
  //     dispatch(setColumnsList({ columns: columns }));
  //     setIsLoading(false);
  //   } catch (err) {
  //     toast.error(err.response?.data?.msg);
  //     setIsLoading(false);
  //   }
  // };



  const boards = useSelector(selectBoardsList);
  let options = boards?.map((b) => {
    return { value: b.id, label: b.slug };
  });
  const handleSelect = (e) => {
    // setSearchParams({ board: e.label });
  };
  const boardQuery = searchParams.get("slug");
  const selectedBoard = boardQuery
    ? { value: boardQuery, label: boardQuery }
    : { value: "null", label: "--select Board--" };

  // console.log(boardQuery)

  const columns = useSelector(selectColumnsList);


if( wsStatus !== "success"){
  return <Loading/>
}

  return (
    <div className="container-fluid bg-white pt-3">
      <div className="row mx-0 bg-white p-3 shadow-md bg-body ">
        <div className="col-12 col-sm-12 col-md-6 col-lg-6">
          {activeWorkspace ? (
            <h6 className="m-0 d-inline-flex ">
              {" "}
              <b className="text-success flex-nowrap">Workspace:</b>{" "}
              <span title="Default Workspace">{activeWorkspace.title} </span>
            </h6>
          ) : (
            "No active workspace"
          )}

          <div className=" input-group-inline ms-2">
            <Select
              defaultValue={
                selectedBoard
                  ? selectedBoard
                  : { value: "null", label: "--select Board--" }
              }
              onChange={handleSelect}
              options={options}
              placeholder="0 board found"
            />
            <button
              className="btn btn-transparent"
              onClick={(e) => setOpenCreateBoardModel(true)}
            >
              <i className="fa fa-plus"></i>
            </button>
          </div>

          <CreateBoardModel
            open={openCreateBoardModel}
            ws_id={activeWorkspace?.id}
            onClose={onCloseCreateBoardModal}
          />
        </div>
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 text-end"></div>
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
          columns.map((column ,index) => (
          <ColumnsList column={column} key={index} wsId={activeWsId}/>
          ))
        ) : (
          <p>0 Columns found..</p>
        )}

   
      </div>
    </div>
  );
});

export default BoardView;
