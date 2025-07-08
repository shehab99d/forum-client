import { NavLink, Outlet } from "react-router-dom";
import { FaUser, FaPlusCircle, FaClipboardList } from "react-icons/fa";
import Forumify from "../Forumify";

const DashboardLayout = () => {
    return (
        <div className="lg:min-h-screen flex flex-col lg:flex-row bg-[#0f0f0f] text-white">
            {/* Sidebar */}
            <div className="w-full lg:w-64 bg-gradient-to-b from-[#1a1a1a] to-[#2c2c2c] p-6 shadow-xl">
                <div className="mb-3 flex justify-center lg:justify-start">
                    <Forumify />
                    <Forumify />
                    <Forumify />
                </div>
                <h2 className="text-2xl font-bold text-gold mb-8 text-center lg:text-left">📂 Dashboard</h2>

                <ul className="space-y-4 text-center lg:text-left">
                    <li>
                        <NavLink
                            to="/dashboard/my-profile"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-gold font-semibold flex items-center justify-center lg:justify-start gap-2"
                                    : "text-gray-300 hover:text-gold flex items-center justify-center lg:justify-start gap-2"
                            }
                        >
                            <FaUser /> My Profile
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/dashboard/add-post"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-gold font-semibold flex items-center justify-center lg:justify-start gap-2"
                                    : "text-gray-300 hover:text-gold flex items-center justify-center lg:justify-start gap-2"
                            }
                        >
                            <FaPlusCircle /> Add Post
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/dashboard/my-posts"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-gold font-semibold flex items-center justify-center lg:justify-start gap-2"
                                    : "text-gray-300 hover:text-gold flex items-center justify-center lg:justify-start gap-2"
                            }
                        >
                            <FaClipboardList /> My Posts
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Page Content */}
            <div className="flex-1 p-6 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
