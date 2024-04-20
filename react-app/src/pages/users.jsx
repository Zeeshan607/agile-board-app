import { useEffect } from "react";
import CustomRequest from "../utils/customRequest.jsx";
import { useDispatch } from "react-redux";
import { setUsersList } from "../features/UserSlice.js";


const Users=()=>{

const dispatch=useDispatch();

useEffect(()=>{
    fetchUser();
})


const fetchUser=async()=>{

    try{
        const resp= await CustomRequest.get("/dashboard/users");
        const users= await resp.data.users;
        dispatch(setUsersList({
            users:users
        }))
    }catch(err){
        toast.error(err.response?.data?.msg);
    }


    }




    return (
        <div>users list</div>
    )
}
export default Users