import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Setting = () => {
    const axiosSecure = useAxiosSecure();

    const { data: reports = [], refetch } = useQuery({
        queryKey: ['reported-comments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reported-comments');
            return res.data;
        }
    });

    const handleDelete = async (report) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this comment permanently?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.delete(`/comments/${report.commentId}`);
                await axiosSecure.delete(`/reported-comments/${report._id}`);

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Comment has been deleted.',
                    timer: 1500,
                    showConfirmButton: false
                });

                refetch();
            } catch (error) {
                console.error('❌ Delete failed:', error);
                Swal.fire('Error', 'Failed to delete the comment.', 'error');
            }
        }
    };

    return (
        <div className="max-w-6xl mx-auto my-10 p-6 bg-white rounded-2xl shadow-lg border border-yellow-100">
            <h2 className="text-3xl font-bold text-center mb-6 text-[#B59E5F]">🚩 Reported Comments</h2>

            <div className="overflow-x-auto rounded-lg">
                <table className="table w-full text-sm border border-gray-200">
                    <thead className="bg-[#FDF6E9] text-black">
                        <tr>
                            <th className="p-3">📧 Email</th>
                            <th className="p-3">💬 Comment</th>
                            <th className="p-3">❗ Reason</th>
                            <th className="p-3">🗑️ Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-black">
                        {reports.map((report) => (
                            <tr key={report._id} className="hover:bg-[#FFF9EF] border-t border-gray-100">
                                <td className="p-3">{report.commenterEmail}</td>
                                <td className="p-3 max-w-[300px] truncate">{report.commentText}</td>
                                <td className="p-3">{report.reason}</td>
                                <td className="p-3">
                                    <button
                                        onClick={() => handleDelete(report)}
                                        className="btn btn-sm bg-[#B59E5F] hover:bg-[#a78b5a] text-white px-4"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {reports.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">
                                    No reported comments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Setting;
