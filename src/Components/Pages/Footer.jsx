import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr absolute from-[#1a1a1a] to-[#111111] text-gray-300 px-5 md:px-20 py-10 border-t border-[#333] rounded-t-2xl shadow-2xl ">
      <div className=" grid md:grid-cols-4 gap-10">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-gold-500 mb-4">ForumVerse</h2>
          <p className="text-sm text-gray-400">
            ForumVerse is a developer-friendly platform for sharing knowledge, ideas, and code. Join and grow with our MERN-powered community.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-gold-400">Home</a></li>
            <li><a href="/membership" className="hover:text-gold-400">Membership</a></li>
            <li><a href="/dashboard" className="hover:text-gold-400">Dashboard</a></li>
            <li><a href="/join-us" className="hover:text-gold-400">Join Us</a></li>
          </ul>
        </div>

        {/* Tags */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Top Tags</h3>
          <div className="flex flex-wrap gap-2">
            {["React", "MongoDB", "Express", "NodeJS", "MERN", "JavaScript"].map((tag, idx) => (
              <span
                key={idx}
                className="bg-gold-600 text-amber-400 px-3 py-1 rounded-full text-xs font-medium hover:bg-gold-500 transition-all"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Connect with Us</h3>
          <div className="flex gap-4 text-lg">
            <a href="https://www.facebook.com/Shihab2975" className="hover:text-[#1877f2] transition-all"><FaFacebookF /></a>
            <a href="https://x.com/shehab55755" className="hover:text-[#1DA1F2] transition-all"><FaTwitter /></a>
            <a href="https://www.instagram.com/code__hub_69/" className="hover:text-[#e1306c] transition-all"><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/shehabul-islam/" className="hover:text-[#0077b5] transition-all"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-700 pt-5">
        <p>&copy; {new Date().getFullYear()} ForumVerse. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
