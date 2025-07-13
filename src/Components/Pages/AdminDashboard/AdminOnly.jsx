import React from 'react';
import { motion } from 'framer-motion';
import { FaUserShield, FaFlag, FaComments, FaTools, FaUsersCog } from 'react-icons/fa';

const adminTasks = [
    {
        icon: <FaUserShield className="text-4xl text-white" />,
        title: "Manage Admins",
        description: "Promote or demote users to Admin role.",
    },
    {
        icon: <FaFlag className="text-4xl text-white" />,
        title: "Handle Reports",
        description: "Review and take action on reported posts or comments.",
    },
    {
        icon: <FaComments className="text-4xl text-white" />,
        title: "Moderate Comments",
        description: "Edit, hide or delete inappropriate comments.",
    },
    {
        icon: <FaUsersCog className="text-4xl text-white" />,
        title: "User Management",
        description: "View, block, or update user status and activities.",
    },
    {
        icon: <FaTools className="text-4xl text-white" />,
        title: "System Settings",
        description: "Change site settings, toggle features, and more.",
    },
];
// import bg from '../../../assets/bg-2.jpg'

const AdminOnly = () => {
    return (
        <div
            className="min-h-screen bg-cover bg-center rounded-2xl"
            // style={{ backgroundImage: `url(${bg})` }}
        >
            <div className=" bg-opacity-60 min-h-screen flex flex-col items-center justify-center px-4">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold text-white mb-10 text-center"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    Admin Dashboard Controls
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                    {adminTasks.map((task, index) => (
                        <motion.div
                            key={index}
                            className="bg-gradient-to-br from-[#1e293b] to-[#334155] p-6 rounded-2xl shadow-xl text-white hover:scale-105 transition-all duration-300 border border-gray-600"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-[#0f172a] p-3 rounded-full">
                                    {task.icon}
                                </div>
                                <h3 className="text-2xl font-semibold">{task.title}</h3>
                            </div>
                            <p className="text-gray-300">{task.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminOnly;
