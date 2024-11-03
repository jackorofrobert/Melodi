import React, { useContext, useState, useEffect } from "react";
import { PlayerContext } from "../context/PlayerContext";
import PLayListNowItem from "./PLayListNowItem";

const PlayListNow = () => {
  const [isVisible, setIsVisible] = useState({
    id: "",
    visible: false,
  });
  const [songNext, setSongNext] = useState("");
  const [infoPlaylist, setInfoPlaylist] = useState({});
  const { playListNow, isShowListPlay, track, infoPlayListNow, playStatus } =
    useContext(PlayerContext);
  const [updatedPlayList, setUpdatedPlayList] = useState(playListNow);

  // Di chuyển bài hát tiếp theo lên đầu danh sách phát
  useEffect(() => {
    if (playListNow && playListNow.length > 0 && track) {
      const currentIndex = playListNow.findIndex(
        (item) => item._id === track?._id
      );
      if (currentIndex !== -1) {
        const nextIndex = (currentIndex + 1) % playListNow.length;
        setSongNext(playListNow[nextIndex]?._id);

        // Sắp xếp lại danh sách phát với bài hát tiếp theo ở đầu
        const reorderedList = [
          ...playListNow.slice(nextIndex), // Từ bài hát tiếp theo đến cuối
          ...playListNow.slice(0, nextIndex), // Từ đầu đến trước bài hát tiếp theo
        ];
        setUpdatedPlayList(reorderedList);
      }
    }
  }, [track, playListNow]);

  return (
    <div
      className={`fixed right-0 top-0 h-[88%] bg-[#35566d] w-80 shadow-lg p-4  transform transition-transform duration-1000 ease-in-out flex flex-col ${
        isShowListPlay ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ zIndex: 1000 }}
    >
      <div className="text-center py-4 border-b-2">
        <h2 className=" text-white font-semibold text-lg">Now Playing List</h2>
      </div>
      {/* thông tin */}
      {infoPlayListNow?.name && (
        <div className="flex flex-row my-2 overflow-hidden">
          <div
            className={`${
              infoPlayListNow && playStatus && "marquee"
            } whitespace-nowrap `}
          >
            <p className="capitalize font-medium inline text-gray-400">
              {infoPlayListNow?.status}:
            </p>
            <p className="ml-2 font-light inline text-gray-200">
              {infoPlayListNow?.name}
            </p>
          </div>
        </div>
      )}
      {/*  */}
      <div className="text-white my-2 flex justify-start gap-2">
        <i className="bi bi-play-circle text-2xl"></i>
        <p className="capitalize text-lg font-semibold">Song playing</p>
      </div>
      <div className="flex flex-col gap-1 text-white border-b-2">
        {updatedPlayList && updatedPlayList.length > 0 ? (
          updatedPlayList
            .filter((item) => item?._id === track?._id)
            .map((song, index) => (
              <PLayListNowItem
                key={`${song._id}-${index + 1}`}
                song={song}
                isVisible={isVisible.id === song._id && isVisible.visible}
                setVisible={() =>
                  setIsVisible((prev) => ({
                    id: song._id,
                    visible: prev.id === song._id ? !prev.visible : true,
                  }))
                }
              />
            ))
        ) : (
          <p className="text-center mt-10 text-gray-500">
            Không có bài hát nào
          </p>
        )}
      </div>
      <div className="text-white my-2 flex justify-start gap-2">
        <i className="bi bi-music-note-list text-2xl"></i>
        <p className="capitalize font-semibold text-lg">Next song</p>
      </div>
      <div className="flex flex-col gap-1 text-white overflow-y-auto">
        {updatedPlayList && updatedPlayList.length > 0 ? (
          updatedPlayList
            .filter((song) => song?._id !== track?._id)
            .map((song, index) => (
              <PLayListNowItem
                key={`${song._id}-${index}`}
                song={song}
                isVisible={isVisible.id === song._id && isVisible.visible}
                setVisible={() =>
                  setIsVisible((prev) => ({
                    id: song._id,
                    visible: prev.id === song._id ? !prev.visible : true,
                  }))
                }
                songNext={songNext}
              />
            ))
        ) : (
          <p className="text-center mt-10 text-gray-500">
            Không có bài hát nào
          </p>
        )}
      </div>
    </div>
  );
};

export default PlayListNow;
