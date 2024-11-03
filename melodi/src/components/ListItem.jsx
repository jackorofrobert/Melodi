import React from "react";
import { assets } from "../assets/assets";
import { Navigate, useNavigate } from "react-router-dom";

const ListItem = ({ image, namePlaylist, nameAuthor, id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center rounded-lg w-full h-full cursor-pointer">
      {/* Khung ảnh với overflow-hidden để giữ kích thước khung cố định */}
      <div
        className="w-full h-[90%] overflow-hidden rounded-md"
        onClick={() => navigate(`/your-playlist/${id}`, { replace: true })}
      >
        <img
          src={image || assets.album_default}
          alt={namePlaylist}
          className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
        />
        <div className=""></div>
      </div>

      {/* Thông tin về playlist và tác giả */}
      <p className="text-left text-lg font-medium h-[10%] w-full">
        {namePlaylist}
      </p>
      <p className="text-left text-base font-medium h-[10%] w-full">
        {nameAuthor}
      </p>
    </div>
  );
};

export default ListItem;
