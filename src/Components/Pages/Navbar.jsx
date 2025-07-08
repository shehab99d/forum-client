import { Link, NavLink } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
    const user = null; // Replace with auth context later

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center">
            <div className="navbar bg-base-100 shadow-xl rounded-2xl px-8 py-4 w-[90%] max-w-7xl transition-all duration-300 hover:scale-[1.01]">
                {/* Left Side (Logo) */}
                <div className="flex-1">
                    <Link to="/" className="text-3xl font-bold text-yellow-400 tracking-wider">
                        Forumify
                    </Link>
                </div>

                {/* Right Side (Links & Icons) */}
                <div className="flex items-center gap-6 text-lg font-medium">
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

                    <div className="relative">
                        <FaBell className="text-xl cursor-pointer hover:text-yellow-400 transition" />
                        <div className="badge badge-error badge-xs absolute -top-1 -right-1"></div>
                    </div>

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
                                    <img src={user.photo} alt="user" />
                                </div>
                            </div>
                            <ul className="mt-3 z-[1] p-3 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-56">
                                <li>
                                    <p className="text-sm font-bold text-yellow-400">{user.name}</p>
                                </li>
                                <li>
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>
                                <li>
                                    <button>Logout</button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
