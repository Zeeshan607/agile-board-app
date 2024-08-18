import { createBrowserRouter ,useNavigate} from "react-router-dom";
import Register from "./auth/register.jsx";
import Login from "./auth/login.jsx";
import Dashboard from "./pages/dashboard.jsx";
import App from "./App.jsx";
import Users from './pages/users.jsx';
import Board from './pages/boards.jsx';
import EditBoard from './pages/editBoard.jsx';
import AddBoard from "./pages/addBoard.jsx";
import BoardView from "./pages/boardView.jsx";
import { useSelector } from "react-redux";
import { selectAuthToken } from "./features/UserAuthSlice.js";
import {ProtectedRoute }from "./hooks/protectedRoutes.jsx";
import { AuthProvider } from './hooks/useAuth.jsx';

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
    path: "/",
    element: <AuthProvider><App /></AuthProvider>,
    children: [
      {
        index:true,
        element:<ProtectedRoute><Dashboard /></ProtectedRoute>,
      },
      {
        path:'/users',
        element: <ProtectedRoute><Users/></ProtectedRoute>,
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
    ],
  },
]);

export default router;
