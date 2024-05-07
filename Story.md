workspaces are user's environments to separate things
Board => which is basically a project

- Relations
  user > has workspaces
  workspaces > has boards
  boards > has columns [queue, in-process , complete]
  board-columns > has tasks in them









<!-- helping code -->


<!-- from App.jsx -->
<!-- 
-------------------------------
const boards = useSelector(selectBoardsList);
let options = boards?.map((b) => {
  return { value: b.id, label: b.slug };
});
const handleSelect = (e) => {
  setSearchParams({ board: e.label });
};
const boardQuery = searchParams.get("board");
const selectedBoard=boardQuery?{value:boardQuery,label:boardQuery}:{value:"null",label:"--select Board--"}


pathname=="/"?(
<div className="input-group">
<Select
defaultValue={selectedBoard?selectedBoard:{value:"null",label:"--select Board--"}}
onChange={handleSelect}
options={options}
placeholder="0 board found"
/> 
<button className="btn btn-transparent" onClick={(e)=>setOpen(true)}><i className="fa fa-plus"></i></button>

</div>

):('') 
---------------------------
-->
