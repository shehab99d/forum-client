import { Link, NavLink } from "react-router-dom";
import { FaBell, FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Forumify from "../Forumify";
import { AuthContext } from "../Router/Authentication/AuthContext";

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

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
                        <div className="badge badge-error badge-xs absolute -top-1 -right-1"></div>
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
                                    <img src={user.photo} alt="user" />
                                </div>
                            </div>
                            <ul className="mt-3 z-[1] p-3 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-56">
                                <li>
                                    <p className="text-sm font-bold text-yellow-400">{user.name}</p>
                                </li>
                                <li><Link to="/dashboard">Dashboard</Link></li>
                                <li><button>Logout</button></li>
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
                                            <img src={user.photo} alt="user" />
                                        </div>
                                    </div>
                                    <p className="text-sm font-bold text-yellow-400">{user.name}</p>
                                    <Link to="/dashboard">Dashboard</Link>
                                    <button>Logout</button>
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
