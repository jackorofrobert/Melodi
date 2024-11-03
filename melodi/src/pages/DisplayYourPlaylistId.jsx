import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { PlayerContext } from "../context/PlayerContext";
import { useLocation, useParams } from "react-router-dom";
import PlaylistItem from "../components/PlaylistItem";
import { formatHour } from "../utils/formatHour";

const DisplayYourPlaylistId = ({ data, show }) => {
  const { id } = useParams();
  const [playlistId, setPlayListId] = useState({});
  const [playlistSongs, setPlayListSongs] = useState([]);
  const [showEveryOne, setShowEveryOne] = useState(show);

  const {
    playlistsData,
    infoLogin,
    songsData,
    openAddPlaylist,
    removeFromLibrary,
    updateImagePlaylist,
    playlistsPublicData,
    libraryData,
    addToLibrary,
    addPlaylistToQueue,
  } = useContext(PlayerContext);

  const shuffleArray = () => {
    if (!Array.isArray(songsData) || songsData.length === 0) return;

    const array = [...songsData];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    const arrNew = array.slice(0, 6);
    setPlayListSongs(arrNew);
  };

  const isPlaylistInLibrary = libraryData?.playlists?.some(
    (item) => item?.playlist?._id.toString() === id.toString()
  );

  useEffect(() => {
    // console.log(show);
    setPlayListId(data);
    shuffleArray();
    setShowEveryOne(show);
  }, [data]);

  // useEffect(() => {
  //   console.log("id", id);
  //   const check = async () => {
  //     console.log("infoLogin", infoLogin?.id);
  //     console.log("playlistId", playlistId?.user?._id);
  //     if (infoLogin?.id === playlistId?.user?._id) {
  //       setShowEveryOne(false);
  //     } else {
  //       setShowEveryOne(true);
  //     }
  //   };
  //   check();
  // }, [infoLogin, playlistId]);

  const handleRemoveFromLibrary = async (playlist) => {
    await removeFromLibrary({
      song: null,
      playlist: playlist,
      album: null,
      artist: null,
    });
  };

  const handleUpdateImage = async (playlistId, image) => {
    await updateImagePlaylist(playlistId, image);
  };

  const handleAddToLibrary = async (playlistId) => {
    await addToLibrary({
      song: null,
      album: null,
      artist: null,
      playlist: playlistId,
    });
  };

  return (
    <>
      <Navbar />

      <div className="max-w-full m-auto p-5 bg-[#412c3a] text-[#fffcfc85]">
        <div className="flex flex-row">
          {/* Playlist Header (Left Side) */}
          <div className="flex flex-col items-center gap-3 mb-5 w-1/3">
            <div className="group relative w-[320px] h-[320px] rounded-xl flex justify-center items-center text-[100px] text-[#ad579d]">
              {!playlistId?.image || typeof playlistId?.image !== "string" ? (
                <i className="fa-solid fa-music group-hover:opacity-50"></i>
              ) : (
                <img
                  src={playlistId?.image}
                  alt="image-playlist"
                  className="w-full h-full group-hover:opacity-50 rounded-xl"
                />
              )}
              <div className="absolute flex justify-around items-center w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                <i
                  className="bi bi-play-circle text-6xl mt-1 text-white cursor-pointer hover:text-[#dd5285]"
                  onClick={() => addPlaylistToQueue(id)}
                ></i>
              </div>
            </div>
            <div className="text-center">
              <div className="flex justify-center items-center gap-3 font-bold text-sm text-white">
                <p className="text-4xl">{playlistId?.name}</p>
                {showEveryOne && (
                  <i
                    className="fa-solid fa-pencil-alt hover:text-[#9147ff] cursor-pointer text-[20px] pb-2"
                    onClick={() =>
                      openAddPlaylist(playlistId?.name, playlistId?.status, id)
                    }
                  ></i>
                )}
              </div>
              <div>
                <p className="">
                  Update: {new Date(playlistId?.updatedAt).toDateString()}
                </p>
                <p className="">{playlistId?.listenedCount} likes</p>
              </div>
              {/* <p className="my-2">
                Created by{" "}
                <b className="text-white text-xl">{infoLogin?.name}</b>
              </p> */}

              {/* <div className="flex justify-center items-center gap-3 bg-[#914c79] hover:bg-[#b25a93] px-5 py-1 rounded-full cursor-pointer text-white font-semibold">
                <i className="fa-solid fa-play text-lg"></i>
                <p>Play Playlist</p>
              </div> */}
            </div>
            {showEveryOne && (
              <div className="group flex justify-center items-center relative h-10 w-10">
                <i className="bi bi-three-dots rounded-full bg-[#914c79] py-2 px-3 cursor-pointer flex items-center justify-center"></i>
                <div className="hidden absolute top-[-122px] right-[-182px] flex-col w-[210px] bg-[#914c79] rounded-lg group-hover:flex">
                  <div
                    className=" grid grid-cols-[0.5fr_4fr] items-center gap-0 h-10 pl-5 hover:bg-[#b16092] rounded-lg hover:text-white cursor-pointer"
                    onClick={() => handleAddToLibrary(id)}
                  >
                    <i className="bi bi-plus-square text-xl hover:text-white"></i>
                    <p className="">Add to playlist favorite</p>
                  </div>

                  <div
                    className=" grid grid-cols-[0.5fr_3fr] items-center gap-0 h-10 pl-5 hover:bg-[#b16092] rounded-lg hover:text-white cursor-pointer"
                    onClick={() => document.getElementById("fileImage").click()}
                  >
                    <i className="fa-regular fa-image text-xl" id="name"></i>
                    <p className="">Edit playlist avatar</p>
                    <input
                      type="file"
                      name="image"
                      id="fileImage"
                      accept="image/*"
                      hidden
                      onChange={(e) => handleUpdateImage(id, e.target.files[0])}
                    />
                  </div>
                  <div
                    className=" grid grid-cols-[0.5fr_3fr] items-center gap-0 h-10 pl-5 hover:bg-[#b16092] rounded-lg hover:text-white cursor-pointer"
                    onClick={() => handleRemoveFromLibrary(id)}
                  >
                    <i className="bi bi-trash text-xl hover:text-white"></i>
                    <p className="">Delete playlist</p>
                  </div>
                </div>
              </div>
            )}
            {!showEveryOne && (
              <div className="flex justify-center items-center gap-2">
                {isPlaylistInLibrary ? (
                  <i
                    className="bi bi-heart-fill text-[#dd5285] hover:text-[#dd5285] text-lg flex items-center justify-center hover:bg-gray-400 px-1.5 pb-1 py-2 rounded-full border-1 border-gray-500 cursor-pointer "
                    title="Remove playlist to your favorite playlists"
                    onClick={() => handleRemoveFromLibrary(id)}
                  ></i>
                ) : (
                  <i
                    className="bi bi-heart  hover:text-[#dd5285] text-lg flex items-center justify-center hover:bg-gray-400 px-1.5 pb-1 py-2 rounded-full border-1 border-gray-500 cursor-pointer"
                    title="Add playlist to your favorite playlists"
                    onClick={() => handleAddToLibrary(id)}
                  ></i>
                )}
              </div>
            )}
          </div>

          {/* Playlist Header Right (Right Side) */}
          <div className="w-2/3 flex flex-col overflow-auto ">
            {playlistId?.songs?.length > 0 ? (
              <div className="song-list">
                <div className="grid grid-cols-[0.2fr_3.5fr_3.5fr_0.5fr_0.5fr] gap-0 px-5 items-center text-white font-bold text-[18px]">
                  <div className="text-left py-2">
                    <i className="fa-solid fa-sort"></i>
                  </div>
                  <div>Song</div>
                  <div>Music Genre</div>
                  <div>Time</div>
                </div>
                {playlistId?.songs?.map((item) => {
                  return (
                    <PlaylistItem
                      key={item?._id}
                      image={item?.image}
                      nameSong={item?.title}
                      category={item?.category
                        ?.map((cat) => cat.name)
                        .join(", ")}
                      artist={item?.artist?.username}
                      time={item?.duration}
                      id={item?._id}
                      playlistId={id}
                      use={"playlist"}
                      viewAll={showEveryOne}
                    />
                  );
                })}

                <p className="text-white mt-3">
                  {playlistId?.songs?.length} song •{" "}
                  {formatHour(playlistId?.songs)}
                </p>
              </div>
            ) : (
              <div className="w-full h-[15rem] bg-[#7c566f] flex flex-col items-center justify-center rounded-xl">
                <i className="bi bi-music-note-beamed text-7xl text-white mb-3"></i>
                <p className="text-xl text-white">
                  There are no songs in the playlist
                </p>
              </div>
            )}

            {/* Suggested Songs */}
            {showEveryOne && (
              <div className="mt-10">
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <h3 className="text-3xl font-bold text-white">
                      Suggested Songs
                    </h3>
                    <p className="text-sm text-gray-300">
                      Based on recent listening history
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-2 bg-[#914c79] hover:bg-[#b25a93] px-5 py-1 rounded-full text-white cursor-pointer font-semibold"
                    onClick={shuffleArray}
                  >
                    <i className="fa-solid fa-sync text-base p-1"></i>
                    <p>Refresh</p>
                  </div>
                </div>
                <div className="h-[20rem] overflow-scroll">
                  {playlistSongs?.map((item, index) => {
                    return (
                      <PlaylistItem
                        image={item.image}
                        nameSong={item.title}
                        category={item?.category
                          ?.map((cat) => cat.name)
                          .join(", ")}
                        artist={item?.artist?.username}
                        time={item.duration}
                        id={item._id}
                        key={item._id}
                        playlistId={id}
                        use={"listsong"}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayYourPlaylistId;
