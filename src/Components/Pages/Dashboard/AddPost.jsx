// src/Pages/Dashboard/AddPost.jsx
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../../Loading/Loading';

const AddPost = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [postLimitReached, setPostLimitReached] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkPostLimit = async () => {
        try {
            const res = await axiosSecure.get(`/post-count?email=${user?.email}`);
            const count = res.data.count;
            const isMember = res.data.isMember;
            if (!isMember && count >= 5) {
                setPostLimitReached(true);
            }
        } catch (error) {
            console.error('Error fetching post count:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email) {
            checkPostLimit();
        }
    }, [user]);

    const onSubmit = async (data) => {
        const postData = {
            title: data.title,
            description: data.description,
            tag: data.tag,
            authorName: user?.displayName,
            authorEmail: user?.email,
            authorImage: user?.photoURL,
            upvote: 0,
            downvote: 0,
            visibility: data.visibility,
            createdAt: new Date()
        };

        try {
            const res = await axiosSecure.post('/posts', postData);
            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Post added successfully!',
                    timer: 1500,
                    showConfirmButton: false
                });
                reset();
                queryClient.invalidateQueries(['posts']);
                await checkPostLimit(); // ✅ post count update করো
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to add post',
                text: error.message
            });
        }
    };


    if (loading) return <Loading />;

    if (postLimitReached) {
        return (
            <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-4" style={{ backgroundImage: `url('/my-post-bg.jpg')` }}>
                <div className="bg-white/15 bg-opacity-70 text-white rounded-xl p-10 shadow-lg max-w-xl text-center">
                    <p className="text-2xl  font-bold mb-6 text-red-400">
                        You can only add 5 posts as a regular user.
                    </p>
                    <button
                        onClick={() => navigate('/membership')}
                        className="btn bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-6 py-2 rounded-full text-lg hover:scale-105 transition-transform duration-300 shadow-md"
                    >
                        🚀 Become a Member
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cover bg-center px-4 py-10 md:px-12 lg:px-20" style={{ backgroundImage: `url('/my-post-bg.jpg')` }}>
            <div className="bg-black bg-opacity-70 rounded-2xl shadow-2xl p-6 md:p-10 max-w-4xl mx-auto text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-yellow-400">
                    📨 Add New Post
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="label text-lg font-semibold text-white">Post Title</label>
                        <input
                            {...register("title", { required: true })}
                            className="input input-bordered w-full bg-gray-800 text-white placeholder-gray-400"
                            placeholder="Enter your post title"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="label text-lg font-semibold text-white">Post Description</label>
                        <textarea
                            {...register("description", { required: true })}
                            className="textarea textarea-bordered w-full bg-gray-800 text-white placeholder-gray-400"
                            rows="5"
                            placeholder="Write your thoughts..."
                        />
                    </div>

                    {/* Tag & Visibility */}
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <label className="label text-lg font-semibold text-white">Tag</label>
                            <select {...register("tag", { required: true })} className="select select-bordered w-full bg-gray-800 text-white">
                                <option value="">Choose tag</option>
                                <option value="JavaScript">JavaScript</option>
                                <option value="React">React</option>
                                <option value="Node.js">Node.js</option>
                                <option value="MongoDB">MongoDB</option>
                                <option value="HTML">HTML</option>
                                <option value="Css">Css</option>
                                <option value="Python">Python</option>
                                <option value="C">C</option>
                                <option value="C++">C++</option>
                                <option value="Express.js">Express.js</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="label text-lg font-semibold text-white">Visibility</label>
                            <select {...register("visibility", { required: true })} className="select select-bordered w-full bg-gray-800 text-white">
                                <option value="public">Public</option>
                                <option value="private">Private (Only Me)</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn bg-yellow-600 hover:bg-yellow-700 text-white font-semibold w-full py-3 rounded-lg shadow-lg mt-4 transition-transform hover:scale-[1.02] duration-300">
                        🚀 Submit Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPost;
