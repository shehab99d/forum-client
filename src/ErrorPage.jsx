// src/pages/ErrorPage.jsx

import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import fishingAnimation from '../public/fishing.json'; // public folder e json file thakte hobe

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001F3F] via-[#001730] to-[#000B1E] text-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Lottie animationData={fishingAnimation} loop={true} />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mt-4 text-center">Oops! Page Not Found</h1>
      <p className="text-lg text-gray-300 mt-2 text-center">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="mt-6">
        <button className="btn btn-primary px-6 py-2 rounded-xl text-lg shadow-lg hover:scale-105 transition">
          Go Back to Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;