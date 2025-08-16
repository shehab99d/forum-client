import React from 'react';
import bgImage from '/bg-image-2.avif';
import Banner from './Banner';
import SearchByTag from './SearchByTag/SearchByTag';
import Announcement from './Announcement/Announcement';
import AllPosts from './AllPost';
import CommunityRules from '../CommunityRules';
import RatingSection from '../RatingSection';
import ForumTestimonials from '../TstimolialRating';
import PopularCategories from '../PopularCategories.JSX';
import NewsletterSubscription from '../NewsletterSubscription';

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
                    <CommunityRules></CommunityRules>
                    {/* <RatingSection></RatingSection> */}
                    <ForumTestimonials></ForumTestimonials>
                    <PopularCategories></PopularCategories>
                    <NewsletterSubscription></NewsletterSubscription>
                </div>
            </div>
        </div>
    );
};

export default Home;
