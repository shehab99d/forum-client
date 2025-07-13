import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FaUserShield } from 'react-icons/fa';
import Loading from '../../../Loading/Loading';

const ManageUser = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['all-users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    const handleDelete = async (email) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `${email} will be removed from admin role.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, remove admin!',
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.patch(`/user/admin/${email}`);
                if (res.data.modifiedCount > 0) {
                    Swal.fire('Removed!', `${email} is no longer an admin.`, 'success');
                    refetch();
                }
            } catch (error) {
                console.log(error);
                Swal.fire('Failed!', 'Something went wrong.', 'error');
            }
        }
    };

    const handleMakeAdmin = async (email) => {
        try {
            const res = await axiosSecure.patch(`/users/admin/${email}`);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: '✅ Success!',
                    text: `${email} is now an admin.`,
                });
                refetch();
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: '❌ Failed',
                text: 'Something went wrong!',
            });
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="p-4 md:p-8 bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-xl shadow-xl">
            <h2 className="text-4xl font-bold mb-8 flex items-center gap-3 text-yellow-400">
                <FaUserShield className="text-yellow-400 text-3xl" />
                Manage Users
            </h2>

            <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-inner">
                <table className="table w-full">
                    <thead className="bg-gray-800 text-yellow-300 text-sm uppercase">
                        <tr>
                            <th className="py-4 px-4">#</th>
                            <th className="py-4 px-4">Name</th>
                            <th className="py-4 px-4">Email</th>
                            <th className="py-4 px-4">Role</th>
                            <th className="py-4 px-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={user._id}
                                className="hover:bg-gray-700 transition duration-300"
                            >
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4">{user.name || user.displayName || 'N/A'}</td>
                                <td className="py-3 px-4">{user.email}</td>
                                <td className="py-3 px-4">
                                    <span
                                        className={`px-3 py-1 text-xs font-bold rounded-full 
                                            ${user.role === 'admin'
                                                ? 'bg-green-700 text-white'
                                                : 'bg-yellow-600 text-white'
                                            }`}
                                    >
                                        {user.role || 'user'}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-center space-x-2">
                                    {user.role === 'admin' ? (
                                        <button className="btn btn-sm btn-disabled bg-gray-600 text-gray-300 cursor-not-allowed">
                                            Already Admin
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleMakeAdmin(user.email)}
                                            className="btn btn-sm btn-outline btn-warning"
                                        >
                                            Make Admin
                                        </button>
                                    )}
                                    {user.role === 'admin' && (
                                        <button
                                            onClick={() => handleDelete(user.email)}
                                            className="btn btn-sm btn-error"
                                        >
                                            Remove Admin
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;
