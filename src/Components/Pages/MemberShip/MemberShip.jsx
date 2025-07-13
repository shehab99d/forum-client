import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const Membership = () => {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleMembership = async () => {
    if (!amount || isNaN(amount)) {
      Swal.fire('Error', 'Please enter a valid amount.', 'error');
      return;
    }

    const amountNumber = parseFloat(amount);
    if (amountNumber < 500) {
      Swal.fire('Insufficient Amount', 'Minimum ৳500 is required to become a member.', 'warning');
      return;
    }

    setIsLoading(true);
    try {
      const res = await axiosSecure.patch(`/users/membership/${user.email}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire('✅ Membership Activated', 'You are now a Gold Member!', 'success');
      } else {
        Swal.fire('Oops!', 'You are already a member or something went wrong.', 'info');
      }
    } catch (error) {
      console.error('❌ Error updating membership:', error);
      Swal.fire('Error', 'Something went wrong. Try again later.', 'error');
    } finally {
      setIsLoading(false);
      setAmount('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 px-4 py-20">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-purple-700 mb-6">🥇 Become a Gold Member</h2>
        <p className="mb-4 text-gray-700">
          To become a Gold Member, please make a demo payment of at least <span className="font-bold text-yellow-600">৳500</span>.
        </p>

        <input
          type="number"
          placeholder="Enter amount (৳)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input input-bordered w-full mb-6 px-4 py-2 rounded-lg text-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={handleMembership}
          className={`btn w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg py-3 rounded-lg shadow-md transition-all duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : '💳 Confirm Membership'}
        </button>
      </div>
    </div>
  );
};

export default Membership;
