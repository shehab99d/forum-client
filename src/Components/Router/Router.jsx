import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "../Pages/Home";
import JoinUs from "../Pages/JoinUs";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../Pages/Dashboard/MyProfile";
import AddPost from "../Pages/Dashboard/AddPost";
import MyPost from "../Pages/Dashboard/MyPost";
import MemberShip from "../Pages/MemberShip/MemberShip";
import Comment from "../Pages/Comment";
import PostDetails from "../Pages/PostDetails/PostDetails";

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
            {
                path: 'membership',
                element: <MemberShip></MemberShip>
            },
            {
                path: 'post/:id',
                element: <Comment></Comment>
            },
            {
                path: 'postDetails/:postId',
                element: <PostDetails></PostDetails>
            }
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