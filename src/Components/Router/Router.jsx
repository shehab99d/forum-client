import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "../Pages/Home";
import JoinUs from "../Pages/JoinUs";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../Pages/Dashboard/MyProfile";
import AddPost from "../Pages/Dashboard/AddPost";
import MyPost from "../Pages/Dashboard/MyPost";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: 'join-us',
                element: <JoinUs></JoinUs>
            },
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            {
                path: 'my-profile',
                element: <MyProfile></MyProfile>
            },
            {
                path: 'add-post',
                element: <AddPost></AddPost>
            },
            {
                path: 'my-posts',
                element: <MyPost></MyPost>
            }
        ]
    }
])