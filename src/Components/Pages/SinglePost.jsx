import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';
import VoteButtons from './VoteButtons';

const SinglePost = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    try {
      const res = await axiosSecure.get(`/singlePost/${id}`);
      setPost(res.data);
      setLoading(false);
    } catch (error) {
      console.error("❌ Failed to fetch post:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="text-center py-32 text-2xl font-bold text-yellow-400">Loading...</div>;
  }

  if (!post) {
    return <div className="text-center py-32 text-2xl font-bold text-red-500">Post not found</div>;
  }

  return (
    <div className="min-h-screen px-4 py-20 bg-gradient-to-br from-[#2e2b29] via-[#1f1d1b] to-black text-[#d4af37]">
      <div className="max-w-4xl mx-auto bg-[#1a1a1a] rounded-3xl shadow-2xl p-8 md:p-12">
        {/* Author Info */}
        <div className="flex items-center gap-4 mb-8">
          <img
            src={post.authorImage || 'https://i.ibb.co/60bLcgDg/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg'}
            alt={post.authorName}
            className="w-16 h-16 rounded-full object-cover border-4 border-yellow-500 shadow-md"
          />
          <div>
            <h3 className="text-xl font-bold">{post.authorName}</h3>
            <p className="text-sm text-yellow-300">{moment(post.createdAt).fromNow()}</p>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-4 leading-tight text-[#f5deb3]">{post.title}</h1>

        {/* Tag */}
        <p className="text-sm uppercase tracking-wide text-pink-400 font-semibold mb-4"># {post.tag}</p>

        {/* Description */}
        <p className="text-lg leading-relaxed text-yellow-100 mb-8">
          {post.description}
        </p>

        {/* Like / Dislike */}
        <div className="mt-6 border-t border-yellow-700 pt-6">
          {user?.email ? (
            <VoteButtons post={post} userEmail={user.email} refetch={fetchPost} />
          ) : (
            <p className="text-yellow-400 italic text-sm">Please login to like or dislike this post.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;