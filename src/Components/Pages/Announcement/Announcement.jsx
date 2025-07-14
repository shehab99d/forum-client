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
        setAnnouncements(res.data);
      } catch (error) {
        console.error('announcement fetching error', error);
      }
    };
    fetchAnnouncements();
  }, [axiosSecure]);

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {announcements.map((item) => (
          <div
            key={item._id}
            className="bg-[#fdfaf3] rounded-2xl shadow-lg p-5 border border-[#B59E5F] transition-all duration-300 hover:shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-4 text-[#B59E5F] text-center">📢 Announcement</h2>

            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-md mb-4 border border-[#B59E5F]"
            />
            <h3 className="text-xl font-semibold text-[#6b21a8] mb-1">{item.title}</h3>
            <p className="text-sm text-gray-700 mb-2">👤 {item.name}</p>
            <p className="text-sm text-gray-800">{item.description}</p>
            <p className="text-xs text-gray-500 mt-3 text-right italic">
              ⏰ {moment(item.createdAt).fromNow()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
 