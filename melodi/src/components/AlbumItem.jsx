import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const AlbumItem = ({ image, name, artist, id }) => {
  const navigate = useNavigate();
  const { addToLibrary, removeFromLibrary, libraryData, addAlbumToQueue } =
    useContext(PlayerContext);

  const handleRemoveFromLibrary = async (albumId) => {
    await removeFromLibrary({
      album: albumId,
    });
  };

  const handleAddToLibrary = async (albumId) => {
    await addToLibrary({
      album: albumId,
    });
  };

  return (
    <div className="group w-[200px] p-3  hover:bg-[#ffffff26] bg-[#2a2a2a] rounded-lg">
      <div className="flex flex-col relative gap-4">
        {/* Hình ảnh Album */}
        <img
          className="rounded-lg h-40 w-full object-cover opacity-100 group-hover:opacity-40 mb-1"
          src={image}
          alt=""
        />
        {/* Icon Play */}
        <div className="absolute flex justify-around items-center left-0 top-[4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full">
          {libraryData?.songs?.includes(id) ? (
            <i
              className="bi bi-heart-fill hover:text-[#dd5285] text-lg flex items-center justify-center hover:bg-gray-400 px-1.5 pb-1 py-2 rounded-full border-1 border-gray-500 cursor-pointer "
              title="Remove albums to your favorite albums"
              onClick={() => handleRemoveFromLibrary(id)}
            ></i>
          ) : (
            <i
              className="bi bi-heart hover:text-[#dd5285] text-lg flex items-center justify-center hover:bg-gray-400 px-1.5 pb-1 py-2 rounded-full border-1 border-gray-500 cursor-pointer"
              title="Add albums to your favorite albums"
              onClick={() => handleAddToLibrary(id)}
            ></i>
          )}
          <i
            className=" bi bi-play-circle text-3xl mt-1 text-white  cursor-pointer hover:text-[#dd5285]"
            title="Add to playlist"
            onClick={() => navigate(`/album/${id}`)}
          ></i>
          <i
            className="bi bi-plus-lg text-xl font-semibold text-white cursor-pointer flex items-center justify-center hover:bg-gray-400 hover:text-[#f03d7f] p-1 rounded-full border-1 border-gray-500 "
            title="Add albums to your favorite playlist"
            onClick={() => addAlbumToQueue(id)}
          ></i>
        </div>
      </div>

      {/* Tên Album */}
      <p className="font-semibold mt-2 mb-1 text-[16px] text-white leading-tight cursor-pointer">
        {name}
      </p>

      {/* Nghệ sĩ và Icon */}
      <div className="flex justify-between items-center">
        <p className="font-light text-white text-[12px]">{artist}</p>
        <i className="bi bi-vinyl text-[#0E9EEF]"></i>
      </div>
    </div>
  );
};

export default AlbumItem;
