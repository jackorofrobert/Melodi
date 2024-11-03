import React, { useContext, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";
import { formatHour } from "../utils/formatHour";
import AnimationMusic from "../components/AnimationMusic";

const DisplayAlbum = () => {
  const { id } = useParams();
  const { playWithId, albumsData, addAlbumToQueue, playStatus, track } =
    useContext(PlayerContext);
  const [albumData, setAlbumData] = useState(null);

  useEffect(() => {
    const selectedAlbum = albumsData.find((item) => item._id === id);
    setAlbumData(selectedAlbum);
  }, [id, albumsData]);

  return albumData ? (
    <>
      <Navbar />

      <div className="p-6">
        {/* Album Info */}
        <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end relative">
          {/* <div> */}
          <img
            className="w-60 rounded-lg shadow-custom"
            src={albumData.image}
            alt={albumData.name}
          />
          {/* </div> */}
          <div className="flex flex-col md:ml-6 gap-3">
            <p className="text-lg md:text-xl text-gray-200">Album</p>
            <h2 className="font-bold text-2xl md:text-3xl text-white mb-4">
              {albumData.name}
            </h2>
            <h4 className="text-gray-200 text-sm md:text-base">
              {albumData.desc}
            </h4>
            <p className="mt-2 text-gray-200 text-sm">
              {/* <img
              className="inline-block w-10 object-cover mr-2"
              src={assets.logo}
              alt="Melodies"
            /> */}
              {/* <b
              className="
            bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent text-lg text-bold"
            >
              Melodies
            </b>{" "} */}
              +
              {
                // albumData.viewCount
                "2k"
              }{" "}
              listens · <b> {albumData.songs.length} songs</b> about{" "}
              <b> {formatHour(albumData.songs)}</b>
            </p>
          </div>
          <div className="absolute right-20">
            <i
              className="bi bi-play-circle text-6xl mt-1 text-white  cursor-pointer hover:text-[#dd5285]"
              title="Play"
              onClick={() => addAlbumToQueue(id)}
            ></i>
          </div>
        </div>

        {/* Song List Header */}
        <div className="ml-2 grid grid-cols-[4fr_5fr_2fr_1fr] mt-10 px-4 text-gray-200">
          <p className="text-lg">
            <b className=""></b>Title
          </p>
          <p className="text-lg">Album</p>
          <p className="hidden sm:block text-lg">Release Date</p>
          <img className="m-auto w-5" src={assets.clock_icon} alt="Duration" />
        </div>
        <hr className="border-gray-400 my-2" />

        {/* Song List */}
        {albumData?.songs?.map((item, index) => (
          <div
            onClick={() => playWithId(item._id)}
            key={index}
            className="ml-2 grid grid-cols-[4fr_5fr_2fr_1fr] gap-5 p-3 items-center text-gray-200 hover:bg-gray-600/50 cursor-pointer transition-all duration-200"
          >
            <div className="text-white font-medium relative">
              <div className="absolute -left-7 top-3">
                {playStatus && track._id === item?._id ? (
                  <AnimationMusic />
                ) : (
                  <b className=" text-gray-300"># {index + 1}</b>
                )}
              </div>
              <img
                className="inline w-12 h-12 mr-4 rounded-md"
                src={item.image}
                alt={item.title}
              />
              {item.title}
            </div>
            <p className="text-sm">{albumData.name}</p>
            <p className="text-sm hidden sm:block">
              {new Date(albumData.createdAt).toDateString()}
            </p>
            <p className="text-center text-sm">{item.duration}</p>
          </div>
        ))}
      </div>
    </>
  ) : null;
};

export default DisplayAlbum;
