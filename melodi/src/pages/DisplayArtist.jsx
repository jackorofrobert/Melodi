import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import ArtistItem from "../components/ArtistItem";
import { PlayerContext } from "../context/PlayerContext";
import { useLocation, useNavigate } from "react-router-dom";
import AlbumItem from "../components/AlbumItem";

const DisplayArtist = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { artistsData, playlistsPublicData, albumsData } =
    useContext(PlayerContext);

  useEffect(() => {
    // Kiểm tra nếu URL chứa "#vitri"
    if (location.hash === "#4") {
      const vitriElement = document.getElementById("4");
      if (vitriElement) {
        vitriElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div>
      {/* Navbar */}
      <Navbar />
      <div id="4"></div>
      {/* Artists Section */}
      <div className="my-10 mx-8">
        {" "}
        <div>
          <h1 className="my-5 font-bold text-2xl capitalize">
            Collection of <span className="text-[#0E9EEF]">Famous Artists</span>
          </h1>
        </div>
        {/* Grid of Artists */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
          {artistsData.map((item, index) => (
            <ArtistItem
              key={index}
              artist={item.username}
              image={item.profile_image}
              id={item._id}
            />
          ))}
        </div>
        {/* View All Section */}
      </div>
      <div className="my-10 ml-5">
        <h1 className="my-5 font-bold text-3xl capitalize">
          Favorite <span className="text-[#EE10B0]">Playlist</span>
        </h1>
        <div className="flex overflow-auto gap-4">
          <div className="flex overflow-auto gap-4">
            {playlistsPublicData.slice(0, 6).map((item, index) => (
              <div
                className="rounded-lg w-[280px] cursor-pointer h-full flex flex-col items-center justify-center bg-black bg-opacity-50"
                key={item._id}
                onClick={() => navigate(`/playlist/${item._id}`)}
              >
                <img
                  src={item.image || assets.album_default}
                  alt={item.name}
                  className="w-full h-[80%] object-cover rounded-lg"
                />
                <div className="flex flex-row items-center justify-between w-full px-2 mt-2 h-[20%] ">
                  <h1 className="text-lg font-bold text-white text-center">
                    {item.name}
                  </h1>
                  <i className="bi bi-music-note-list text-white"></i>
                </div>
                {/* <p>{item.description}</p> */}
              </div>
            ))}
            <div className="flex justify-center flex-col text-white ml-4 hover:text-[#EE10B0]">
              <span className="w-16 h-16 bg-[#1E1E1E] rounded-full flex items-center justify-center cursor-pointer text-white text-3xl hover:bg-[#EE10B0]">
                +
              </span>
              <p className="text-[18px] font-bold cursor-pointer w-[5rem]">
                View All
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-10 ml-5">
        <h1 className="my-5 font-bold text-3xl capitalize">
          Top <span className="text-[#0E9EEF]">Albums</span>
        </h1>
        <div className="flex overflow-auto gap-4">
          {albumsData.slice(0, 6).map((item, index) => (
            <AlbumItem
              key={index}
              name={item.name}
              artist={item.artist.map((artist) => artist.username).join(", ")}
              id={item._id}
              image={item.image}
            />
          ))}
          <div
            className="flex justify-center flex-col text-white ml-4 hover:text-[#EE10B0]"
            onClick={() => navigate("/albums")}
          >
            <span className="w-16 h-16 bg-[#1E1E1E] rounded-full flex items-center justify-center cursor-pointer text-white text-3xl hover:bg-[#EE10B0]">
              +
            </span>
            <p className="text-[18px] font-bold cursor-pointer w-[5rem]">
              View All
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayArtist;
