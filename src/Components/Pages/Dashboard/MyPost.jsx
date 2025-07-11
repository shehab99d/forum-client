import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FaCommentDots, FaTrash } from 'react-icons/fa';

const MyPosts = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: myPosts = [], refetch } = useQuery({
        queryKey: ['myPosts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/user?email=${user?.email}`);
            return res.data;
        }
    });

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this post.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/posts/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire("Deleted!", "Post has been deleted.", "success");
                    refetch();
                }
            } catch (err) {
                Swal.fire("Error!", err.message, "error");
            }
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center px-4 py-10"
            style={{ backgroundImage: `url('/my-post-bg.jpg')` }}
        >
            <div className="bg-black bg-opacity-70 rounded-xl shadow-2xl p-6 md:p-10 max-w-6xl mx-auto text-white">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-400 mb-8">
                    📋 My Posts
                </h2>

                {myPosts.length === 0 ? (
                    <p className="text-center text-gray-300 text-lg">
                        You haven't posted anything yet.
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table w-full text-center text-white">
                            <thead className="bg-gradient-to-r from-yellow-700 to-yellow-500 text-black">
                                <tr>
                                    <th>#</th>
                                    <th>Post Title</th>
                                    <th>Votes</th>
                                    <th>Comment</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody className="bg-black bg-opacity-40 text-white">
                                {myPosts.map((post, index) => (
                                    <tr
                                        key={post._id}
                                        className="hover:bg-black hover:bg-opacity-60 transition-all"
                                    >
                                        <td className="font-bold py-4">{index + 1}</td>

                                        <td className="font-medium py-4">
                                            <div className="bg-amber-950 bg-opacity-80 rounded-md px-3 py-2">
                                                {post.title}
                                            </div>
                                        </td>

                                        <td className="py-4">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="flex items-center gap-1 text-green-400 font-semibold">
                                                    <img
                                                        src="https://cdn-icons-png.flaticon.com/512/889/889140.png"
                                                        alt="Upvote"
                                                        className="w-5 h-5"
                                                    />
                                                    <span>{post.upvote || 0}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-red-400 font-semibold">
                                                    <img
                                                        src="https://cdn-icons-png.flaticon.com/512/889/889144.png"
                                                        alt="Downvote"
                                                        className="w-5 h-5"
                                                    />
                                                    <span>{post.downvote || 0}</span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-4">
                                            <button
                                                onClick={() => navigate(`/post/${post._id}`)}
                                                className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 text-white font-semibold flex items-center gap-2 transition duration-300 hover:scale-105"
                                            >
                                                <FaCommentDots className="text-white" />
                                                Comment
                                            </button>
                                        </td>

                                        <td className="py-4">
                                            <button
                                                onClick={() => handleDelete(post._id)}
                                                className="btn btn-sm bg-red-600 hover:bg-red-800 text-white shadow-md flex items-center gap-2 px-4 py-2 rounded-md transition-all"
                                            >
                                                <FaTrash />
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyPosts;
