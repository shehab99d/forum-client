import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const PostDetails = () => {
  const { postId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosSecure.get(`/postsDetails/${postId}`);
        setPost(res.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [postId, axiosSecure]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axiosSecure.get(`/comments/${postId}`);
        setComments(res.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [postId, axiosSecure]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const commenter = {
      commenterName: user?.displayName || "Anonymous",
      commenterEmail: user?.email || "unknown@example.com",
      commenterImage: user?.photoURL || "https://i.ibb.co/8dcjq5Y/user.png",
    };

    const newComment = {
      postId,
      commentText,
      ...commenter,
    };

    try {
      const res = await axiosSecure.post('/comments', newComment);
      if (res.data.insertedId) {
        setComments(prev => [{ ...newComment, _id: res.data.insertedId, createdAt: new Date() }, ...prev]);
        setCommentText('');
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/comments/${commentId}`);
        if (res.data.deletedCount > 0) {
          setComments(prev => prev.filter(c => c._id !== commentId));
          Swal.fire(
            'Deleted!',
            'Your comment has been deleted.',
            'success'
          );
        }
      } catch (error) {
        console.error("Failed to delete comment:", error);
        Swal.fire(
          'Error!',
          'Failed to delete the comment. Please try again later.',
          'error'
        );
      }
    }
  };

  if (!post) return <p className="text-center mt-10 text-black">Loading post...</p>;

  return (
    <div className="max-w-4xl lg:my-72 md:my-56 my-60 mx-auto p-6 bg-white rounded-lg shadow-lg ">
      {/* Post Section */}
      <h1 className="text-3xl font-bold mb-4 text-black">{post.title}</h1>
      <p className="text-gray-800 mb-4 whitespace-pre-wrap">{post.description}</p>
      <p className="mb-6 text-sm font-semibold text-gray-600">
        Tags: <span className="text-blue-600">#{post.tag}</span>
      </p>

      <hr className="border-gray-300 mb-8" />

      {/* Comments Section */}
      <h2 className="text-2xl font-semibold mb-6 text-black">Comments ({comments.length})</h2>

      {/* Comment Form */}
      {user ? (
        <form onSubmit={handleSubmitComment} className="mb-10">
          <textarea
            className="textarea textarea-bordered w-full resize-none mb-3 text-black bg-white border-amber-800"
            rows={4}
            placeholder="Write your comment here..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          />
          <button
            type="submit"
            className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 border-none"
          >
            Add Comment
          </button>
        </form>
      ) : (
        <p className="text-center text-gray-600 italic mb-10">Please login to add comments.</p>
      )}

      {/* Comments List */}
      {loading ? (
        <p className="text-center text-black">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-center text-gray-500 italic">No comments yet. Be the first to comment!</p>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="flex gap-4 p-4 bg-gray-100 rounded-lg shadow-sm relative group hover:bg-gray-200 transition-colors duration-300"
            >
              <img
                src={comment.commenterImage}
                alt={comment.commenterName}
                className="w-12 h-12 rounded-full object-cover border border-gray-300"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-semibold text-black">{comment.commenterName}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className="text-gray-800 whitespace-pre-wrap">{comment.commentText}</p>
              </div>
              {/* Delete Button, only for comment owner */}
              {user?.email === comment.commenterEmail && (
                <button
                  onClick={() => handleDeleteComment(comment._id)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold 
  opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 lg:pt-8 md:pt-8 pt-8"
                  title="Delete Comment"
                  aria-label="Delete Comment"
                >
                  &#x2716;
                </button>

              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostDetails;
