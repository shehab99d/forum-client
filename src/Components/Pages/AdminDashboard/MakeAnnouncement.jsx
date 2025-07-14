import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const MakeAnnouncement = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [formData, setFormData] = useState({
        image: '',
        name: user?.displayName || '',
        title: '',
        description: ''
    });

    const [announcements, setAnnouncements] = useState([]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosSecure.post('/announcements', formData);
            if (res.data.insertedId) {
                Swal.fire('✅ Success!', 'Announcement added successfully.', 'success');
                setFormData({ image: '', name: '', title: '', description: '' });
                fetchAnnouncements(); // Refresh list
            }
        } catch (err) {
            Swal.fire('❌ Error', 'Failed to add announcement', 'error');
        }
    };

    const fetchAnnouncements = async () => {
        try {
            const res = await axiosSecure.get('/announcements');
            setAnnouncements(res.data || []);
        } catch (err) {
            console.error('Error loading announcements', err);
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this announcement?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.delete(`/announcements/${id}`);
                Swal.fire('Deleted!', 'The announcement has been deleted.', 'success');
                fetchAnnouncements(); // Refresh after deletion
            } catch (err) {
                Swal.fire('❌ Error', 'Failed to delete announcement', 'error');
            }
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    return (
        <div>
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
                <h2 className="text-2xl font-bold text-center mb-6 text-yellow-500">📢 Make an Announcement</h2>

                {/* Announcement Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        className="input input-bordered w-full"
                        value={formData.image}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="name"
                        className="input input-bordered w-full"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="title"
                        placeholder="Announcement Title"
                        className="input input-bordered w-full"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        rows="4"
                        placeholder="Description"
                        className="textarea textarea-bordered w-full"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        className="btn bg-yellow-400 hover:bg-yellow-500 text-black w-full font-bold"
                    >
                        Post Announcement
                    </button>
                </form>

            </div>
            {/* -------------------------- */}
            {/* 🔥 All Announcements Section */}
            {/* -------------------------- */}
            <div className="mt-16">
                <h3 className="text-3xl font-bold text-center mb-6 text-[#B59E5F]">📢 All Announcements</h3>

                {announcements.length === 0 ? (
                    <p className="text-center text-gray-500">No announcements found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {announcements.map(a => (
                            <div key={a._id} className="bg-white border border-yellow-300 rounded-xl shadow-md p-5 flex flex-col justify-between">
                                <div className="space-y-1 mb-4">
                                    <h4 className="text-xl font-bold text-gray-800">{a.title}</h4>
                                    <p className="text-sm text-gray-600">{a.description}</p>
                                    <p className="text-xs text-gray-400">By: <span className="text-black font-medium">{a.name}</span></p>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => handleDelete(a._id)}
                                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                                    >
                                        ❌ Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default MakeAnnouncement;
