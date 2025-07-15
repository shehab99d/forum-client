import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // States
    const [userInfo, setUserInfo] = useState(null);
    const [postCount, setPostCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;
        // console.log(user.email);


        const fetchData = async () => {
            setLoading(true);
            try {
                // একসাথে সব API কল
                const [userRes, postRes, commentRes, usersCountRes] = await Promise.all([
                    axiosSecure.get(`/user/${user.email}`),
                    axiosSecure.get(`/posts/count/${user.email}`),
                    axiosSecure.get(`/comments/count/${user.email}`),
                    axiosSecure.get('/usersCount/count')
                ]);
                // console.log('🔢 Total users res:', usersCountRes.data),

                    setUserInfo(userRes.data);
                setPostCount(postRes.data.postCount);
                setCommentCount(commentRes.data.commentCount);
                setTotalUsers(usersCountRes.data.totalUsers);

            } catch (error) {
                console.error('Failed to fetch admin profile data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, axiosSecure]);

    if (loading) {
        return (
            <div className="text-center p-6 text-yellow-400 font-semibold">Loading profile data...</div>
        );
    }

    const pieData = [
        { name: 'Posts', value: postCount },
        { name: 'Comments', value: commentCount },
        { name: 'Users', value: totalUsers }
    ];

    // custom color set
    const COLORS = ['#FFD700', '#8A2BE2', '#FF7F50'];

    return (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10 text-center">
            <img
                src={userInfo?.photo || user?.photoURL || '/default-avatar.png'}
                alt={userInfo?.name || user?.displayName || 'Admin'}
                className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
            />
            <h1 className="text-3xl font-bold mb-1 text-yellow-600">{userInfo?.name || user?.displayName || 'No Name'}</h1>
            <p className="text-gray-600 mb-4">{userInfo?.email || user?.email}</p>

            <div className="grid grid-cols-3 text-black gap-6 mt-6 text-center">
                <div className="bg-yellow-100 rounded-lg p-4 shadow">
                    <h3 className="text-xl font-semibold">{postCount}</h3>
                    <p className="text-sm text-yellow-700">Posts</p>
                </div>
                <div className="bg-yellow-100 text-black rounded-lg p-4 shadow">
                    <h3 className="text-xl font-semibold">{commentCount}</h3>
                    <p className="text-sm text-yellow-700">Comments</p>
                </div>
                <div className="bg-yellow-100 text-black rounded-lg p-4 shadow">
                    <p className="text-sm text-yellow-700">Users</p>
                    <h3 className="text-xl text-black font-semibold">{totalUsers || 0}</h3>
                </div>
            </div>

            {/* Pie Chart Section */}
            <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4 text-yellow-600 text-center">📊 Activity Overview</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};

export default AdminProfile;
