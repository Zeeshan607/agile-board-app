import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CustomRequest from "../utils/customRequest.jsx";
import { incrementDiscussionCount,  decrementDiscussionCount} from "./TaskSlice.js";


export const fetchTaskDiscussions = createAsyncThunk(
  "dashboard/task/discussions",
  async (task_id, { rejectWithValue }) => {
    try {
      const resp = await CustomRequest.get(
        `/dashboard/task/${task_id}/discussions`
      );
      return await resp.data.discussions;
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

const TaskDiscussionSlice = createSlice({
  name: "taskDiscussions",
  initialState,
  reducers: {
    addNewComment: (state, action) => {
      state.list.unshift(action.payload.comment);
    },
    updateComment: (state, action) => {
      // const target_task= state.list.filter(task=> task.id==action.payload.subTask.id);
      // target_task[0].due_date= action.payload.due_date;
      state.list.map((c, index) => {
        if (c.id == action.payload.comment.id) {
          state.list[index] = action.payload.comment;
        }
      });
    },
    deleteComment: (state, action) => {
      let newList = state.list.filter(
        (c) => c.id !== action.payload.comment_id
      );
      state.list = newList;
    },
    resetList:(state,action)=>{
      state.list=[];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTaskDiscussions.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchTaskDiscussions.fulfilled, (state, action) => {
        state.status = "success";
        state.list = action.payload;
      })
      .addCase(fetchTaskDiscussions.rejected, (state, action) => {
        state.status = "failed";
        state.errors.push(action.error.message);
      });
  },
});

export const { addNewComment, updateComment, deleteComment, resetList } =
  TaskDiscussionSlice.actions;
export const selectComments = (state) => state.taskDiscussions.list;
export default TaskDiscussionSlice.reducer;

export const taskDiscussionMethods = {
  createNewComment: (comment, task_id) => async (dispatch) => {
    try {
      const resp = await CustomRequest.post(`/dashboard/comment/store`, {
        message: comment,
        task_id: task_id,
      });
      if (resp.status == 200) {
        dispatch(addNewComment({ comment: resp.data.comment }));
        dispatch(incrementDiscussionCount({'task_id':task_id,"count":1}))
        toast.success("Comment added successfully.");
      }
    } catch (err) {
      toast.error(
        "Oops! something went wrong while creating new comment. please try again"
      );
    }
  },
  editComment: (comment, comment_id) => async (dispatch) => {
    try {
      const resp = await CustomRequest.patch(`/dashboard/comment/${comment_id}/udpate`, {
        'message': comment
      });
      if (resp.status == 200) {
        dispatch(updateComment({ 'comment': resp.data.comment }));
        toast.success("Comment udpated successfully.");
      }
    } catch (err) {
      toast.error(
        "Oops! something went wrong while updating comment. please try again"
      );
    }
  },
  deleteComment: (comment_id,task_id) => async (dispatch) => {
    try {
      const resp = await CustomRequest.delete(`/dashboard/comment/${comment_id}/destroy`);
      if (resp.status == 200) {
        dispatch(deleteComment({'comment_id':comment_id}));
        dispatch(decrementDiscussionCount({"task_id":task_id}))
        toast.success("Comment deleted successfully.");
      }
    } catch (err) {
      toast.error(
        "Oops! something went wrong while deleting comment. please try again"
      );
    }
  },
  deleteCompleteDiscussion:(parent_task_id)=>async(dispatch)=>{
  try {
      const resp = await CustomRequest.delete(`/dashboard/task/${parent_task_id}/discussion/destroy_all`);
      if (resp.status == 200) {
        dispatch(resetList());
        toast.success("Discussion deleted successfully.");
      }
    } catch (err) {
      toast.error(
        "Oops! something went wrong while deleting discussion. please try again"
      );
    }
  }

};
