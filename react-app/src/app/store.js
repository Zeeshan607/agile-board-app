import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userAuthReducer from "../features/UserAuthSlice.js";
import responseReducer from "../features/ResponseSlice.js";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import boardsReducer from "../features/BoardSlice.js";
import columnReducer from "../features/ColumnSlice.js";
import workspaceReducer from "../features/workspaceSlice.js";
import taskReducer from "../features/TaskSlice.js";
import WorkspaceMembersReducer from "../features/WorkspaceMembersSlice.js";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'; 
import modalReducer from '../features/modalSlice.js';
import taskDiscussionReducer from "../features/TaskDiscussionSlice.js";
import subTaskReducer from "../features/SubTaskSlice.js"


const preventDuplicateWorkspaceFetch = store => next => action => {
  const { getState } = store;
  
  // Check if `fetchWorkspaces` thunk is being dispatched
  if (action.type === 'dashboard/workspaces/pending') {
    const fetchStatus = getState().workspaceSlice.status;
    
    // If it's already pending, prevent dispatch
    if (fetchStatus === 'pending') {
      return;
    }
  }
  
  return next(action);
};



const appReducer = combineReducers({
  userAuth: userAuthReducer,
  response: responseReducer,

  boards: boardsReducer,
  columns: columnReducer,

  workspace: workspaceReducer,
  tasks: taskReducer,
  workspaceMembers:WorkspaceMembersReducer ,
  modals: modalReducer,
  taskDiscussions:taskDiscussionReducer,
  subTasks:subTaskReducer,

});


const rootReducer= (state, action )=>{
  console.log(action.type)
  if (action.type === 'userAuth/setUserLogoutStatus') {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

const persistConfig = {
  key: "root",
  version: 1,
  stateReconciler: autoMergeLevel2,
  whitelist: ["userAuth","workspace"],
  storage,
};
const pr = persistReducer(persistConfig, rootReducer);
const Store = configureStore({
  reducer: pr,
  // middleware: () => new Tuple(thunk),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),

});
export default Store;
