import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { FaFlag } from 'react-icons/fa';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useParams } from 'react-router';

const Comment = () => {
  const { id: postId } = useParams();
  const axiosSecure = useAxiosSecure();

  const [comments, setComments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [reported, setReported] = useState({});
  const [feedback, setFeedback] = useState({});

  const handleReport = async (commentId) => {
    const reason = feedback[commentId];
    const comment = comments.find(c => c._id === commentId);

    if (!reason || !comment) return;

    const reportData = {
      postId,
      commentId: comment._id,
      commenterEmail: comment.commenterEmail,
      commentText: comment.commentText,
      reason,
      reportedAt: new Date(),
    };

    try {
      const res = await axiosSecure.post('/reported-comments', reportData);
      if (res.data.insertedId) {
        setReported(prev => ({ ...prev, [commentId]: true }));
      }
    } catch (error) {
      console.error('❌ Report failed:', error);
    }
  };




  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axiosSecure.get(`/commentsDetails/${postId}`);
        setComments(res.data);
      } catch (err) {
        console.error('❌ Error loading comments:', err);
      }
    };
    if (postId) {
      fetchComments();
    }
  }, [axiosSecure, postId]);

  const handleFeedbackChange = (commentId, value) => {
    setFeedback((prev) => ({ ...prev, [commentId]: value }));
  };


  useEffect(() => {
    const fetchReported = async () => {
      try {
        const res = await axiosSecure.get(`/reported-comments/${postId}`);
        const reportedMap = {};
        res.data.forEach(id => {
          reportedMap[id] = true;
        });
        setReported(reportedMap);
      } catch (err) {
        console.error('Error fetching reported comments:', err);
      }
    };

    if (postId) {
      fetchReported(); // ✅ এটি যথেষ্ট
    }
  }, [axiosSecure, postId]);





  return (
    <div className="bg-white p-6 lg:my-52 rounded-2xl shadow-lg mt-20 max-w-6xl mx-auto w-full">
      <h3 className="text-3xl font-bold mb-6 text-gray-800 text-center">🚩 Comments Management</h3>

      <div className="overflow-x-auto rounded-lg">
        <table className="table w-full text-sm border border-gray-200">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-100 to-pink-100 text-gray-800">
              <th className="p-3 text-left">👤 Email</th>
              <th className="p-3 text-left">💬 Comment</th>
              <th className="p-3 text-left">⚠️ Feedback</th>
              <th className="p-3 text-left">🚨 Report</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((c) => (
              <tr key={c._id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="p-3 text-gray-700">{c.commenterEmail}</td>
                <td className="p-3 text-gray-700">
                  {c.commentText.length > 30 ? (
                    <>
                      {c.commentText.slice(0, 30)}...
                      <button
                        onClick={() => {
                          setModalText(c.commentText);
                          setOpenModal(true);
                        }}
                        className="ml-2 text-blue-500 underline text-xs hover:text-blue-700"
                      >
                        Read More
                      </button>
                    </>
                  ) : (
                    c.commentText
                  )}
                </td>
                <td className="p-3">
                  <select
                    className="select select-sm bg-white border border-gray-300 text-gray-700 w-full"
                    value={feedback[c._id] || ''}
                    onChange={(e) => handleFeedbackChange(c._id, e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Offensive">Offensive</option>
                    <option value="Spam">Spam</option>
                    <option value="Harassment">Harassment</option>
                  </select>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleReport(c._id)}
                    className={`btn btn-sm w-full flex items-center gap-1 justify-center 
    ${reported[c._id] ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white'}
  `}
                    disabled={!feedback[c._id] || reported[c._id]}
                  >
                    <FaFlag className='text-red-500' />
                    <div className='text-black'>
                      {reported[c._id] ? 'Reported' : 'Report'}
                    </div>
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)} center>
        <h2 className="text-xl font-bold mb-2 text-gray-900">📝 Full Comment</h2>
        <p className="text-gray-800 whitespace-pre-wrap">{modalText}</p>
      </Modal>
    </div>
  );
};

export default Comment;
