import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CustomRequest from "../utils/customRequest.jsx";
import { handleErrors } from "../utils/helpers.js";




export const fetchColumnsTasks = createAsyncThunk(
  "fetch/board/columns_tasks",
  async (boardSlug, { rejectWithValue }) => {
    try {
      const resp = await CustomRequest.get(
        `/dashboard/board/${boardSlug}/columns_tasks`
      );
      return await resp.data.columnstasks;
    } catch (err) {
      if (err.response) {
        // The server responded with a status code that falls out of the range of 2xx
        return rejectWithValue(err.response.data);
      } else if (err.request) {
        // The request was made but no response was received
        return rejectWithValue("No response from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        return rejectWithValue("Request error:" + err.response.data.msg);
      }
    }
  }
);




const initialState = {
    list:[],
    status:"idle",
    errors:[],
}
// console.log(JSON.stringify(columnToRemoveTask, null, 2)); this line is use to check any variable value from reducer methods in console.log

const ColumnsTasksSlice = createSlice({
  name: 'columnsTasks',
  initialState,
  reducers: {
    setTasksList: (state, action) => {
      state.list = action.payload.tasks;
    },
    insertTaskInTasksList: (state, action) => {
      state.list=state.list.map(col=>{
        if(col.id===action.payload.column_id){
          col.Tasks.push(action.payload.task);
        }
        return col;
      })

    },
    updateTasksColumn: (state, action) => {
      //task being dragged
      const target_task = state.list.flatMap(col => col.Tasks).find(task => task.id == action.payload.task_id);
      // column from which i need to remove target task
      const columnToRemoveTask=state.list.find(col=>col.id==action.payload.sourceColumnId);

      // columnToRemoveTask with other tasks except the target task
      const columnTasksExceptTargetTask= columnToRemoveTask.Tasks.filter((task) => task.id !== target_task.id);

      columnToRemoveTask.Tasks=columnTasksExceptTargetTask // Target task removed from the source column;

      // updating column_id in target_task
      target_task.column_id = action.payload.destinationColumnId;

      state.list=state.list.map((col, index) => {
            // add target task to its destination column
            if(col.id==action.payload.destinationColumnId){
                  col.Tasks.push(target_task);
            }
            // update sourceColumn in state with new tasks array
            if(col.id==action.payload.sourceColumnId){
              return columnToRemoveTask;
            }
            return col;
          });
    },
    updateTasksOrder: (state, action) => {
      const {tasksWithNewOrder, column_id} = action.payload;
 
        state.list= state.list.map(col=>{
          if(col.id===column_id){
            col.Tasks=tasksWithNewOrder;
          }
          return col;
        })

    },
    updateColumnsOrder:(state, action)=>{
          state.list=action.payload.updatedColumns;
          
    },
    updateTaskTitle: (state, action) => {
      const target_task = state.list
      .flatMap(col => col.Tasks)
      .find(task => task.id === action.payload.task_id);
      target_task.title = action.payload.title;
      state.list=state.list.map((col, index) => {
           const updatedTasks= col.Tasks.map(task=>{
              if(task.id==action.payload.task_id){
                return target_task;
              }
              return task;
            });
        return {
          ...col,
          Tasks:updatedTasks
        }
      });
    },
    updateTaskDueDate: (state, action) => {
      const target_task = state.list
      .flatMap(col => col.Tasks)
      .find(task => task.id === action.payload.task_id);
      target_task.due_date = action.payload.due_date;

      state.list=state.list.map((col, index) => {
        const updatedTasks= col.Tasks.map(task=>{
           if(task.id==action.payload.task_id){
             return target_task;
           }
           return task;
         });
     return {
       ...col,
       Tasks:updatedTasks
     }
   });
    },
    updateTaskPriority: (state, action) => {
      const target_task = state.list
      .flatMap(col => col.Tasks)
      .find(task => task.id === action.payload.task_id);

      target_task.priority = action.payload.priority;

      state.list=state.list.map((col, index) => {
        const updatedTasks= col.Tasks.map(task=>{
                if(task.id==action.payload.task_id){
                  return target_task;
                }
              return task;
            });
          return {
            ...col,
            Tasks:updatedTasks
          }
        });
    },
    updateTaskDescription: (state, action) => {
      const target_task = state.list
      .flatMap(col => col.Tasks)
      .find(task => task.id === action.payload.task_id);

      target_task.description = action.payload.description;

      state.list=state.list.map((col, index) => {
        const updatedTasks= col.Tasks.map(task=>{
                if(task.id==action.payload.task_id){
                  return target_task;
                }
              return task;
            });
          return {
            ...col,
            Tasks:updatedTasks
          }
        });
    },
    incrementDiscussionCount: (state, action) => {
      const target_task = state.list
      .flatMap(col => col.Tasks)
      .find(task => task.id === action.payload.task_id);

      target_task.discussionsCount += 1;

      state.list=state.list.map((col, index) => {
        const updatedTasks= col.Tasks.map(task=>{
                if(task.id==action.payload.task_id){
                  return target_task;
                }
              return task;
            });
          return {
            ...col,
            Tasks:updatedTasks
          }
        });
    },
    decrementDiscussionCount: (state, action) => {
      const target_task = state.list
      .flatMap(col => col.Tasks)
      .find(task => task.id === action.payload.task_id);

      target_task.discussionsCount -= 1;
      state.list=state.list.map((col, index) => {
        const updatedTasks= col.Tasks.map(task=>{
           if(task.id==action.payload.task_id){
             return target_task;
           }
           return task;
         });
     return {
       ...col,
       Tasks:updatedTasks
     }
   });
    },
    createNewColumn:(state, action)=>{
      state.list.push(action.payload.column);
    },
    clearErrors: (state) => {
      state.errors = []; // Clear errors from state
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchColumnsTasks.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchColumnsTasks.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = "success";
      })
      .addCase(fetchColumnsTasks.rejected, (state, action) => {
        state.status = "rejected";
        state.errors.push(action.error.message);
      });
  },
});

export const {  
  setTasksList,
  insertTaskInTasksList,
  updateTasksColumn,
  updateTasksOrder,
  updateColumnsOrder,
  updateTaskTitle,
  updateTaskDueDate,
  updateTaskPriority,
  updateTaskDescription,
  incrementDiscussionCount,
  decrementDiscussionCount,
  createNewColumn,
  clearErrors} = ColumnsTasksSlice.actions;
export const selectColumnsTasks=state=>state.columnsTasks.list;

export default ColumnsTasksSlice.reducer

export const columnsTaskMethods = {
  editTaskTitle: ( task_id, update) => async (dispatch) => {
    try {
      const resp = await CustomRequest.post(
        "/dashboard/task/" + task_id + "/meta/update",
        update
      );
      if (resp.status == 200) {
        dispatch(updateTaskTitle({ "task_id": task_id, "title": update.title }));
        toast.success("Task Title udpated successfully.");
      }
    } catch (err) {
      // console.log(err)
      handleErrors(err);
    }
  },
  editTaskDueDate: ( task_id, update) => async (dispatch) => {
    try {
      const resp = await CustomRequest.post(
        "/dashboard/task/" + task_id + "/meta/update",
        update
      );
      if (resp.status == 200) {
        dispatch(
          updateTaskDueDate({  task_id: task_id, due_date: update.due_date })
        );
        toast.success("Task due date udpated successfully.");
      }
    } catch (err) {
      // console.log(err)
      handleErrors(err);
    }
  },
  editTaskPriority: ( task_id, update) => async (dispatch) => {
    try {
      const resp = await CustomRequest.post(
        "/dashboard/task/" + task_id + "/meta/update",
        update
      );
      if (resp.status == 200) {
        dispatch(
          updateTaskPriority({ task_id: task_id, priority: update.priority })
        );
        toast.success("Task priority udpated successfully.");
      }
    } catch (err) {
      // console.log(err)
      handleErrors(err);
    }
  },
  editTaskDescription: ( task_id, update) => async (dispatch) => {
    try {
      const resp = await CustomRequest.post(
        "/dashboard/task/" + task_id + "/meta/update",
        update
      );
      if (resp.status == 200) {
        dispatch(
          updateTaskDescription({
       
            task_id: task_id,
            description: update.description,
          })
        );
        toast.success("Task Description udpated successfully.");
      }
    } catch (err) {
      // console.log(err)
      handleErrors(err);
    }
  },
  updateTaskColumnId: (data) => async (dispatch) => {

    let requestData={'column_id':data.destinationColumnId,"task_id":data.task_id}

    try {
      const resp = await CustomRequest.post(
        "/dashboard/task_column/update",
       requestData
      );
      if (resp.status == 200) {
        dispatch(updateTasksColumn(data));
        // toast.success('Task moved successfully');
      }
    } catch (err) {
      // console.log(err)
      handleErrors(err);
    }
  },
  updateTaskOrder: (reOrderedTasks, column_id) => async (dispatch) => {
    try {
      const resp = await CustomRequest.post(
        `/dashboard/${column_id}/task_order/update`,
        { tasks: reOrderedTasks }
      );
      if (resp.status == 200) {
        dispatch(
          updateTasksOrder({
            "tasksWithNewOrder": reOrderedTasks,
            "column_id": column_id,
          })
        );
        // toast.success("Task ReOrdered successfully");
      }
    } catch (err) {
      // console.log(err);
      handleErrors(err);
    }
  },
  updateColumnsOrder:(columnsWithNewOrder)=>async(dispatch)=>{
    try {
      const resp = await CustomRequest.post(
        `/dashboard/columns/order/update`,
        { "updatedColumns": columnsWithNewOrder }
      );
      if (resp.status == 200) {
        dispatch(
          updateColumnsOrder({"updatedColumns": columnsWithNewOrder})
        );
      }
    } catch (err) {
      // console.log(err);
      handleErrors(err);
    }
  },
  createColumn:(form)=>async(dispatch)=>{
    try{
      const resp=await CustomRequest.post('/dashboard/column/store', form);
      if(resp.status==200){
        dispatch(createNewColumn({'column':resp.data.column}));
        toast.success('New Column Created Successfully');
      }
    }catch(err){
      console.log(err);
      handleErrors(err);
    }
  }
};
