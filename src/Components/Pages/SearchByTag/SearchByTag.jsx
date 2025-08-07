import React, { useEffect, useState } from 'react';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { motion } from 'framer-motion';
import { MdOutlineSearchOff } from 'react-icons/md';
import Select from 'react-select';
import useAxios from '../../Hooks/useAxios';

const SearchByTag = () => {
  const axiosSecure = useAxios();

  const [selectedTag, setSelectedTag] = useState(null);
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [tagOptions, setTagOptions] = useState([]);

  // ✅ Fetch all tags from DB
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axiosSecure.get('/tags');
        const options = res.data.map(tag => ({
          value: tag.name,
          label: tag.name
        }));
        setTagOptions(options);
      } catch (error) {
        console.error('Error fetching tags:', error.message);
      }
    };
    fetchTags();
  }, [axiosSecure]);

  // ✅ Fetch posts by selected tag
  useEffect(() => {
    const fetchPosts = async () => {
      if (!selectedTag) return;
      setNoResults(false);
      try {
        const res = await axiosSecure.get(`/posts-by-tag?tag=${selectedTag.value}`);
        setPosts(res.data);
        if (res.data.length === 0) {
          setNoResults(true);
        }
      } catch (err) {
        console.error('Error fetching posts:', err.message);
      }
    };
    fetchPosts();
  }, [selectedTag, axiosSecure]);

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto text-white bg-blue-600/10 rounded-2xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-yellow-400">
        🔎 Search by Tag
      </h2>

      {/* Tag Selector */}
      <div className="mb-10 max-w-md mx-auto">
        <label className="label text-lg font-semibold text-white mb-2">Select a Tag</label>
        <Select
          options={tagOptions}
          value={selectedTag}
          onChange={setSelectedTag}
          placeholder="Choose a tag"
          className="text-black"
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: '#1f2937',
              borderColor: '#facc15',
              color: '#fff'
            }),
            singleValue: (base) => ({
              ...base,
              color: '#fff'
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: '#1f2937',
              color: '#fff'
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? '#facc15' : '#1f2937',
              color: state.isFocused ? '#000' : '#fff'
            })
          }}
        />
      </div>

      {/* No Posts Found */}
      {noResults && (
        <div className="text-center mt-16 text-red-400 flex flex-col items-center gap-3">
          <MdOutlineSearchOff className="text-6xl" />
          <p className="text-xl font-semibold">🚫 No posts found for this tag</p>
        </div>
      )}

      {/* Posts Grid */}
      {!noResults && posts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {posts.map((post) => (
            <motion.div
              key={post._id}
              whileHover={{ scale: 1.03 }}
              className="bg-[#1e1e1e] p-5 rounded-xl shadow-md shadow-yellow-700 border border-gray-800 hover:border-yellow-500 transition duration-300"
            >
              <h3 className="text-xl font-bold text-yellow-400 mb-2">{post.title}</h3>
              <p className="text-gray-300 mb-3 line-clamp-4">{post.description}</p>

              <div className="flex items-center gap-3 mt-3">
                <img
                  src={post.authorImage}
                  alt={post.authorName}
                  className="w-9 h-9 rounded-full border border-yellow-400"
                />
                <span className="text-sm">{post.authorName}</span>
              </div>

              <div className="mt-3 text-sm text-blue-400 font-medium">
                #{post.tag}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SearchByTag;
