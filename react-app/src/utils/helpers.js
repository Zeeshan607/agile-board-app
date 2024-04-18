import React from "react";
import {useDispatch} from "react-redux";


export const getPersistedStateFromLocalStorage=()=>{
    const ps=JSON.parse(localStorage.getItem('persist:root'));
    return ps;
}





