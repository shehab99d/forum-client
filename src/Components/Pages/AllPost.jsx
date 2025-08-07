import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FaComment } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';
import VoteButtons from './VoteButtons';

import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon
} from 'react-share';
import Swal from 'sweetalert2';
import useAxios from '../Hooks/useAxios';


const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('new');
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 5;

  const axiosSecure = useAxios();
  const { user } = useAuth();
  const [commentCounts, setCommentCounts] = useState({});

  const fetchPosts = async () => {
    try {
      const endpoint = sortBy === 'new' ? '/posts/NO' : '/posts/popular';
      const res = await axiosSecure.get(`${endpoint}?page=${page}&limit=${postsPerPage}`);

      setPosts(res.data.posts);
      setTotalPosts(res.data.total);

      const counts = {};
      await Promise.all(
        res.data.posts.map(async (post) => {
          try {
            const countRes = await axiosSecure.get(`/posts/${post._id}/commentCount`);
            counts[post._id] = countRes.data.count;
          } catch {
            counts[post._id] = 0;
          }
        })
      );
      setCommentCounts(counts);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [sortBy, page]);

  return (
    <div className="min-h-screen px-4 rounded-2xl py-12 bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
      <div className="max-w-7xl mx-auto">
        {/* Sort Buttons */}
        <div className="flex justify-end mb-8 gap-4">
          <button
            onClick={() => {
              setSortBy('new');
              setPage(1); // reset to first page
            }}
            className={`px-5 py-2 rounded-full font-semibold transition-all ${sortBy === 'new'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white text-purple-700 border border-purple-300 hover:bg-purple-100'
              }`}
          >
            🆕 New to Old
          </button>
          <button
            onClick={() => {
              setSortBy('popular');
              setPage(1); // reset to first page
            }}
            className={`px-5 py-2 rounded-full font-semibold transition-all ${sortBy === 'popular'
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
                  src={
                    post.authorImage ||
                    'https://i.ibb.co/60bLcgDg/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg'
                  }
                  alt={post.authorName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-purple-400"
                />
                <div>
                  <p className="font-bold text-black">{post.authorName}</p>
                  <p className="text-xs text-gray-500">{moment(post.createdAt).fromNow()}</p>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-purple-800 mb-2">{post.title}</h3>

              {/* Tag */}
              <p className="text-sm text-pink-600 font-medium mb-2"># {post.tag}</p>

              {/* Description */}
              <p className="text-gray-700 flex-grow text-sm">
                {post.description?.slice(0, 100)}...
              </p>

              {/* Votes, Share & Comments */}
              <div className="flex flex-col mt-4 gap-2">
                {/* Vote Buttons */}
                <VoteButtons post={post} userEmail={user?.email} refetch={fetchPosts} />

                {/* Share */}
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  <span className="text-gray-600 text-sm font-medium">Share:</span>
                  <FacebookShareButton url={`${window.location.origin}/singlePost/${post._id}`}>
                    <FacebookIcon size={28} round />
                  </FacebookShareButton>
                  <WhatsappShareButton
                    url={`${window.location.origin}/singlePost/${post._id}`}
                    title={post.title}
                  >
                    <WhatsappIcon size={28} round />
                  </WhatsappShareButton>
                  <TwitterShareButton
                    url={`${window.location.origin}/singlePost/${post._id}`}
                    title={post.title}
                  >
                    <TwitterIcon size={28} round />
                  </TwitterShareButton>
                  <button
                    onClick={() => {
                      const shareUrl = `${window.location.origin}/singlePost/${post._id}`;
                      navigator.clipboard.writeText(shareUrl);
                      Swal.fire({
                        title: "Link Copied",
                        icon: "success",
                        draggable: true
                      });
                    }}
                    className="px-3 py-1 rounded-full bg-gray-200 text-gray-800 text-sm font-medium hover:bg-gray-300 transition"
                  >
                    📋 Copy Link
                  </button>
                </div>

                {/* Comments */}
                <Link to={`/postDetails/${post._id}`}>
                  <div className="flex items-center gap-2 cursor-pointer mt-2 text-gray-800 text-sm">
                    <span>Comments</span>
                    <FaComment className="text-blue-500 text-xl" />
                    <span>{commentCounts[post._id] || 0}</span>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10 gap-2 flex-wrap">
          {Array.from({ length: Math.ceil(totalPosts / postsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-full border font-semibold ${page === i + 1
                ? 'bg-purple-600 text-white'
                : 'bg-white text-purple-600 border-purple-300 hover:bg-purple-100'
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
