import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AddTags = () => {
    const [tagName, setTagName] = useState('');
    const [tags, setTags] = useState([]);
    const axiosSecure = useAxiosSecure();

    // Tag Add Handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosSecure.post('/tags', { name: tagName });
            if (res.data.insertedId) {
                Swal.fire('✅ Success', 'Tag added successfully', 'success');
                setTagName('');
                fetchTags(); // Update list
            }
        } catch (err) {
            Swal.fire('❌ Failed', err.response?.data?.message || 'Something went wrong', 'error');
        }
    };

    // Delete Tag
    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirm.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/tags/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire('Deleted!', 'Tag has been removed.', 'success');
                    fetchTags();
                }
            } catch (err) {
                Swal.fire('Error', 'Failed to delete tag', 'error');
            }
        }
    };

    // Fetch all tags
    const fetchTags = () => {
        axiosSecure.get('/tags')
            .then(res => setTags(res.data))
            .catch(err => console.error('Error fetching tags:', err));
    };

    useEffect(() => {
        fetchTags();
    }, [axiosSecure]);

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-neutral-800 p-6 rounded-xl shadow-md text-white">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400 text-center">➕ Add New Tag</h2>
            <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
                <input
                    type="text"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    placeholder="Enter tag name (e.g. React)"
                    className="input input-bordered w-full text-white"
                    required
                />
                <button className="btn bg-yellow-500 hover:bg-yellow-600 text-white font-bold">
                    Add
                </button>
            </form>

            <table className="table w-full bg-white text-black rounded-lg shadow-md overflow-hidden">
                <thead className="bg-yellow-500 text-white">
                    <tr>
                        <th className="py-2 px-4">#</th>
                        <th className="py-2 px-4">Tag</th>
                        <th className="py-2 px-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tags.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="text-center py-4">No tags found</td>
                        </tr>
                    ) : (
                        tags.map((tag, index) => (
                            <tr key={tag._id} className="hover:bg-gray-100">
                                <td className="py-2 px-4">{index + 1}</td>
                                <td className="py-2 px-4 font-medium">{tag.name}</td>
                                <td className="py-2 px-4">
                                    <button
                                        onClick={() => handleDelete(tag._id)}
                                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AddTags;
