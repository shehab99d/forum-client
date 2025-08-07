import { Link, NavLink } from "react-router-dom";
import { FaBell, FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Forumify from "../Forumify";
import Swal from 'sweetalert2';

import { MdDashboard } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";


import { AuthContext } from "../Router/Authentication/AuthContext";
import useAdmin from "../Hooks/useAdmin";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
// import useAxios from "../Hooks/useAxios";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    // console.log(user);

    const [isAdmin, isAdminLoading] = useAdmin();

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const axiosSecure = useAxiosSecure();

    const { data: announcements = [] } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/announcements');
            return res.data
        }
    });

    const announcementsCount = announcements.length;


    const handleLogout = async () => {
        try {
            await logout(); // Context থেকে আসা logout function
            Swal.fire({
                title: 'Logged out!',
                text: 'You have been logged out successfully.',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Okay'
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: 'Logout failed. Please try again.',
                icon: 'error',
                confirmButtonColor: '#d33',
                confirmButtonText: 'Try Again'
            });
        }
    };


    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "text-yellow-400 font-semibold"
                            : "text-base-content hover:text-yellow-400 duration-200"
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/membership"
                    className={({ isActive }) =>
                        isActive
                            ? "text-yellow-400 font-semibold"
                            : "text-base-content hover:text-yellow-400 duration-200"
                    }
                >
                    Membership
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center">
            <div className="navbar bg-base-100 shadow-xl rounded-2xl px-4 sm:px-8 py-3 w-[95%] max-w-7xl transition-all duration-300 hover:scale-[1.01]">
                {/* Left (Logo + mobile toggle) */}
                <div className="flex-1 flex items-center justify-between">
                    <Forumify />

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden">
                        <button onClick={toggleMenu} className="btn btn-ghost text-xl">
                            <FaBars />
                        </button>
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-6 text-lg font-medium">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>

                    {/* Notification Bell */}
                    <div className="relative">
                        <FaBell className="text-xl cursor-pointer hover:text-yellow-400 transition" />
                        {
                            announcementsCount > 0 && (
                                <div className="badge badge-error badge-xs absolute -top-1 -right-1">
                                    {announcementsCount}
                                </div>
                            )
                        }
                    </div>

                    {/* Auth Buttons */}
                    {!user ? (
                        <Link
                            to="/join-us"
                            className="btn btn-sm px-5 bg-yellow-400 text-black hover:bg-yellow-500 font-bold rounded-full shadow-md transition duration-300"
                        >
                            Join Us
                        </Link>
                    ) : (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="avatar online cursor-pointer">
                                <div className="w-10 rounded-full ring ring-yellow-400 ring-offset-base-100 ring-offset-2">
                                    <img src={user.photoURL} alt="user" />
                                </div>
                            </div>
                            <ul className="mt-3 z-[1] p-3 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-56">
                                <li>
                                    <p className="text-sm font-bold text-yellow-400">{user.name}</p>
                                </li>
                                <li>
                                    <p className="text-sm font-bold cursor-not-allowed text-yellow-400">
                                        Name: {user.displayName || null}
                                    </p>
                                </li>
                                <li>
                                    <Link to="/dashboard">
                                        <MdDashboard className="text-lg" /> Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about-me">
                                        <FaUserCircle className="text-lg" /> About Me
                                    </Link>
                                </li>
                                {
                                    !isAdminLoading && isAdmin && (
                                        <li>
                                            <Link to="/admin">
                                                <RiAdminLine className="text-lg" /> Admin Dashboard
                                            </Link>
                                        </li>
                                    )
                                }
                                <li>
                                    <button onClick={handleLogout}>
                                        <FiLogOut className="text-lg" /> Logout
                                    </button>
                                </li>
                            </ul>

                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="lg:hidden absolute top-[75px] w-[90%] max-w-7xl bg-base-100 shadow-xl rounded-2xl py-4 px-6 mt-2">
                    <ul className="space-y-3 text-lg font-medium">
                        {navLinks}

                        <li>
                            <div className="relative inline-block">
                                <FaBell className="text-xl cursor-pointer hover:text-yellow-400 transition" />
                                <div className="badge badge-error badge-xs absolute -top-1 -right-1"></div>
                            </div>
                        </li>

                        <li>
                            {!user ? (
                                <Link
                                    to="/join-us"
                                    className="btn btn-sm px-5 bg-yellow-400 text-black hover:bg-yellow-500 font-bold rounded-full shadow-md transition duration-300"
                                >
                                    Join Us
                                </Link>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <div className="avatar online cursor-pointer">
                                        <div className="w-10 rounded-full ring ring-yellow-400 ring-offset-base-100 ring-offset-2">
                                            <img src={user.photoURL} alt="user" />
                                        </div>
                                    </div>
                                    <p className="text-sm font-bold text-yellow-400">{user.name}</p>
                                    <Link to="/dashboard">Dashboard</Link>
                                    <NavLink to="/about-me">
                                      
                                            About Me
                                        
                                    </NavLink>
                                    {
                                        !isAdminLoading && isAdmin && (<Link to="/admin">Admin Dashboard</Link>)
                                    }
                                    <button onClick={handleLogout}>Logout</button>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;
