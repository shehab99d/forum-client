import React from 'react';
import bgImage from '/bg-image-2.avif'
import Banner from './Banner';

const Home = () => {
    return (
        <div>
            <div
                className="min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <Banner></Banner>
            </div>

        </div>
    );
};

export default Home;
