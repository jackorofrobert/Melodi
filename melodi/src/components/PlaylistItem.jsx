import React, { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";

const PlaylistItem = ({
  image,
  nameSong,
  category,
  artist,
  time,
  id,
  playlistId,
  use,
  viewAll = true,
}) => {
  const {
    playWithId,
    addToLibrary,
    addSongToPlaylist,
    removeSongFromPlaylist,
    libraryData,
    removeFromLibrary,
  } = useContext(PlayerContext);

  const [songLibrary, setSongLibrary] = useState([]);

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
      playlist: null,
      album: null,
      artist: null,
    });
  };

  const handleRemoveFromLibrary = async (songId) => {
    await removeFromLibrary({
      song: songId,
      playlist: null,
      album: null,
      artist: null,
    });
  };

  const handleAddSongToPlaylist = async (playlistId, songId) => {
    await addSongToPlaylist({
      playlistId: playlistId,
      songId: songId,
    });
  };

  const handleRemoveSongToPlaylist = async (playlistId, songId) => {
    await removeSongFromPlaylist({
      playlistId: playlistId,
      songId: songId,
    });
  };

  const isSongInLibrary = libraryData?.songs?.some(
    (item) => item?.song?._id.toString() === id.toString()
  );

  // [0.2fr_2.5fr_3.5fr_0.5fr_1fr]
  return (
    <div className="group grid grid-cols-[0.2fr_3.5fr_3fr_0.5fr_1fr]  items-center gap-0 h-16  cursor-pointer hover:bg-[#55384b] px-5 border-t border-gray-500">
      <div>
        <i className="fa-solid fa-grip-vertical"></i>
      </div>
      <div className="flex items-center gap-3 relative">
        <img
          src={image}
          alt="song"
          className="w-[50px] h-[50px] rounded group-hover:opacity-50"
        />
        <div className="flex flex-col">
          <p className="font-bold text-white">{nameSong}</p>
          <p className="text-sm">{artist}</p>
        </div>
        <i
          className="bi bi-play-fill text-3xl text-white absolute left-3 top-2 opacity-0 cursor-poiter group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => {
            playWithId(id);
          }}
        ></i>
      </div>
      <div>{category}</div>
      <div>
        {isSongInLibrary ? (
          <i
            className="bi bi-heart-fill text-[#f348e5]  text-base"
            title="Remove song to your libary"
            onClick={() => handleRemoveFromLibrary(id)}
          ></i>
        ) : (
          <i
            className="bi bi-heart hover:text-white text-base hidden items-center group-hover:flex"
            title="Add to your libary"
            onClick={() => handleAddToLibrary(id)}
          ></i>
        )}
      </div>

      {viewAll && use === "playlist" && (
        <div className="hidden items-center gap-6 group-hover:flex">
          <i
            className="bi bi-x text-[26px] hover:text-white mb-1 mt-[9px]"
            title="Remove song to your playlist"
            onClick={() => handleRemoveSongToPlaylist(playlistId, id)}
          ></i>
        </div>
      )}
      {viewAll && use === "listsong" && (
        <div className="hidden items-center gap-6 group-hover:flex">
          <i
            className="bi bi-plus text-[26px] hover:text-white mb-1 mt-[9px] "
            title="Add to your playlist"
            onClick={() => handleAddSongToPlaylist(playlistId, id)}
          ></i>
        </div>
      )}

      <div className={`time-display ${viewAll && "group-hover:hidden"}`}>
        {time}
      </div>
    </div>
  );
};

export default PlaylistItem;
