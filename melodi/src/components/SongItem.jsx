import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { assets } from "../assets/assets";

const SongItem = ({ name, image, artist, id }) => {
  const { playWithId } = useContext(PlayerContext);

  return (
    <div
      onClick={() => playWithId(id)}
      className="w-[200px] p-3 cursor-pointer hover:bg-[#ffffff26] bg-[#2a2a2a] rounded-lg relative group"
    >
      {/* Hình ảnh */}
      <img
        className="rounded-lg h-40 object-cover items-center opacity-100 group-hover:opacity-60"
        src={image}
        alt=""
      />
      <i
        className="absolute bi bi-play-fill text-5xl text-white left-[4rem] top-[3.5rem] opacity-0 cursor-poiter group-hover:opacity-100 transition-opacity duration-300"
        onClick={() => {
          playWithId(id);
        }}
      ></i>
      {/* Tên bài hát */}
      <p className="font-bold mt-2 mb-1 text-base text-white leading-tight w-full">
        {name}
      </p>

      {/* Tên nghệ sĩ và biểu tượng */}
      <div className="flex justify-between items-center">
        <p className="font-light text-white text-[12px]">{artist}</p>
        <img
          src={assets.notnhac_icon}
          alt=""
          className="h-4 w-4 text-pink-500"
        />
      </div>
    </div>
  );
};

export default SongItem;
