import { createBrowserRouter } from "react-router-dom";
import Register from "./auth/register.jsx";
import Login from "./auth/login.jsx";
import Dashboard from "./pages/dashboard.jsx";
import App from "./App.jsx";
import Users from './pages/users.jsx';
import Board from './pages/boards.jsx';
import EditBoard from './pages/editBoard.jsx';
import AddBoard from "./pages/addBoard.jsx";
import BoardView from "./pages/boardView.jsx";








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
    element: <App />,
    children: [
      {
        index:true,
        element: <Dashboard />,
      },
      {
        path:'/users',
        element:<Users/>
      },
      // {
      //   path:'/projects',
      //   element:<Projects/>,
      
      // },
      // {
      //   path:"/add-project",
      //   element:<AddProject/>
      // },
      // {
      //   path:"/edit-project/:id",
      //   element:<EditProject/>
      // },
      {
        path: "/boards",
        element: <Board />,
      },
      {
        path: "/add-board",
        element: <AddBoard />,
      },
      {
        path: "/edit-board/:id",
        element: <EditBoard />,
      },
      {
        path: "/board-view/:slug",
        element: <BoardView />,
      },
    ],
  },
]);

export default router;
