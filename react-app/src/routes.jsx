import { createBrowserRouter ,useNavigate} from "react-router-dom";
import Register from "./auth/register.jsx";
import Login from "./auth/login.jsx";
import Dashboard from "./pages/dashboard.jsx";
import App from "./App.jsx";
import  WorkspaceMembers from './pages/workspaceMembers.jsx';
import Board from './pages/boards.jsx';
import EditBoard from './pages/editBoard.jsx';
import AddBoard from "./pages/addBoard.jsx";
import BoardView from "./pages/boardView.jsx";
import { useSelector } from "react-redux";
import { selectAuthToken } from "./features/UserAuthSlice.js";
import {ProtectedRoute }from "./hooks/protectedRoutes.jsx";
import { AuthProvider } from './hooks/useAuth.jsx';
import Invitation from "./pages/Invitation.jsx";
import PageNotFound from "./pages/404.jsx";
import Profile from "./pages/profile.jsx";



const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    // :workspace_id?token=:token
    path:'/join-workspace/:workspace_id',
    element:<Invitation/>
  },
  {
    // :workspace_id?token=:token
    path:'*',
    element:<PageNotFound/>
  },
  {
    path: "/",
    element: <AuthProvider><App /></AuthProvider>,
    children: [
      {
        index:true,
        element:<ProtectedRoute><Dashboard /></ProtectedRoute>,
      },
      {
        path:'/workspace_members',
        element: <ProtectedRoute><WorkspaceMembers/></ProtectedRoute>,
      },
      {
        path: "/boards",
        element:<ProtectedRoute ><Board /></ProtectedRoute>, 
      },
      {
        path: "/add-board",
        element: <ProtectedRoute ><AddBoard /></ProtectedRoute>,
      },
      {
        path: "/edit-board/:id",
        element: <ProtectedRoute><EditBoard /></ProtectedRoute>,
      },
      {
        path: "/board-view/:slug",
        element: <ProtectedRoute ><BoardView /></ProtectedRoute>,
      },
      {
        path: "/profile",
        element: <ProtectedRoute ><Profile /></ProtectedRoute>,
      },
  
    ],
  },
]);

export default router;
