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

    // ✅ Delete both comment and report
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

    // ✅ Only ignore report (delete from report DB, keep comment)
    const handleIgnore = async (reportId) => {
        const confirm = await Swal.fire({
            title: 'Ignore this report?',
            text: 'The comment will not be removed.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, ignore it!'
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.delete(`/reported-comments/${reportId}`);
                Swal.fire({
                    icon: 'success',
                    title: 'Ignored!',
                    text: 'Report has been removed.',
                    timer: 1500,
                    showConfirmButton: false
                });
                refetch();
            } catch (err) {
                console.error("❌ Ignore failed:", err);
                Swal.fire('Error', 'Failed to ignore the report.', 'error');
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
                            <th className="p-3 text-center">🛠️ Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-black">
                        {reports.map((report) => (
                            <tr key={report._id} className="hover:bg-[#FFF9EF] border-t border-gray-100">
                                <td className="p-3">{report.commenterEmail}</td>
                                <td className="p-3 max-w-[300px] truncate">{report.commentText}</td>
                                <td className="p-3">{report.reason}</td>
                                <td className="p-3 flex justify-center gap-2">
                                    <button
                                        onClick={() => handleDelete(report)}
                                        className="btn btn-xs bg-red-600 hover:bg-red-700 text-white px-3"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleIgnore(report._id)}
                                        className="btn btn-xs bg-gray-500 hover:bg-gray-600 text-white px-3"
                                    >
                                        Ignore
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
