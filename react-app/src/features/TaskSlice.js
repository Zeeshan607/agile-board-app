import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CustomRequest from "../utils/customRequest.jsx";
import { handleErrors } from "../utils/helpers.js";

export const fetchTasks = createAsyncThunk(
  "fetch/board/tasks",
  async (boardSlug, { rejectWithValue }) => {
    try {
      const resp = await CustomRequest.get(
        `/dashboard/board/${boardSlug}/tasks`
      );
      return await resp.data.tasks;
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
  list: [],
  status: "idle",
  errors: [],
};

const TaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasksList: (state, action) => {
      state.list = action.payload.tasks;
    },
    insertTaskInTasksList: (state, action) => {
      state.list.push(action.payload.task);
    },
    updateTasksColumn: (state, action) => {
      const target_task = state.list.filter(
        (task) => task.id == action.payload.task_id
      );
      target_task[0].column_id = action.payload.column_id;

      state.list.map((task, index) => {
        if (task.id == action.payload.task_id) {
          state.list[index] = target_task[0];
        }
      });
    },
    updateTasksOrder: (state, action) => {
      const { column_id, tasksWithNewOrder } = action.payload;
      state.list = tasksWithNewOrder;
      // Create a map of the new tasks by their IDs for quick lookup
      // const tasksMap = tasksWithNewOrder.reduce((map, task) => {
      //   map[task.id] = task;
      //   return map;
      // }, {});

      // state.list = state.list.map(task => {
      //   // Only update tasks that belong to the same column and exist in the new order
      //   if (task.column_id === column_id && tasksMap[task.id]) {
      //     return tasksMap[task.id];  // Replace with the updated task
      //   }
      //   return task;  // Keep the task unchanged if it doesn't need to be updated
      // });

      // state.list = [...state.list.map(task => {
      //   if (task.column_id === column_id && tasksMap[task.id]) {
      //     return tasksMap[task.id];  // Replace with the updated task
      //   }
      //   return task;
      // })];
    },
    updateTaskTitle: (state, action) => {
      const target_task = state.list.filter(
        (task) => task.id == action.payload.task_id
      );
      target_task[0].title = action.payload.title;

      state.list.map((task, index) => {
        if (task.id == action.payload.task_id) {
          state.list[index] = target_task[0];
        }
      });
    },
    updateTaskDueDate: (state, action) => {
      const target_task = state.list.filter(
        (task) => task.id == action.payload.task_id
      );
      target_task[0].due_date = action.payload.due_date;

      state.list.map((task, index) => {
        if (task.id == action.payload.task_id) {
          state.list[index] = target_task[0];
        }
      });
    },
    updateTaskPriority: (state, action) => {
      const target_task = state.list.filter(
        (task) => task.id == action.payload.task_id
      );
      target_task[0].priority = action.payload.priority;

      state.list.map((task, index) => {
        if (task.id == action.payload.task_id) {
          state.list[index] = target_task[0];
        }
      });
    },
    updateTaskDescription: (state, action) => {
      const target_task = state.list.filter(
        (task) => task.id == action.payload.task_id
      );
      target_task[0].description = action.payload.description;

      state.list.map((task, index) => {
        if (task.id == action.payload.task_id) {
          state.list[index] = target_task[0];
        }
      });
    },
    incrementDiscussionCount: (state, action) => {
      const target_task = state.list.find(
        (task) => task.id == action.payload.task_id
      );
      target_task.discussionsCount += 1;
      state.list.map((task, index) => {
        if (task.id == action.payload.task_id) {
          state.list[index] = target_task;
        }
      });
    },
    decrementDiscussionCount: (state, action) => {
      const target_task = state.list.find(
        (task) => task.id == action.payload.task_id
      );
      target_task.discussionsCount -= 1;
      state.list.map((task, index) => {
        if (task.id == action.payload.task_id) {
          state.list[index] = target_task;
        }
      });
    },
    clearErrors: (state) => {
      state.errors = []; // Clear errors from state
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = "success";
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.errors.push(action.error.message);
      });
  },
});

export const {
  setTasksList,
  insertTaskInTasksList,
  updateTasksColumn,
  updateTasksOrder,
  updateTaskTitle,
  updateTaskDueDate,
  updateTaskPriority,
  updateTaskDescription,
  incrementDiscussionCount,
  decrementDiscussionCount,
  clearErrors,
} = TaskSlice.actions;
export const selectTasks = (state) => state.tasks.list;

export default TaskSlice.reducer;

export const taskMethods = {
  editTaskTitle: (task_id, update) => async (dispatch) => {
    try {
      const resp = await CustomRequest.post(
        "/dashboard/task/" + task_id + "/meta/update",
        update
      );
      if (resp.status == 200) {
        dispatch(updateTaskTitle({ task_id: task_id, title: update.title }));
        toast.success("Task Title udpated successfully.");
      }
    } catch (err) {
      // console.log(err)
      handleErrors(err);
    }
  },
  editTaskDueDate: (task_id, update) => async (dispatch) => {
    try {
      const resp = await CustomRequest.post(
        "/dashboard/task/" + task_id + "/meta/update",
        update
      );
      if (resp.status == 200) {
        dispatch(
          updateTaskDueDate({ task_id: task_id, due_date: update.due_date })
        );
        toast.success("Task due date udpated successfully.");
      }
    } catch (err) {
      // console.log(err)
      // toast.error("Error while trying to update due date.");
      handleErrors(err);
    }
  },
  editTaskPriority: (task_id, update) => async (dispatch) => {
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
      // toast.error("Error while trying to update priority.");
      handleErrors(err);
    }
  },
  editTaskDescription: (task_id, update) => async (dispatch) => {
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
      // toast.error("Error while trying to update Description.");
      handleErrors(err);
    }
  },
  updateTaskColumnId: (data) => async (dispatch) => {
    try {
      const resp = await CustomRequest.post(
        "/dashboard/task_column/update",
        data
      );
      if (resp.status == 200) {
        dispatch(updateTasksColumn(data));
        // toast.success('Task moved successfully');
      }
    } catch (err) {
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
            tasksWithNewOrder: reOrderedTasks,
            column_id: column_id,
          })
        );
        toast.success("Task ReOrdered successfully");
      }
    } catch (err) {
      console.log(err);
      handleErrors(err);
    }
  },
};
