import { createBrowserRouter } from "react-router-dom";
import Home from "../AllRoute/Home";
import Login from "../Component/Login";
import Dashboard from "../Dashboard/Dashboard";
import Today from "../Dashboard/AllPath/Today";
import Empty from "../Component/Empty";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
      children:[
        {
            path:'/',
            element:<Dashboard></Dashboard>,
            children:[
                {
                    path:'today',
                    element:<Today></Today>
                },
                {
                  path:'empty',
                  element:<Empty></Empty>
                }
            ]
        }
      ]
    },
    {
        path:'login',
        element:<Login></Login>
    }
  ]);