import { useState } from 'react';
import { FaThumbsUp, FaRegThumbsUp, FaThumbsDown, FaRegThumbsDown } from 'react-icons/fa';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const VoteButtons = ({ post, userEmail, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  // Local state for animation trigger
  const [clickedUp, setClickedUp] = useState(false);
  const [clickedDown, setClickedDown] = useState(false);

  const hasUpvoted = post.upvotedBy?.includes(userEmail);
  const hasDownvoted = post.downvotedBy?.includes(userEmail);

  const handleVote = async (type) => {
    setLoading(true);

    // Trigger animation for clicked button
    if(type === 'upvote') {
      setClickedUp(true);
      setTimeout(() => setClickedUp(false), 300);  // 300ms animation
    } else if(type === 'downvote') {
      setClickedDown(true);
      setTimeout(() => setClickedDown(false), 300);
    }

    try {
      const res = await axiosSecure.patch(`/posts/${post._id}/vote`, {
        userEmail,
        voteType: hasUpvoted && type === 'upvote' ? 'remove' :
                  hasDownvoted && type === 'downvote' ? 'remove' :
                  type
      });
      refetch();
    } catch (error) {
      console.error("❌ Vote failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-6 mt-4">
      {/* Upvote */}
      <button
        disabled={loading}
        onClick={() => handleVote('upvote')}
        className={`flex items-center gap-2 text-sm font-medium border px-3 py-1 rounded-full transition-all duration-300 
          ${hasUpvoted ? 'border-green-500 text-green-600 bg-green-50' : 'border-gray-300 text-gray-600 hover:border-green-500 hover:text-green-500'}
          ${clickedUp ? 'scale-110 bg-green-100' : ''}
        `}
        style={{ transformOrigin: 'center' }}
      >
        {hasUpvoted ? <FaThumbsUp className="text-lg" /> : <FaRegThumbsUp className="text-lg" />}
        {post.upvotedBy?.length || 0}
      </button>

      {/* Downvote */}
      <button
        disabled={loading}
        onClick={() => handleVote('downvote')}
        className={`flex items-center gap-2 text-sm font-medium border px-3 py-1 rounded-full transition-all duration-300 
          ${hasDownvoted ? 'border-red-500 text-red-600 bg-red-50' : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'}
          ${clickedDown ? 'scale-110 bg-red-100' : ''}
        `}
        style={{ transformOrigin: 'center' }}
      >
        {hasDownvoted ? <FaThumbsDown className="text-lg" /> : <FaRegThumbsDown className="text-lg" />}
        {post.downvotedBy?.length || 0}
      </button>
    </div>
  );
};

export default VoteButtons;
