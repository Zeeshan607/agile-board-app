import React from 'react'
import { Provider } from 'react-redux';
import Store from "./app/store.js";
import { createRoot } from "react-dom/client";
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-modal/styles.css';
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/plugins/track_changes.min.js';
import 'froala-editor/js/plugins/image_manager.min.js';
import 'froala-editor/js/plugins//paragraph_format.min.js';
import 'froala-editor/js/plugins/paragraph_style.min.js';
import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/js/plugins/word_counter.min.js';
import 'froala-editor/js/plugins/word_paste.min.js';
import 'froala-editor/js/plugins/line_breaker.min.js';
import 'froala-editor/js/plugins/markdown.min.js';
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/emoticons.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/special_characters.min.js';
import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/js/plugins/inline_class.min.js';
// import 'froala-editor/js/plugins/';
// import 'froala-editor/js/plugins.pkgd.min.js';
import {toast, ToastContainer } from 'react-toastify';
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
} from "react-router-dom";
import $ from "jquery";
// page imports

import { PersistGate } from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import router from './routes.jsx';
import { AuthProvider } from './hooks/useAuth.jsx';

// global variables
window.toast= toast;
window.$=window.jQuery=$;



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
