import React from "react";
import {useDispatch} from "react-redux";
import { toast } from 'react-toastify';

export const getPersistedStateFromLocalStorage=()=>{
    const ps=JSON.parse(localStorage.getItem('persist:root'));
    return ps;
}

export const handleErrors=(err)=>{
  // console.log('getting in error handler')
    if (err.response) {
        const statusCode = err.response.status;
        const errorMessage = err.response.data?.msg || 'Oops! Something went wrong';
  
        if (statusCode === 400) {
          toast.error(`Validation Error: ${errorMessage}`);
        } else if (statusCode === 401) {
          toast.error('Unauthorized! Please login again.');
        } else if (statusCode === 404) {
          toast.error('Resource not found.');
        } else {
          // toast.error(errorMessage);
          toast.error("Oops! Something went wrong. Please try again");
        }
      } else if (err.request) {
        toast.error('No response from server. Please check your network connection.');
      } else {
        toast.error(`Error: ${err.message}`);
      }
}



