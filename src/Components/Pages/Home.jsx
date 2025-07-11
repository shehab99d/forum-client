import React from 'react';
import bgImage from '/bg-image-2.avif';
import Banner from './Banner';
import SearchByTag from './SearchByTag/SearchByTag';
import Announcement from './Announcement/Announcement';
import AllPosts from './AllPost';

const Home = () => {
    return (
        <div
            className="min-h-screen bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="backdrop-brightness-[0.6] min-h-screen w-full px-4">
                <div className="max-w-7xl mx-auto space-y-20 py-10">
                    {/* Hero Banner */}
                    <Banner />

                    {/* Tag Search */}
                    <SearchByTag />

                    <Announcement></Announcement>
                    <AllPosts></AllPosts>
                </div>
            </div>
        </div>
    );
};

export default Home;
