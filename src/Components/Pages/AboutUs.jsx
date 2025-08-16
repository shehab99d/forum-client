import { motion } from "framer-motion";
import FuturisticButton from "./FuturisticButton";

const AboutUs = () => {
    return (
        <div className="bg-gradient-to-b from-gray-900 to-black text-white py-16 px-4 md:px-12 lg:px-24">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                    About Forumify
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                    Forumify is a modern coding community where you can share your
                    thoughts, learn from others, and grow together.
                </p>
            </motion.div>

            {/* Part 1: Features */}
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="mb-20"
            >
                <h3 className="text-2xl font-semibold text-secondary mb-6">Features</h3>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Post Anything",
                            desc: "Share your coding problems, ideas, or achievements with everyone.",
                        },
                        {
                            title: "Engage with Community",
                            desc: "Comment, like, and interact with developers worldwide.",
                        },
                        {
                            title: "Stay Organized",
                            desc: "Follow topics, manage your posts, and stay updated easily.",
                        },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="bg-gray-800 p-6 rounded-2xl shadow-lg"
                        >
                            <h4 className="text-xl font-bold mb-3 text-primary">{item.title}</h4>
                            <p className="text-gray-300">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Part 2: Admin Control */}
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="mb-20"
            >
                <h3 className="text-2xl font-semibold text-secondary mb-6">
                    Admin & Community Safety
                </h3>
                <div className="bg-gray-800 p-8 rounded-2xl shadow-lg">
                    <p className="text-gray-300">
                        We believe in maintaining a safe and respectful environment. If any
                        member misuses the platform, our admins can take necessary actions:
                    </p>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-300">
                        <li>Warning system for rule-breaking</li>
                        <li>Temporary restrictions on activities</li>
                        <li>Permanent ban for repeated offenses</li>
                    </ul>
                </div>
            </motion.div>

            {/* Part 3: Membership Plan */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="mb-20"
            >
                <h3 className="text-2xl font-semibold text-secondary mb-6">
                    Membership Plan
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gray-800 p-8 rounded-2xl shadow-lg">
                        <h4 className="text-xl font-bold text-primary mb-3">Free Plan</h4>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                            <li>Limited Posts & Comments</li>
                            <li>Access to coding discussions</li>
                            <li>Community guidelines apply</li>
                        </ul>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-r from-primary to-secondary p-8 rounded-2xl shadow-xl"
                    >
                        <h4 className="text-xl font-bold text-black mb-3">
                            Premium Plan (500৳/month)
                        </h4>
                        <ul className="list-disc pl-6 text-black space-y-2">
                            <li>Unlimited Posts, Likes & Comments</li>
                            <li>Priority Support from Admin</li>
                            <li>Exclusive Access to Premium Topics</li>
                            <li>Ad-free Experience</li>
                        </ul>
                    </motion.div>
                </div>
            </motion.div>

            {/* Part 4: Community Vision */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="text-center bg-gray-800 p-10 rounded-2xl shadow-lg"
            >
                <h3 className="text-2xl font-semibold text-secondary mb-4">
                    Our Vision
                </h3>
                <p className="text-gray-300 max-w-2xl mx-auto">
                    We aim to build the largest coding family in Bangladesh, where
                    knowledge is shared freely, members support each other, and everyone
                    grows together. Let’s make learning fun and interactive.
                </p>
            </motion.div>
            <div className="text-center mt-5">
                <FuturisticButton></FuturisticButton>
            </div>
        </div>
    );
};

export default AboutUs;
