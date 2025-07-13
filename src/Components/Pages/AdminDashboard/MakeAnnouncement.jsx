import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const MakeAnnouncement = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [formData, setFormData] = useState({
        image:  '',
        name: user?.displayName || '',
        title: '',
        description: ''
    });

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
            }
        } catch (err) {
            Swal.fire('❌ Error', 'Failed to add announcement', 'error');
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
            <h2 className="text-2xl font-bold text-center mb-6 text-yellow-500">📢 Make an Announcement</h2>
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
                    // placeholder=
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
    );
};

export default MakeAnnouncement;
