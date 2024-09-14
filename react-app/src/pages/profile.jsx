import React,{useState} from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import CustomRequest from "../utils/customRequest.jsx";
import { useDispatch } from "react-redux";
import { handleErrors } from "../utils/helpers.js";
import { updateProfile } from "../features/UserAuthSlice.js";
import Swal from "sweetalert2";
const Profile=()=>{

    const {user,logout}= useAuth();
    const [profile,setProfile]=useState();
    const dispatch=useDispatch();



    const handleProfileUpdate=async (e)=>{
    if(!profile){
        toast.error('Empty file. Please select profile image first. ');
    }else{
        const formData = new FormData();
        formData.append('image', profile);
        formData.append('user_id',user.userId);
        
        try{
        const resp=await CustomRequest.post('/dashboard/update_profile_picture',formData);
        if(resp.status==200){
            dispatch(updateProfile({"imagePath":resp.data.url}));
            toast.success('Profile updated successfully');
        }
        }catch(err){
            console.log(err)
            handleErrors(err);
        }
    }
      
        
    }
 const handleAccountDeletion=(e)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this account all data including workspaces will be deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete!",
      }).then(async (result) => {
            if(result.isConfirmed){
           
                try{
                    const resp= await CustomRequest.post("/dashboard/delete_account", {'user':user});
                    if(resp.status==200){
                        toast.success('Account deleted successfully');
                        await logout();
                    }
                }catch(err){
                    console.log(err);
                    handleErrors(err);
                }
        
          


            }

      });
 }


 return (
    <div className="container-fluid p-0">

    <div className="mb-3">
        <h1 className="h3 d-inline align-middle">Profile</h1>
    
    </div>
    <div className="row">
        <div className="col-md-4 col-xl-3">
            <div className="card mb-3">
                <div className="card-header">
                    <h5 className="card-title mb-0">Profile Details</h5>
                </div>
                <div className="card-body text-center">
                    <img src={user.image??"/img/avatars/person-placeholder.png"} alt="Christina Mason" className="img-fluid rounded-circle mb-2" width="128" height="128" />
                    <h5 className="card-title mb-0">{user.name}</h5>
                
                </div>
                <hr className="my-0" />
            
                <hr className="my-0" />
                <div className="card-body">
                    <h5 className="h6 card-title">About</h5>
                    <ul className="list-unstyled mb-0">
                        <li className="mb-1"><span data-feather="home" className="feather-sm me-1"></span> Email: {user.email}</li>

                    </ul>

                    <hr />
                    <div className="row mx-0 mt-5">
                    <div className="col-12 text-center">
                        <button className="btn btn-danger" onClick={(e)=>handleAccountDeletion(e)}>Delete Account</button>
                    </div>
                </div>
                </div>
                <hr className="my-0" />
                {/* <div className="card-body">
                    <h5 className="h6 card-title">Elsewhere</h5>
                    <ul className="list-unstyled mb-0">
                        <li className="mb-1"><a href="#">staciehall.co</a></li>
                        <li className="mb-1"><a href="#">Twitter</a></li>
                        <li className="mb-1"><a href="#">Facebook</a></li>
                        <li className="mb-1"><a href="#">Instagram</a></li>
                        <li className="mb-1"><a href="#">LinkedIn</a></li>
                    </ul>
                </div> */}
            </div>
        </div>

        <div className="col-md-8 col-xl-9">
            <div className="card">
                <div className="card-header">

                    <h5 className="card-title mb-0">Actions</h5>
                </div>
                <div className="card-body h-100">

                <div className="form-group">
                    <label htmlFor="profile_picture">Update Profile Picture</label>
                    <input type="file" name="profile_picture" id="profile_picture" onChange={(e)=>setProfile(e.target.files[0])} className="form-control form-control-file" />
                </div>
                <div className="row mx-0 mt-3">
                    <div className="col-12 text-end">
                        <button className="btn btn-primary" onClick={(e)=>handleProfileUpdate(e)}>Update</button>
                    </div>
                </div>
                <hr />
             

                
                </div>
            </div>
        </div>
    </div>

</div>
 )   
}

export default Profile;