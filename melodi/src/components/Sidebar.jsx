import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Lấy thông tin vị trí hiện tại của URL

  // Kiểm tra xem "playlist" có trong đường dẫn URL không
  let hasPlaylist = location.pathname.includes("your-playlist");
  let hasAlbums = location.pathname.includes("albums");
  let hasArtist = location.pathname.includes("artists");
  let hasDiscover = location.pathname.includes("discover");
  let hasFavorite = location.pathname.includes("favorite");

  const { openAddPlaylist, logout, isLogin } = useContext(PlayerContext);

  return (
    <div className="bg-[#0E1920] min-w-[16%] h-full p-2 pb-0 flex-col gap-3 text-white lg:flex rounded overflow-y-auto">
      <div className=" mt-4 h-auto flex flex-col justify-center items-center py-2">
        {/* <img className="w-24 h-24 " src={assets.logo} alt="Molodies Logo" /> */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent text-center">
          Melodies
        </h1>
      </div>
      <div className=" rounded flex flex-col justify-around gap-3">
        {/* Menu */}
        <div className="flex flex-col gap-2">
          <div>
            <h3 className="pl-8 text-sm text-[#EE10B0] ">Menu</h3>
          </div>{" "}
          <div
            onClick={() => {
              navigate("/#1", { replace: true });
            }}
            className={`flex text-xl items-center gap-3 pl-8 cursor-pointer rounded-lg text-gray-400
                    border-2 ${
                      !hasAlbums && !hasArtist && !hasDiscover && !hasPlaylist
                        ? "border-[#FF00E5] shadow-[0px_0px_10px_5px_#FF00E5]"
                        : "border-transparent"
                    } 
                    hover:border-[#FF00E5] hover:shadow-[0px_0px_10px_5px_#FF00E5]`}
          >
            <img className="w-6" src={assets.home_icon} alt="" />
            <p className="font-semibold text-white">Home</p>
          </div>
          <div
            onClick={() => {
              navigate("/discover/#2");
            }}
            className={`flex text-xl items-center gap-3 pl-8 cursor-pointer rounded-lg text-gray-400 
                    border-2 ${
                      hasDiscover
                        ? "border-[#FF00E5] shadow-[0px_0px_10px_5px_#FF00E5]"
                        : "border-transparent"
                    } 
                    hover:border-[#FF00E5] hover:shadow-[0px_0px_10px_5px_#FF00E5]`}
          >
            <img className="w-6" src={assets.discover_icon} alt="" />
            <p className="font-semibold text-white">Discover</p>
          </div>
          <div
            onClick={() => {
              navigate("/albums/#3");
            }}
            className={`flex text-xl items-center gap-3 pl-8 cursor-pointer rounded-lg text-gray-400 
                    border-2 ${
                      hasAlbums
                        ? "border-[#FF00E5] shadow-[0px_0px_10px_5px_#FF00E5]"
                        : "border-transparent"
                    } 
                    hover:border-[#FF00E5] hover:shadow-[0px_0px_10px_5px_#FF00E5]`}
          >
            <img className="w-6" src={assets.albums_icon} alt="" />
            <p className="font-semibold text-white">Albums</p>
          </div>
          <div
            onClick={() => {
              navigate("/artists/#4", { replace: true });
            }}
            className={`flex text-xl items-center gap-3 pl-8 cursor-pointer rounded-lg text-gray-400 
                    border-2 ${
                      hasArtist
                        ? "border-[#FF00E5] shadow-[0px_0px_10px_5px_#FF00E5]"
                        : "border-transparent"
                    } 
                    hover:border-[#FF00E5] hover:shadow-[0px_0px_10px_5px_#FF00E5]`}
          >
            <img className="w-6" src={assets.artist_icon} alt="" />
            <p className="font-semibold text-white">Artists</p>
          </div>
        </div>
        {/* Library */}
        {/* <div className="flex flex-col gap-2">
          <div>
            <h3 className="pl-8 text-base text-[#EE10B0] ">Library</h3>
          </div>{" "}
          <div
            onClick={() => {
              setSelected("RecentlyAdded");
              navigate("/library", { replace: true });
            }}
            className={`flex text-xl items-center gap-3 pl-8 cursor-pointer rounded-lg text-gray-400 
                    border-2 ${
                      selected === "RecentlyAdded"
                        ? "border-[#FF00E5] shadow-[0px_0px_10px_5px_#FF00E5]"
                        : "border-transparent"
                    } 
                    hover:border-[#FF00E5] hover:shadow-[0px_0px_10px_5px_#FF00E5]`}
          >
            <img className="w-6" src={assets.oclock_icon} alt="" />
            <p className="font-semibold text-white">Recently Added</p>
          </div>
          <div
            onClick={() => setSelected("Mostplayed")}
            className={`flex  text-xl items-center gap-3 pl-8 cursor-pointer rounded-lg text-gray-400 
                    border-2 ${
                      selected === "Mostplayed"
                        ? "border-[#FF00E5] shadow-[0px_0px_10px_5px_#FF00E5]"
                        : "border-transparent"
                    } 
                    hover:border-[#FF00E5] hover:shadow-[0px_0px_10px_5px_#FF00E5]`}
          >
            <img className="w-6" src={assets.oclockXoay_icon} alt="" />
            <p className="font-semibold text-white">Most played</p>
          </div>
        </div> */}
        {/* Playlist and favorite */}
        <div className="flex flex-col gap-2">
          <div>
            <h3 className="pl-8 text-base text-[#EE10B0] ">
              Playlist and favorite
            </h3>
          </div>{" "}
          <div
            onClick={() => {
              navigate("/your-playlist/favorite/#5", { replace: true });
            }}
            className={`flex text-xl items-center gap-3 pl-8 cursor-pointer rounded-lg text-gray-400
                    border-2 ${
                      hasFavorite
                        ? "border-[#FF00E5] shadow-[0px_0px_10px_5px_#FF00E5]"
                        : "border-transparent"
                    } 
                    hover:border-[#FF00E5] hover:shadow-[0px_0px_10px_5px_#FF00E5]`}
          >
            <img className="w-6" src={assets.listSong_icon} alt="" />
            <p className="font-semibold text-white ">Your favorites</p>
          </div>
          <div
            onClick={() => {
              navigate("/your-playlist/#6");
            }}
            className={`flex text-xl items-center gap-3 pl-8 cursor-pointer rounded-lg text-gray-400 
                    border-2 ${
                      hasPlaylist && !hasFavorite
                        ? "border-[#FF00E5] shadow-[0px_0px_10px_5px_#FF00E5]"
                        : "border-transparent"
                    } 
                    hover:border-[#FF00E5] hover:shadow-[0px_0px_10px_5px_#FF00E5]`}
          >
            <img className="w-6" src={assets.ph_playlist_icon} alt="" />
            <p className="font-semibold text-white">Your playlist</p>
          </div>
          <div
            onClick={() => {
              openAddPlaylist(null, null, null);
            }}
            className={`flex text-xl items-center gap-3 pl-8 cursor-pointer rounded-lg text-gray-400 
                    border-2 
                    border-transparent
                  
                    hover:border-[#FF00E5] hover:shadow-[0px_0px_10px_5px_#FF00E5]`}
          >
            <img className="w-6" src={assets.addPlaylist_icon} alt="" />
            <p className="font-semibold text-[#0E9EEF]">Add playlist</p>
          </div>
        </div>
        {/* general */}
        {isLogin && (
          <div className="flex flex-col gap-2">
            <div>
              <h3 className="pl-8 text-base text-[#EE10B0] ">General</h3>
            </div>{" "}
            {/* <div
              onClick={() => setSelected("Setting")}
              className={`flex text-xl items-center gap-3 pl-8 cursor-pointer rounded-lg text-gray-400 
                    border-2 ${
                      selected === "Setting"
                        ? "border-[#FF00E5] shadow-[0px_0px_10px_5px_#FF00E5]"
                        : "border-transparent"
                    } 
                    hover:border-[#FF00E5] hover:shadow-[0px_0px_10px_5px_#FF00E5]`}
            >
              <img className="w-6" src={assets.setting_icon} alt="" />
              <p className="font-semibold text-white">Setting</p>
            </div> */}
            <div
              onClick={() => {
                logout();
              }}
              className="flex text-xl items-center gap-3 pl-8 cursor-pointer rounded-lg text-gray-400 
                    border-2 border-transparent
                  
                    hover:border-[#FF00E5] hover:shadow-[0px_0px_10px_5px_#FF00E5]"
            >
              <img className="w-6" src={assets.logOut_icon} alt="" />
              <p className="font-semibold text-[#EE10B0]">Logout</p>
            </div>
          </div>
        )}
        {/* <div className="bg-[#121212] rounded">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img className="w-8" src={assets.stack_icon} alt="" />
              <p className="font-semibold">Your Library</p>
            </div>
            <div className="flex items-center gap-3">
              <img className="w-5" src={assets.arrow_icon} alt="" />
              <img className="w-5" src={assets.plus_icon} alt="" />
            </div>
          </div>
          <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
            <h1>Create your first playlist</h1>
            <p className="font-light">it's easy we will help you</p>
            <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
              Create Playlist
            </button>
          </div>
          <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
            <h1>Let's findsome podcasts to follow</h1>
            <p className="font-light">we'll keep update on new episodes</p>
            <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
              Brow podcasts
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
