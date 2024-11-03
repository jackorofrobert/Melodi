// SongItem.jsx
import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import AnimationMusic from "./AnimationMusic";

const PLayListNowItem = ({ song, isVisible, setVisible, songNext }) => {
  const {
    pause,
    play,
    track,
    playStatus,
    playWithId,
    libraryData,
    removeFromLibrary,
    addToLibrary,
    removeSongFromQueue,
  } = useContext(PlayerContext);
  return (
    <div
      className={`rounded-md group relative grid grid-cols-[3.5fr_0.5fr] items-center gap-4 border-b border-gray-500 hover:bg-[#734570] cursor-pointer ${
        (song?._id === track?._id || songNext === song?._id) && `bg-[#734570]`
      }`}
    >
      <div className="flex flex-row items-center gap-1">
        <img
          src={song?.image}
          alt={song?.title}
          className="w-12 h-12 rounded group-hover:opacity-60"
        />
        <div className="flex flex-col">
          <p className="font-medium text-sm truncate">{song?.title}</p>
          <p className="text-sm text-gray-300 truncate">
            {song?.artist?.username}
          </p>
        </div>
        <i
          className={`bi ${
            playStatus && track._id === song?._id
              ? "bi-pause-fill"
              : "bi-play-fill "
          } text-2xl text-white absolute opacity-0 left-3 top-3 cursor-poiter group-hover:opacity-100 transition-opacity duration-300`}
          onClick={() => {
            if (track?._id !== song?._id) {
              playWithId(song?._id);
            } else if (playStatus) {
              pause();
            } else {
              play();
            }
          }}
        ></i>
      </div>
      <div className="flex flex-row justify-center">
        {libraryData?.songs?.includes(song?._id) ? (
          <i
            className="bi bi-heart-fill text-[#f348e5] text-base"
            title="Xóa bài hát khỏi thư viện"
            onClick={() => removeFromLibrary(song?._id)}
          ></i>
        ) : (
          <i
            className="bi bi-heart hover:text-[#f348e5] text-base hidden items-center group-hover:flex"
            title="Thêm vào thư viện"
            onClick={() => addToLibrary(song?._id)}
          ></i>
        )}
        <div className="group flex justify-center items-center relative h-10 w-10">
          <i
            className={`bi bi-three-dots rounded-full hover:bg-gray-400 px-1 ${
              isVisible ? "flex" : "hidden group-hover:flex"
            } items-center cursor-pointer`}
            onClick={() => setVisible((prev) => !prev)}
          ></i>
          {isVisible && (
            <div className="absolute top-7 -left-44 z-50 flex-col w-[205px] bg-gray-400 rounded-lg group-hover:flex">
              <div
                className="grid grid-cols-[0.5fr_4fr] items-center gap-0 h-10 px-2 hover:bg-[#734570] rounded-lg cursor-pointer"
                onClick={() => {
                  removeSongFromQueue(song?._id);
                  console.log("Remove from playlist now", song?._id);
                }}
              >
                <i className="bi bi-trash hover:text-white text-sm"></i>
                <p className="text-sm">Remove from playlist now</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PLayListNowItem;
