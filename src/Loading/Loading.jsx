import React from 'react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-base-100">
            <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-primary animate-spin" />
                <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-secondary animate-spin-slow" />
                <div className="absolute inset-4 rounded-full border-4 border-t-transparent border-accent animate-spin-reverse" />
                <div className="absolute inset-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg">
                    {/* <span className="text-white font-bold animate-pulse">LOADING</span> */}
                </div>
            </div>
        </div>
    );
};

export default Loading;
