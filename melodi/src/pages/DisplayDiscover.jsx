import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
// import { albumsData } from "../assets/assets";
import AlbumItem from "../components/AlbumItem";
// import { songsData } from "../assets/assets";
import SongItem from "../components/SongItem";
import { PlayerContext } from "../context/PlayerContext";
import { useContext } from "react";
import Slider from "../components/Slider";
import TrendSongTable from "../components/TrendSongTable";
import ArtistItem from "../components/ArtistItem";
import { assets } from "../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";

const DisplayDiscover = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    songsData,
    albumsData,
    playlistsPublicData,
    songsDataNew,
    artistsData,
  } = useContext(PlayerContext);

  const dataGenres = [
    { id: 1, name: "Pop Tracks", image: `${assets.pop}` },
    { id: 2, name: "Rap Tracks", image: `${assets.rap}` },
    { id: 3, name: "Rock Tracks", image: `${assets.rock}` },
    { id: 4, name: "Classic Tracks", image: `${assets.classic}` },
  ];

  useEffect(() => {
    // Kiểm tra nếu URL chứa "#vitri"
    if (location.hash === "#2") {
      const vitriElement = document.getElementById("2");
      if (vitriElement) {
        vitriElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <Navbar />

      {/* Music Genres*/}
      <div id="2"></div>
      <div className="my-10 ml-5">
        <h1 className="my-5 font-bold text-3xl capitalize">
          Music <span className="text-[#EE10B0]">Genres</span>
        </h1>
        <div className="flex overflow-auto gap-8">
          {dataGenres.map((item, index) => (
            <div
              className="relative w-[280px] h-[190px] flex items-center justify-center"
              key={index}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg opacity-80 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
              />
              <h1 className="absolute bottom-0 text-center w-full text-2xl font-bold text-white py-5">
                {item.name}
              </h1>
            </div>
          ))}
          <div className="flex justify-center flex-col text-white ml-4 hover:text-[#EE10B0]">
            <span className="w-16 h-16 bg-[#1E1E1E] rounded-full flex items-center justify-center cursor-pointer text-white text-3xl hover:bg-[#EE10B0]">
              +
            </span>
            <p className="text-[18px] font-bold cursor-pointer w-[5rem]">
              View All
            </p>
          </div>
        </div>
      </div>

      {/* Mood Playlist */}
      <div className="my-10 ml-5">
        <h1 className="my-5 font-bold text-3xl capitalize">
          Favorite <span className="text-[#EE10B0]">Playlist</span>
        </h1>
        <div className="flex overflow-auto gap-4">
          <div className="flex overflow-auto gap-4">
            {playlistsPublicData.slice(0, 6).map((item, index) => (
              <div
                className="rounded-lg w-[280px] h-full flex flex-col items-center cursor-pointer justify-center bg-black bg-opacity-50"
                key={item._id}
                onClick={() => navigate(`/playlist/${item._id}`)}
              >
                <img
                  src={item.image || assets.album_default}
                  alt={item.name}
                  className="w-full h-[80%] object-cover rounded-lg "
                />
                <div className="flex flex-row items-center justify-between w-full px-2 mt-2 h-[20%] ">
                  <h1 className="text-lg font-bold text-white text-center">
                    {item.name}
                  </h1>
                  <i className="bi bi-music-note-list text-white"></i>
                </div>
                {/* <p>{item.description}</p> */}
              </div>
            ))}
            <div
              className="flex justify-center flex-col text-white ml-4 hover:text-[#EE10B0]"
              onClick={() => navigate("/albums/#3")}
            >
              <span className="w-16 h-16 bg-[#1E1E1E] rounded-full flex items-center justify-center cursor-pointer text-white text-3xl hover:bg-[#EE10B0]">
                +
              </span>
              <p className="text-[18px] font-bold cursor-pointer w-[5rem]">
                View All
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* List Artist */}
      <div className="my-10 ml-5">
        <h1 className="my-5 font-bold text-3xl capitalize">
          Popular <span className="text-[#0E9EEF]">Artists</span>
        </h1>
        <div className="flex overflow-auto gap-4">
          {artistsData.slice(0, 8).map((item, index) => (
            <ArtistItem
              key={index}
              artist={item.username}
              image={item.profile_image}
              id={item._id}
            />
          ))}
          <div
            className="flex justify-center flex-col text-white ml-4 hover:text-[#EE10B0]"
            onClick={() => navigate("/artists/#4")}
          >
            <span className="w-16 h-16 bg-[#1E1E1E] rounded-full flex items-center justify-center cursor-pointer text-white text-3xl hover:bg-[#EE10B0]">
              +
            </span>
            <p className="text-[18px] font-bold cursor-pointer w-[5rem]">
              View All
            </p>
          </div>
        </div>
      </div>
      {/* Trendinge Songs */}
      <div className="my-10 ml-5">
        <h1 className="my-5 font-bold text-3xl capitalize">
          Trending <span className="text-[#EE10B0]">Songs</span>
        </h1>
        <TrendSongTable />
      </div>

      {/* Top Albums */}
      {/* <div className="my-10 ml-5">
        <h1 className="my-5 font-bold text-3xl capitalize">
          Top <span className="text-[#0E9EEF]">Albums</span>
        </h1>
        <div className="flex overflow-auto gap-4">
          {albumsData.slice(0, 6).map((item, index) => (
            <AlbumItem
              key={index}
              name={item.name}
              artist={item.artist.map((artist) => artist.username).join(", ")}
              id={item._id}
              image={item.image}
            />
          ))}
          <div
            className="flex justify-center flex-col text-white ml-4 hover:text-[#EE10B0]"
            onClick={() => navigate("/albums")}
          >
            <span className="w-16 h-16 bg-[#1E1E1E] rounded-full flex items-center justify-center cursor-pointer text-white text-3xl hover:bg-[#EE10B0]">
              +
            </span>
            <p className="text-[18px] font-bold cursor-pointer w-[5rem]">
              View All
            </p>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default DisplayDiscover;
