import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
// import { albumsData } from "../assets/assets";
import AlbumItem from "../components/AlbumItem";
// import { songsData } from "../assets/assets";
import SongItem from "../components/SongItem";
import { PlayerContext } from "../context/PlayerContext";
import { useContext } from "react";
import Slider from "../components/Slider";
import TrendSongTable from "../components/TrendSongTable";
import ArtistItem from "../components/ArtistItem";
import { useLocation, useNavigate } from "react-router-dom";

const DisplayHome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [topAlbums, setTopAlbums] = useState([]);
  const { songsData, albumsData, songsDataWeekly, songsDataNew, artistsData } =
    useContext(PlayerContext);

  useEffect(() => {
    const getTopAlbums = async () => {
      const topAlbumsList = await albumsData
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);
      setTopAlbums(topAlbumsList);
    };

    getTopAlbums();
  }, [albumsData]);

  useEffect(() => {
    // Kiểm tra nếu URL chứa "#vitri"
    if (location.hash === "#1") {
      const vitriElement = document.getElementById("1");
      if (vitriElement) {
        vitriElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <>
      <Navbar />
      <div id="1"></div>
      <div className="mb-4">
        <Slider />
      </div>
      {/* Weekly Top Songs */}
      <div className="my-10 ml-5">
        <h1 className="my-5 font-bold text-3xl capitalize">
          Weekly Top <span className="text-[#EE10B0]">Songs</span>
        </h1>
        <div className="flex overflow-auto gap-4 ">
          <div className="flex overflow-auto gap-4">
            {songsDataWeekly.map((item, index) => (
              <SongItem
                key={index}
                name={item.title}
                artist={item.artist.username}
                id={item._id}
                image={item.image}
              />
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

      {/* New Release Songs */}
      <div className="my-10 ml-5">
        <h1 className="my-5 font-bold text-3xl capitalize">
          New Release <span className="text-[#EE10B0]">Songs</span>
        </h1>
        <div className="flex overflow-auto gap-4">
          <div className="flex overflow-auto gap-4">
            {songsDataNew.slice(0, 6).map((item, index) => (
              <SongItem
                key={index}
                name={item.title}
                // desc={item.desc}
                artist={item.artist.username}
                id={item._id}
                image={item.image}
              />
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

      {/* Trendinge Songs */}
      <div className="my-10 ml-5">
        <h1 className="font-bold text-3xl capitalize">
          Trending <span className="text-[#EE10B0]">Songs</span>
        </h1>
        <TrendSongTable />
      </div>

      {/* List Artist */}
      <div className="my-10 ml-5">
        <h1 className="my-5 font-bold text-3xl capitalize">
          Popular <span className="text-[#0E9EEF]">Artists</span>
        </h1>
        <div className="flex overflow-auto gap-4">
          {artistsData.slice(0, 8).map((item, index) => (
            <ArtistItem
              key={index}
              artist={item.username}
              image={item.profile_image}
              id={item._id}
            />
          ))}
          <div
            className="flex justify-center flex-col text-white ml-4 hover:text-[#EE10B0]"
            onClick={() => navigate("/artists/#4")}
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

      {/* New Albums */}
      <div className="my-10 ml-5">
        <h1 className="my-5 font-bold text-3xl capitalize">
          New <span className="text-[#0E9EEF]">Albums</span>
        </h1>
        <div className="flex overflow-auto gap-4">
          {topAlbums?.map((item, index) => (
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
            onClick={() => navigate("/albums/#3")}
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
    </>
  );
};

export default DisplayHome;
