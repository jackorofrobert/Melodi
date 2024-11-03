import React from "react";
import { assets } from "../assets/assets";
const Footer = () => {
  return (
    <footer className="flex justify-between bg-[#4a2f48] py-10 px-8 text-white font-sans w-full">
      {/* Phần About */}
      <div className="flex-1 mx-10 ">
        <h2 className="font-black text-[35px] mb-3">About</h2>
        <p className="text-base leading-5">
          Melodies is a website that has been created for over{" "}
          <span className="text-pink-500 font-semibold">5 year's</span> now and
          it is one of the most famous music player websites in the world. In
          this website, you can listen and download songs for free. Also, if you
          want no limitation, you can buy our{" "}
          <span className="text-pink-500 font-semibold">premium pass's</span>.
        </p>
      </div>

      {/* Phần Melodi */}
      <div className="flex-1 mx-10 flex-col items-center">
        <h2 className="font-extrabold text-[30px] mb-3 text-center ">Melodi</h2>
        <hr />
        <ul className="list-none p-0 mb-3 text-center mt-3">
          <li className="mb-2 text-2xl">Songs</li>
          <li className="mb-2 text-2xl">Radio</li>
          <li className="mb-2 text-2xl">Podcast</li>
        </ul>
      </div>

      {/* Phần Access */}
      <div className="flex-1 mx-10 items-center">
        <h2 className="font-extrabold text-[30px] mb-3 text-center">Access</h2>
        <hr />

        <ul className="list-none p-0 text-center mt-3">
          <li className="mb-2 text-2xl">Explore</li>
          <li className="mb-2 text-2xl">Artists</li>
          <li className="mb-2 text-2xl">Playlists</li>
          <li className="mb-2 text-2xl">Albums</li>
          <li className="mb-2 text-2xl">Trending</li>
        </ul>
      </div>

      {/* Phần Contact */}
      <div className="flex-1 mx-10">
        <h2 className="font-extrabold text-[30px] mb-3 text-center">Contact</h2>
        <hr />

        <ul className="list-none p-0 text-center mt-3">
          <li className="mb-2 text-2xl">About</li>
          <li className="mb-2 text-2xl">Policy</li>
          <li className="mb-2 text-2xl">Social Media</li>
          <li className="mb-2 text-2xl">Support</li>
        </ul>
      </div>

      {/* Phần Logo và Social */}
      <div className="flex flex-col items-center text-center mx-5 gap-3">
        <img src={assets.logo} alt="Logo" className="w-[80px] object-cover" />
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
          Melodies
        </h2>
        <div className="flex space-x-5 text-4xl mt-4">
          <i className="fab fa-facebook hover:text-pink-500 cursor-pointer transition-colors duration-300"></i>
          <i className="fab fa-instagram hover:text-pink-500 cursor-pointer transition-colors duration-300"></i>
          <i className="fab fa-twitter hover:text-pink-500 cursor-pointer transition-colors duration-300"></i>
          <i className="fas fa-phone hover:text-pink-500 cursor-pointer transition-colors duration-300"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
