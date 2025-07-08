// Banner.jsx
import React from "react";

const Banner = () => {
    return (
        <div className="flex justify-center px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 py-12 sm:py-16 md:py-20 bg-transparent">
            <div
                className="
          relative
          w-full max-w-[1400px]
          rounded-3xl
          overflow-hidden
          shadow-2xl
          h-[24rem] sm:h-[26rem] md:h-[28rem] lg:h-[30rem]
          bg-white/10
          backdrop-blur-md
          transition-transform
          duration-300
          hover:scale-[1.02]
          border border-white/20
        "
                style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(15px) saturate(180%)",
                    WebkitBackdropFilter: "blur(15px) saturate(180%)",
                    transform: "perspective(700px) rotateX(1deg) rotateY(2deg)",
                }}
            >
                {/* Transparent Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700/40 via-purple-700/40 to-pink-700/40 pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-8 md:px-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg mb-4 md:mb-6">
                        Welcome to Our Tech Forum
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-indigo-200 mb-6 md:mb-10 max-w-2xl md:max-w-3xl drop-shadow-md">
                        Discuss, Learn, and Share your knowledge with the community.
                    </p>

                    {/* Search Box */}
                    <div className="w-full max-w-xl">
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white/90 rounded-full overflow-hidden shadow-lg ring-1 ring-white/30 focus-within:ring-indigo-500 transition">
                            <input
                                type="text"
                                placeholder="Search posts by tag..."
                                className="flex-grow px-5 py-3 text-gray-700 placeholder-gray-500 focus:outline-none text-base rounded-t-full sm:rounded-t-none sm:rounded-l-full"
                            />
                            <button className="
  px-6 py-3 bg-indigo-600 text-white font-semibold 
  hover:bg-indigo-700 transition text-base 
  rounded-b-full sm:rounded-b-none sm:rounded-r-full
">
                                Search
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
