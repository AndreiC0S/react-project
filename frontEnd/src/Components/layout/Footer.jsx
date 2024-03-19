import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer id='footer' className="bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 ">
      <div id='fContainer' className=" mx-auto py-3">
        <div className="flex justify-center space-x-6">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-2xl hover:text-gray-300" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-2xl hover:text-gray-300" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-2xl hover:text-gray-300" />
          </a>
        </div>
        <p className="text-center mt-4">&copy; {new Date().getFullYear()} ACWebsite.  "All" rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;




