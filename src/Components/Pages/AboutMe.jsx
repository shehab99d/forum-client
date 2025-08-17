import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const AboutMe = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photo: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/user/${user.email}`)
        .then(res => {
          const { name, email, photo, phone, address } = res.data || {};
          setFormData({
            name: name || '',
            email: email || '',
            photo: photo || '',
            phone: phone || '',
            address: address || ''
          });
        })
        .catch(err => {
          console.error("❌ Failed to load user data", err);
        });
    }
  }, [user, axiosSecure]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.patch(`/users/${user.email}`, formData);

      // ✅ Firebase profile update (only name + photo)
      await updateUserProfile({
        displayName: formData.name,
        photoURL: formData.photo
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire('✅ Updated!', 'Your profile has been updated.', 'success');
      } else {
        Swal.fire('ℹ️ No Change', 'No data was changed.', 'info');
      }
    } catch (err) {
      console.error("❌ Update failed", err);
      Swal.fire('❌ Error', 'Something went wrong.', 'error');
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center bg-gradient-to-br from-[#1f1f1f] to-[#111] px-4 py-10">
      <div className="w-full max-w-lg bg-[#1c1c1c] rounded-2xl shadow-2xl p-8 border border-[#B59E5F]">
        <h2 className="text-3xl font-extrabold text-center text-[#B59E5F] mb-6 tracking-wide"> About Me</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="input w-full input-bordered bg-[#2a2a2a] border-[#B59E5F] text-white focus:outline-none focus:ring-2 focus:ring-[#B59E5F]"
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="input w-full input-bordered bg-gray-800 text-gray-400 border-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Photo URL */}
          <div>
            <input
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              placeholder="Photo URL"
              className="input w-full input-bordered bg-[#2a2a2a] border-[#B59E5F] text-white focus:outline-none focus:ring-2 focus:ring-[#B59E5F]"
            />
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="input w-full input-bordered bg-[#2a2a2a] border-[#B59E5F] text-white focus:outline-none focus:ring-2 focus:ring-[#B59E5F]"
            />
          </div>

          {/* Address */}
          <div>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Your Address"
              className="input w-full input-bordered bg-[#2a2a2a] border-[#B59E5F] text-white focus:outline-none focus:ring-2 focus:ring-[#B59E5F]"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="btn w-full bg-[#B59E5F] hover:bg-[#a78c46] text-white font-bold border-none"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default AboutMe;
