import { configureStore, combineReducers, Tuple } from '@reduxjs/toolkit'
import userAuthReducer from '../features/UserAuthSlice.js';
import responseReducer from "../features/ResponseSlice.js"
import {persistReducer} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import boardsReducer from '../features/BoardSlice.js';
import columnReducer from '../features/ColumnSlice.js';
import userReducer from '../features/UserSlice.js';
import workspaceReducer from '../features/workspace.js';

const rootReducer= combineReducers({
  userAuth: userAuthReducer,
  response:responseReducer,

  boards:boardsReducer,
  columns:columnReducer,
  users:userReducer,
  workspace:workspaceReducer,
});

const persistConfig={
  key:'root',
  version:1,
  whitelist: ['userAuth'],
  storage,

};
const pr = persistReducer(persistConfig, rootReducer);
 const Store = configureStore({
  reducer: pr,
  // middleware: () => new Tuple(thunk),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false,}),
  
})
export default Store;