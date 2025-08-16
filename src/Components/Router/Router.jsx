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
import SinglePost from "../Pages/SinglePost";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";
import ErrorPage from "../../ErrorPage";
import AdminRoute from "../Pages/AdminRoutes";
import AdminOnly from "../Pages/AdminDashboard/AdminOnly";
import ManageUser from "../Pages/AdminDashboard/ManageUser";
import MakeAnnouncement from "../Pages/AdminDashboard/MakeAnnouncement";
import Setting from "../Pages/AdminDashboard/Setting";
import AboutMe from "../Pages/AboutMe";
import AdminProfile from "../Pages/AdminDashboard/AdminProfile";
import AboutUs from "../Pages/AboutUs";
// import Payment from "../../Payment";

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
                element: <PrivateRoute>
                    <MemberShip></MemberShip>
                </PrivateRoute>
            },
            {
                path: 'post/:id',
                element: <PrivateRoute>
                    <Comment></Comment>
                </PrivateRoute>
            },
            {
                path: 'postDetails/:postId',
                element: <PostDetails></PostDetails>
            },
            {
                path: 'singlePost/:id',
                element: <SinglePost></SinglePost>
            },
            {
                path: 'about-me',
                element: <AboutMe></AboutMe>
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
    },
    {
        path: 'admin',
        element: <AdminRoute>
            <AdminDashboard></AdminDashboard>
        </AdminRoute>,
        children: [
            {
                path: 'admin-dashboard',
                element: <AdminOnly></AdminOnly>
            },
            {
                path: 'manage-user',
                element: <ManageUser></ManageUser>
            },
            {
                path: 'make/announcement',
                element: <MakeAnnouncement></MakeAnnouncement>
            },
            {
                path: 'settings',
                element: <Setting></Setting>
            },
            {
                path: 'profile',
                element: <AdminProfile></AdminProfile>
            }
        ]
    },
    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    },
    {
        path: 'aboutUs',
        element: <AboutUs></AboutUs>
    }
])