import React, { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import AnimationMusic from "./AnimationMusic";
import { assets } from "../assets/assets";
const TableItem = ({
  index,
  image,
  title,
  artist,
  dateCreated,
  category,
  time,
  id,
}) => {
  const [hovered, setHovered] = useState(false);
  const [songLibrary, setSongLibrary] = useState([]);

  const {
    playWithId,
    track,
    playStatus,
    pause,
    play,
    libraryData,
    addToLibrary,
    removeFromLibrary,
  } = useContext(PlayerContext);

  useEffect(() => {
    if (libraryData?.songs?.length > 0) {
      const arr = libraryData.songs.map((item) => {
        return item._id;
      });
      // console.log("arr", arr);
      setSongLibrary(arr);
    }
  }, [libraryData]);

  const handleAddToLibrary = async (songId) => {
    await addToLibrary({
      song: songId,
      album: null,
      artist: null,
      playlist: null,
    });
  };

  const handleRemoveFromLibrary = async (songId) => {
    await removeFromLibrary({
      song: songId,
      album: null,
      artist: null,
      playlist: null,
    });
  };

  return (
    <div className="group grid grid-cols-[0.6fr_3fr_1.5fr_3fr_0.5fr_1fr] rounded-lg  items-center gap-0 h-16 bg-[#1E1E1E] cursor-pointer hover:bg-[#616061]">
      {/* Cột 1: Ảnh */}
      <div className="flex items-center justify-center !bg-[#412c3a] h-16 ">
        {playStatus && track._id === id ? (
          <AnimationMusic />
        ) : (
          <p className="text-white text-xl"># {index + 1}</p>
        )}
      </div>

      {/* Cột 2: Tiêu đề và nghệ sĩ */}
      <div className="flex items-center gap-2 -ml-1 relative">
        <img
          src={image}
          alt=""
          className="w-16 h-16 rounded-lg group-hover:opacity-50"
        />
        <div className="flex flex-col ml-3">
          <p className="text-[18px] font-bold overflow-hidden truncate">
            {title}
          </p>
          <p className="text-white">{artist}</p>
        </div>
        <i
          className={`absolute bi ${
            playStatus && track._id === id ? "bi-pause-fill" : "bi-play-fill "
          }  text-4xl text-white left-[1rem] top-[1rem] cursor-poiter group-hover:opacity-100 transition-opacity duration-300 opacity-0`}
          onClick={() => {
            if (track?._id !== id) {
              playWithId(id);
            } else if (playStatus) {
              pause();
            } else {
              play();
            }
          }}
        ></i>
      </div>

      {/* Cột 3: Ngày phát hành */}
      <div className="text-white">{dateCreated}</div>

      {/* Cột 4: Thể loại nhạc */}
      <div className="text-white truncate ">{category}</div>

      {/* Cột 5: Thời gian */}
      <div className="flex items-center gap-1 text-gray-500 pr-4">
        {/* <i
          className={`bi ${
            songLibrary.includes(id) ? "bi-heart-fill" : "bi-heart"
          } text-pink-500 mr-4 cursor-pointer group-hover:text-pink-500`}
          // onMouseEnter={() => setHovered(true)}
          // onMouseLeave={() => setHovered(false)}
          title={
            !songLibrary.includes(id)
              ? "Remove song to your libary"
              : "Add to your libary"
          }
          onClick={() => {
            if (!songLibrary.includes(id)) {
              handleRemoveFromLibrary(id, null, null, null);
            } else {
              handleAddToLibrary(id, null, null, null);
            }
          }}
        ></i> */}
        {songLibrary.includes(id) ? (
          <i
            className={`bi ${
              hovered ? "bi-heart" : "bi-heart-fill"
            } text-pink-500 mr-4 cursor-pointer group-hover:text-pink-500`}
            title="Remove song to your libary"
            onClick={() => handleRemoveFromLibrary(id)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          ></i>
        ) : (
          <i
            className={`bi ${
              hovered ? "bi-heart-fill" : "bi-heart"
            } text-pink-500 mr-4 cursor-pointer group-hover:text-pink-500`}
            title="Add to your libary"
            onClick={() => handleAddToLibrary(id)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          ></i>
        )}
        <p className="text-white">{time}</p>
      </div>
      <div className="bg-[#412c3a] h-16"></div>
    </div>
  );
};

export default TableItem;
