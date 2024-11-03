import React, { useContext, useEffect } from "react";
import { PlayerContext } from "../context/PlayerContext";
import ListItem from "../components/ListItem";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DisplayYourPlaylistFavorite = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { libraryData, playlistsPublicData } = useContext(PlayerContext);
  const [top, setTop] = useState(4);
  useEffect(() => {
    // Kiểm tra nếu URL chứa "#vitri"
    if (location.hash === "#5") {
      const vitriElement = document.getElementById("5");
      if (vitriElement) {
        vitriElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <>
      <Navbar />
      <div id="5"></div>
      <div className="p-4">
        {/* Phần tiêu đề với các lựa chọn */}
        <div className="flex flex-row items-center space-x-4 mb-6 pb-3 border-b-2 border-gray-500">
          <h1 className="my-5 font-bold text-3xl capitalize">
            Your Favorite<span className="text-[#EE10B0]"> PLayists</span>
          </h1>
        </div>

        {/* Grid cho các playlist */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {libraryData?.playlists?.map((item) => (
            <ListItem
              key={item?._id}
              image={item?.playlist?.image}
              namePlaylist={item?.playlist?.name}
              nameAuthor={item?.playlist?.user?.username}
              id={item?.playlist?._id}
            />
          ))}
        </div>
      </div>
      <div className="my-10 ml-5">
        <h1 className="my-5 font-bold text-3xl capitalize">
          Suggestions just <span className="text-[#0E9EEF]">for you</span>
        </h1>
        <div className="">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {playlistsPublicData.slice(0, top).map((item, index) => (
              <div
                className="rounded-lg w-[230px] h-full flex flex-col  cursor-pointer items-center justify-center bg-black bg-opacity-50"
                key={item._id}
                onClick={() => navigate(`/playlist/${item._id}`)}
              >
                <img
                  src={item.image || assets.album_default}
                  alt={item.name}
                  className="w-full h-[80%] object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
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
            {playlistsPublicData?.length >= top ? (
              <div
                className="flex justify-center items-center flex-col text-white hover:text-[#EE10B0]"
                onClick={() => {
                  setTop((prev) => prev + 10);
                }}
              >
                <p className="w-16 h-16 bg-[#1E1E1E] rounded-full flex items-center justify-center cursor-pointer text-white text-3xl hover:bg-[#EE10B0]">
                  +
                </p>
                <p className="text-[18px] font-bold cursor-pointer w-[6rem]">
                  View more
                </p>
              </div>
            ) : (
              <div
                className="flex justify-center flex-col text-white hover:text-[#EE10B0]"
                onClick={() => {
                  setTop((prev) => prev - 10);
                }}
              >
                <p className="w-16 h-16 bg-[#1E1E1E] rounded-full flex items-center justify-center cursor-pointer text-white text-3xl hover:bg-[#EE10B0]">
                  -
                </p>
                <p className="text-[18px] font-bold cursor-pointer w-[6rem]">
                  Collapse
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayYourPlaylistFavorite;
