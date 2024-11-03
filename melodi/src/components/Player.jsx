import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    time,
    previous,
    next,
    seekSong,
    audioRef,
    isRepeat,
    setIsRepeat,
    volumeBar,
    volumeBg,
    isShowListPlay,
    setIsShowListPlay,
    setIsRandom,
    isRandom,
  } = useContext(PlayerContext);

  const [volumePercent, setVolumePercent] = useState(50);
  const [volumeIcon, setVolumeIcon] = useState("bi-volume-down");
  const [previousVolume, setPreviousVolume] = useState(50);

  const volumeSong = (e) => {
    if (!volumeBg.current || !audioRef.current) return;
    const valueVolume = e.nativeEvent.offsetX / volumeBg.current.offsetWidth;
    audioRef.current.volume = valueVolume;
    volumeBar.current.style.width = Math.floor(valueVolume * 100) + "%";
    setVolumePercent(Math.floor(valueVolume * 100));
  };

  const handlerVolumeIcon = async () => {
    if (volumeIcon === "bi-volume-down" || volumeIcon === "bi-volume-up") {
      setPreviousVolume(audioRef.current.volume);
      setVolumePercent(0);
      audioRef.current.volume = 0;
      setVolumeIcon("bi-volume-mute");
    } else {
      setVolumePercent(previousVolume * 100);
      setVolumeIcon(previousVolume > 0.5 ? "bi-volume-up" : "bi-volume-down");
      audioRef.current.volume = previousVolume;
    }
  };

  useEffect(() => {
    if (volumePercent === 0) {
      setVolumeIcon("bi-volume-mute");
    } else if (volumePercent > 50) {
      setVolumeIcon("bi-volume-up");
    } else {
      setVolumeIcon("bi-volume-down");
    }
  }, [volumePercent]);
  return track ? (
    <div className=" h-[12%] bg-[#334452] flex justify-between items-center text-white px-4">
      <div className="hidden lg:flex items-center gap-4">
        <img className="h-16 w-16 rounded-md" src={track.image} alt="" />
        <div>
          <p className="text-xl font-bold white-space">{track.title}</p>
          <p className="text-sm">{track.artist.username}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 py-2 ">
        <div className="flex gap-4">
          <div className="pt-1 h-10 w-10 rounded-full hover:bg-slate-500 flex justify-center items-center cursor-pointer">
            <i
              className={`bi bi-shuffle ${
                isRandom ? "text-[#f03d7f]" : " text-white hover:text-[#f03d7f]"
              } text-[18px]`}
              onClick={() => setIsRandom(!isRandom)}
            ></i>
          </div>

          <div className="pt-1 h-10 w-10 rounded-full hover:bg-slate-500 flex justify-center items-center cursor-pointer">
            <i
              className="bi bi-skip-start-fill text-2xl"
              onClick={previous}
            ></i>
          </div>

          {playStatus ? (
            <div className=" cursor-pointer">
              <i
                className="bi bi-pause-circle text-4xl hover:text-[#f03d7f]"
                onClick={pause}
              ></i>
            </div>
          ) : (
            <div className="  cursor-pointer">
              <i
                className="bi bi-play-circle text-4xl hover:text-[#f03d7f]"
                onClick={play}
              ></i>
            </div>
          )}

          <div className=" pt-1 h-10 w-10 rounded-full hover:bg-slate-500 flex justify-center items-center cursor-pointer">
            <i className="bi bi-skip-end-fill text-2xl" onClick={next}></i>
          </div>

          <div className=" pt-1 h-10 w-10 rounded-full hover:bg-slate-500 flex justify-center items-center cursor-pointer">
            <i
              className={`bi text-[22px] ${
                !isRepeat ? "bi-repeat" : "bi-repeat-1 text-[#f03d7f]"
              }`}
              onClick={() => setIsRepeat(!isRepeat)}
            ></i>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <p>
            {String(time.currentTime.minute).padStart(2, "0")}:
            {String(time.currentTime.second).padStart(2, "0")}
          </p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-[60vw]  max-w-[500px] bg-slate-500 rounded-full cursor-pointer flex flex-row"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-white rounded-full "
            />
          </div>
          <p>
            {String(time.totalTime.minute).padStart(2, "0")}:
            {String(time.totalTime.second).padStart(2, "0")}
          </p>
        </div>
      </div>

      <div>
        <div className="hidden lg:flex items-center gap-2 opacity-75">
          <i
            className={`bi ${volumeIcon} cursor-pointer text-2xl flex items-center justify-center`}
            onClick={() => handlerVolumeIcon()}
          ></i>
          <div
            ref={volumeBg}
            onClick={volumeSong}
            className="w-[5vw] max-w-[78px] bg-slate-500 h-1 rounded relative cursor-pointer"
          >
            <hr
              ref={volumeBar}
              className="h-1 border-none bg-white rounded-full"
              style={{ width: `${volumePercent}%` }}
            />
            {/* Nút tròn trắng */}
            <div
              className="w-[10px] h-[10px] absolute top-1/2 transform -translate-y-1/2 bg-white rounded-full"
              style={{
                left: `calc(${volumePercent}% - 5px)`,
              }}
            ></div>
          </div>
          <i
            className={`bi bi-music-note-list ${
              isShowListPlay && "text-[#f03d7f]"
            } text-lg  cursor-pointer  border-l-2 border-gray-500 transition duration-300 pl-4`}
            // title="Show playNow Playing List"
            onClick={() => setIsShowListPlay(!isShowListPlay)}
          ></i>
        </div>
      </div>
    </div>
  ) : null;
};

export default Player;
