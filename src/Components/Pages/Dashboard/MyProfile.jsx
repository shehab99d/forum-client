import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth'; // তোমার Auth hook

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchPosts = async () => {
      try {
        // ধরছি তোমার backend এ posts fetch এর জন্য এই API আছে, যেটা ইউজার email দিয়ে filter করবে
        const response = await axiosSecure.get(`/posts?authorEmail=${user.email}&limit=3`);
        setRecentPosts(response.data || []);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user, axiosSecure]);

  // Badge logic
  // Gold badge যদি user.role === 'member' হয়, নাহলে Bronze
  const isGold = user?.role === 'member';
  const isBronze = !isGold; // register হওয়ালাই Bronze

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat p-6"
      style={{ backgroundImage: `url('/my-profile-bg.jpg')` }}
    >
      <div className="max-w-4xl mx-auto bg-black bg-opacity-60 rounded-xl p-8 text-white shadow-lg">
        {/* Profile Info */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <img
            src={user?.photoURL || '/default-user.png'}
            alt="User"
            className="w-28 h-28 rounded-full border-4 border-yellow-400 object-cover"
          />
          <div>
            <h2 className="text-3xl font-bold">{user?.displayName || 'No Name'}</h2>
            <p className="text-gray-300">{user?.email}</p>

            {/* Badges */}
            <div className="mt-4 flex gap-3">
              {isGold && (
                <span className="badge py-4 bg-yellow-400 text-black px-4 rounded-full flex items-center gap-2">
                  <img src="/gold-badge-icon.png" alt="Gold Badge" className="w-5 h-5" />
                  Gold Member
                </span>
              )}
              {isBronze && (
                <span className="badge py-4 bg-amber-700 text-white px-4 rounded-full flex items-center gap-2">
                  <img src="/bronze-badge-icon.webp" alt="Bronze Badge" className="w-5 h-7" />
                  Bronze Member
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Recent Posts */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">📝 My Recent Posts</h3>

          {loading ? (
            <p>Loading posts...</p>
          ) : recentPosts.length === 0 ? (
            <p>No posts found.</p>
          ) : (
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post._id} className="bg-gray-800 rounded-lg p-4 shadow-md hover:bg-gray-700 transition">
                  <h4 className="text-xl font-bold">{post.title}</h4>
                  <p className="text-gray-400 text-sm mb-1">Tag: {post.tag}</p>
                  <p className="text-gray-300">{post.description?.slice(0, 60)}...</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
