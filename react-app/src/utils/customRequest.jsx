import axios from 'axios';
import store from "../app/store.js"
import { setUserLogoutStatus } from '../features/UserAuthSlice.js';
import {Navigate} from "react-router-dom";
const CustomRequest=axios.create({
    baseURL:"/api/v1"
})

// Define response interceptor for error handling
CustomRequest.interceptors.response.use(
    response => response, // Return response for successful requests
    error => {
      if (error.response && error.response.status === 401) {
        // Trigger logout action upon token expiry or authentication failure
        store.dispatch(setUserLogoutStatus());
        <Navigate to={ '/login'} replace />
      }
      return Promise.reject(error); // Reject promise with the error
    }
  );


export default CustomRequest;