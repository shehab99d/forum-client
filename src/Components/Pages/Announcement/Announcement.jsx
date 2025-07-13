import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import moment from 'moment';

const Announcement = () => {
    const [announcements, setAnnouncements] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const res = await axiosSecure.get('/announcements');
                setAnnouncements(res.data)
            } catch (error) {
                console.error('announcement fetching error', error);

            }
        }
        fetchAnnouncements()
    }, [axiosSecure]);

    return (
        <div className="py-10 px-4 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400">📢 Announcements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {announcements.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-xl font-semibold text-purple-700 mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">👤 {item.name}</p>
                        <p className="text-sm text-gray-700">{item.description}</p>
                        <p className="text-xs text-gray-400 mt-2">{moment(item.createdAt).fromNow()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Announcement;