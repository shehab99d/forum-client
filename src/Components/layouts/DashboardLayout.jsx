import { NavLink, Outlet } from "react-router-dom";
import { FaUser, FaPlusCircle, FaClipboardList } from "react-icons/fa";
import Forumify from "../Forumify";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";

const DashboardLayout = () => {
    const location = useLocation();
    const isDashboardHome = location.pathname === '/dashboard';

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [totalPosts, setTotalPosts] = useState(0);
    const [totalUpvotes, setTotalUpvotes] = useState(0);
    const [membership, setMembership] = useState("Bronze");

    useEffect(() => {
        const fetchData = async () => {
            if (!user?.email) return;

            try {
                // ইউজারের ডাটাবেজ ইনফো নেওয়া (isMember ফিল্ড চেক করতে)
                const userRes = await axiosSecure.get(`/users/${user.email}`);
                const dbUser = userRes.data;
                if (dbUser?.isMember) {
                    setMembership("Gold");
                } else {
                    setMembership("Bronze");
                }

                // সব পোস্টের সারাংশ নেওয়া (totalPosts, totalUpvotes)
                const postRes = await axiosSecure.get(`/posts/summary-by-author?email=${user.email}`);
                const summary = postRes.data || {};

                setTotalPosts(summary.totalPosts || 0);
                setTotalUpvotes(summary.totalUpvotes || 0);

            } catch (err) {
                console.error("❌ Error fetching dashboard data:", err);
            }
        };

        fetchData();
    }, [user, axiosSecure]);

    return (
        <div className="lg:min-h-screen flex flex-col lg:flex-row bg-[#0f0f0f] text-white">
            {/* Sidebar */}
            <div className="w-full lg:w-64 bg-gradient-to-b from-[#1a1a1a] to-[#2c2c2c] p-6 shadow-xl">
                <div className="mb-3 flex justify-center lg:justify-start">
                    <Forumify />
                    <Forumify />
                    <Forumify />
                </div>
                <NavLink to='/dashboard'>
                    <h2 className="text-2xl font-bold text-gold mb-8 text-center lg:text-left">📂 Dashboard</h2>
                </NavLink>

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
            <div className="flex-1 p-6 overflow-y-auto relative">
                <img
                    src="https://i.ibb.co/cS2gtTm8/2560x1440-blue-abstract-noise-free-website-background-image-4.jpg"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
                />

                {/* Welcome Section */}
                {isDashboardHome && (
                    <div className="relative z-10 bg-black/50 backdrop-blur-md rounded-xl p-10 max-w-4xl mx-auto text-white shadow-xl">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-400 text-center">
                            👋 Welcome to Your Dashboard!
                        </h1>
                        <p className="text-center text-lg md:text-xl text-gray-300 mb-6">
                            Manage your posts, monitor your activity, and explore new content — all in one place.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <div className="bg-yellow-600/20 p-6 rounded-lg shadow-md text-center">
                                <h3 className="text-xl font-semibold text-yellow-300">Total Posts</h3>
                                <p className="text-3xl font-bold mt-2">{totalPosts}</p>
                            </div>
                            <div className="bg-yellow-600/20 p-6 rounded-lg shadow-md text-center">
                                <h3 className="text-xl font-semibold text-yellow-300">Upvotes</h3>
                                <p className="text-3xl font-bold mt-2">{totalUpvotes}</p>
                            </div>
                            <div className="bg-yellow-600/20 p-6 rounded-lg shadow-md text-center">
                                <h3 className="text-xl font-semibold text-yellow-300">Membership</h3>
                                <p className="text-3xl font-bold mt-2">{membership}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Nested Route will render here */}
                <div className="mt-10 relative z-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
