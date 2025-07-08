import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "../Pages/Home";
import JoinUs from "../Pages/JoinUs";

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
            }
        ]
    }
])