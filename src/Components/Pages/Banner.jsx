import React, { useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { motion } from 'framer-motion';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Banner = () => {
  const [tag, setTag] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleSearch = async () => {
    if (!tag) return;
    try {
      const res = await axiosSecure.get(`/posts/search?tag=${tag}`);
      if (res.data.length === 0) {
        setNoResults(true);
        setSearchResults([]);
      } else {
        setNoResults(false);
        setSearchResults(res.data);
      }
    } catch (error) {
      console.error('❌ Search failed:', error);
    }
  };

  return (
    <div className="px-4 py-20 md:py-28 lg:mt-28 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white rounded-3xl shadow-2xl overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6 text-yellow-400 drop-shadow"
        >
          Welcome to the Developer Forum
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12 text-base md:text-lg text-gray-300"
        >
          Search by technology tag (e.g. <span className="text-cyan-300">React</span>, <span className="text-cyan-300">Node.js</span>, <span className="text-cyan-300">MongoDB</span>)
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <input
            type="text"
            placeholder="Enter tag to search..."
            className="input w-full sm:w-[350px] px-6 py-3 text-lg rounded-full text-black bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="btn bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-lg px-8 py-3 rounded-full transition-all shadow-lg w-full sm:w-auto"
          >
            🔍 Search
          </button>
        </motion.div>
      </div>

      {/* Results */}
      <div className="mt-16 max-w-7xl mx-auto">
        {noResults && (
          <p className="text-center text-xl text-red-400 mt-4">
            ❌ No posts found for tag "<span className="underline">{tag}</span>"
          </p>
        )}

        {searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
          >
            {searchResults.map((post) => (
              <motion.div
                key={post._id}
                whileHover={{ scale: 1.03 }}
                className="bg-white/10 border border-white/20 backdrop-blur-md p-8 rounded-xl shadow-xl transition-all"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-300 mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-200 mb-4 text-base md:text-lg">
                  {post.description.slice(0, 100)}...
                </p>
                <p className="text-sm text-pink-300 mb-3"># {post.tag}</p>
                <div className="text-sm text-indigo-200 flex flex-wrap items-center justify-between mt-3">
                  <span>By: {post.authorName}</span>
                  <span className="flex items-center gap-3">
                    <FaArrowUp className="text-green-400" /> {post.upvote || 0}
                    <FaArrowDown className="text-red-400 ml-2" /> {post.downvote || 0}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Banner;
