import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAuth from './Components/Hooks/useAuth';
import useAxiosSecure from './Components/Hooks/useAxiosSecure';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '18px',
      color: '#32325d',
      '::placeholder': { color: '#aab7c4' },
    },
    invalid: { color: '#fa755a' },
  },
};

const PaymentForm = () => {
  const [error, setError] = useState('');
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const amount = 500; // demo amount (৳500)
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError('');
      const res = await axiosSecure.post('/create-payment-intent', {
        amountInCents,
      });

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          await axiosSecure.patch(`/users/membership/${user.email}`);
          Swal.fire({
            icon: 'success',
            title: '🎉 You are now a Gold Member!',
            text: `Payment ID: ${result.paymentIntent.id}`,
          });
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-yellow-600">
        Gold Membership – ৳{amount}
      </h2>

      <div className="border-2 rounded-md overflow-hidden">
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>

      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-yellow-500 text-white py-3 rounded hover:bg-yellow-600 transition"
      >
        Become Member
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};

export default PaymentForm;