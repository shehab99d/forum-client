import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FaArrowUp, FaArrowDown, FaComment } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('new');
  const axiosSecure = useAxiosSecure();

  // comment count আলাদা রাখার জন্য একটি state
  const [commentCounts, setCommentCounts] = useState({}); // { postId: count }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const endpoint = sortBy === 'new' ? '/posts/NO' : '/posts/popular';
        const res = await axiosSecure.get(endpoint);
        setPosts(res.data);

        // প্রতিটি পোস্টের জন্য commentCount ফেচ করা
        const counts = {};
        await Promise.all(
          res.data.map(async (post) => {
            try {
              const countRes = await axiosSecure.get(`/posts/${post._id}/commentCount`);
              counts[post._id] = countRes.data.count;
            } catch (e) {
              counts[post._id] = 0; // error হলে 0 ধরবে
            }
          })
        );
        setCommentCounts(counts);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };
    fetchPosts();
  }, [sortBy, axiosSecure]);

  return (
    <div className="min-h-screen px-4 rounded-2xl py-12 bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
      <div className="max-w-7xl mx-auto">
        {/* Sort Buttons */}
        <div className="flex justify-end mb-8 gap-4">
          <button
            onClick={() => setSortBy('new')}
            className={`px-5 py-2 rounded-full font-semibold transition-all ${
              sortBy === 'new'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white text-purple-700 border border-purple-300 hover:bg-purple-100'
            }`}
          >
            🆕 New to Old
          </button>
          <button
            onClick={() => setSortBy('popular')}
            className={`px-5 py-2 rounded-full font-semibold transition-all ${
              sortBy === 'popular'
                ? 'bg-yellow-500 text-white shadow-md'
                : 'bg-white text-yellow-700 border border-yellow-300 hover:bg-yellow-100'
            }`}
          >
            🔥 Most Popular
          </button>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-6 flex flex-col hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* Author */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={post.authorImage || 'https://via.placeholder.com/40'}
                  alt={post.authorName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-purple-400"
                />
                <div>
                  <p className="font-bold text-black">{post.authorName}</p>
                  <p className="text-xs text-gray-500">{moment(post.createdAt).fromNow()}</p>
                </div>
              </div>

              {/* Post Title */}
              <h3 className="text-xl font-bold text-purple-800 mb-2">{post.title}</h3>

              {/* Tag */}
              <p className="text-sm text-pink-600 font-medium mb-2"># {post.tag}</p>

              {/* Description */}
              <p className="text-gray-700 flex-grow text-sm">{post.description?.slice(0, 100)}...</p>

              {/* Votes & Comments */}
              <div className="flex items-center justify-between mt-6 text-gray-800 text-sm">
                <div className="flex items-center gap-4 font-semibold">
                  <span className="flex items-center gap-1">
                    <FaArrowUp className="text-green-500" /> {post.upvote || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaArrowDown className="text-red-500" /> {post.downvote || 0}
                  </span>
                </div>
                <Link to={`/postDetails/${post._id}`}>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <span>Comments</span> <FaComment className="text-blue-500 text-xl" />
                    <span>{commentCounts[post._id] || 0}</span>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
