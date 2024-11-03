import React from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

const DisplayAbout = () => {
  return (
    <div>
      <Navbar />
      <div className=" text-[#F5F5F5] p-8 md:p-16 lg:p-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-400">
            About Melodi 🎶
          </h1>
          <p className="text-lg mt-4 text-gray-300">
            Where Music Meets Community
          </p>
        </div>

        {/* Section: Story */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-indigo-300">
            Our Story 🌱
          </h2>
          <p className="mt-4 text-gray-300 leading-relaxed">
            Melodi was born out of a passion for music and a desire to create a
            platform that serves listeners and artists alike. From discovering
            emerging artists to revisiting timeless classics, Melodi was built
            with the idea of creating a space where anyone can find something to
            enjoy.
          </p>
        </div>

        {/* Section: What Melodi Offers */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-indigo-300">
            What Melodi Offers 🎵
          </h2>
          <ul className="mt-4 list-disc list-inside text-gray-300 leading-relaxed space-y-2">
            <li>
              <span className="font-medium text-indigo-400">
                Curated Playlists:
              </span>{" "}
              Enjoy expertly curated playlists that suit every mood and moment.
            </li>
            <li>
              <span className="font-medium text-indigo-400">
                Personalized Recommendations:
              </span>{" "}
              Discover new music that matches your taste and style.
            </li>
            <li>
              <span className="font-medium text-indigo-400">
                Connect with Artists:
              </span>{" "}
              Discover and support independent artists, explore their
              discographies, and connect with them directly.
            </li>
            <li>
              <span className="font-medium text-indigo-400">
                Seamless Listening Experience:
              </span>{" "}
              High-quality streaming and an intuitive interface for the best
              experience.
            </li>
          </ul>
        </div>

        {/* Section: Mission & Vision */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-indigo-300">
            Our Mission & Vision 🌍
          </h2>
          <p className="mt-4 text-gray-300 leading-relaxed">
            <span className="font-medium text-indigo-400">Mission:</span> To
            make music discovery easy and accessible while creating a community
            where music lovers and creators can connect and inspire each other.
          </p>
          <p className="mt-4 text-gray-300 leading-relaxed">
            <span className="font-medium text-indigo-400">Vision:</span> To be a
            leading music platform where everyone, regardless of background, can
            find music that speaks to them and be a part of a vibrant community
            that celebrates diversity in sound.
          </p>
        </div>

        {/* Section: Join the Community */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-indigo-300">
            Join the Melodi Community 💬
          </h2>
          <p className="mt-4 text-gray-300 leading-relaxed">
            Melodi is more than just a music platform; it’s a community. Connect
            with other music lovers, share playlists, and become a part of a
            growing family that celebrates all things music.
          </p>
          <p className="mt-4 text-gray-300 leading-relaxed">
            Thank you for being part of our journey. Let’s keep the music
            playing!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisplayAbout;
