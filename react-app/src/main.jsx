import React from 'react'
import { Provider } from 'react-redux';
import Store from "./app/store.js";
import { createRoot } from "react-dom/client";
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-modal/styles.css';
import {toast, ToastContainer } from 'react-toastify';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// page imports

import { PersistGate } from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import router from './routes.jsx';


// global variables
window.toast= toast;




const container= document.getElementById("root");
const root= createRoot(container);
let persister = persistStore(Store);

root.render(
  <Provider store={Store}>
    <PersistGate persistor={persister}>
      <RouterProvider router={router} />
      <ToastContainer position='top-right'/>
    </PersistGate>
  </Provider>
)

// createRoot(document.getElementById("root")).render(
//   <Provider store={Store}>
//   <RouterProvider router={router} />
//   <ToastContainer position='top-right'/>
//   </Provider>
// );

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
