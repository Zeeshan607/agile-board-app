import { createContext, useContext, useMemo } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import CustomRequest from "../utils/customRequest";
import { useDispatch,useSelector } from "react-redux";
import {jwtDecode} from 'jwt-decode';
import { setUserLoginStatus,setUserLogoutStatus } from "../features/UserAuthSlice.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userAuth.user);

  // call this function when you want to authenticate the user
  // LOGIN
  // resp = await CustomRequest.post("/auth/login", data);
  // const token = await resp.data?.token;


  // call this function to sign out logged in user
  const logout = async() => {
    try {
      const resp = await CustomRequest.post("/dashboard/auth/logout");
      dispatch(setUserLogoutStatus());
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.msg);
    }

  };

  // const value = useMemo(
  //   () => ({
  //     user,
  //     login,
  //     logout,
  //   }),
  //   [user]
  // );
  const value={user, logout};

  // console.log('AuthProvider value:', value);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  // console.log('useAuth context:', AuthContext); // Add this line to debug
  // if (!AuthContext) {
  //   throw new Error('useAuth must be used within an AuthProvider');
  // }
  return useContext(AuthContext);
};