import React, { useEffect, useRef } from "react";
import DisplayHome from "./DisplayHome";
import { Route, Routes, useLocation } from "react-router-dom";
import DisplayAlbum from "./DisplayAlbum";
// import { albumsData } from "../assets/assets";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import Footer from "../components/Footer";
import DisplayYourPlaylist from "./DisplayYourPlaylist";
import DisplayYourPlaylistId from "./DisplayYourPlaylistId";
import DisplayDiscover from "./DisplayDiscover";
import DisplayPageAlbum from "./DisplayPageAlbum";
import DisplayArtist from "./DisplayArtist";
import DisplayArtistId from "./DisplayArtistId";
import DisplayPlaylistFavorite from "./DisplayYourPlaylistFavorite";
import DisplayAbout from "./DisplayAbout";
import DisplayContact from "./DisplayContact";
import DisplayPremium from "./DisplayPremium";

const Display = () => {
  const { albumsData, playlistsData } = useContext(PlayerContext);

  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const isPlaylist = location.pathname.includes("playlist");
  const isPlaylistYour = location.pathname.includes("your-playlist");
  // const albumId = isAlbum ? location.pathname.slice(-1) : "";
  const albumId = isAlbum ? location.pathname.split("/").pop() : "";
  const playlistId = isPlaylist ? location.pathname.split("/").pop() : "";

  const playlistYourId = isPlaylistYour
    ? location.pathname.split("/").pop()
    : "";
  // const bgColor = albumsData[Number(albumId)].bgColor;
  const bgColor =
    isAlbum && albumsData.length > 0
      ? albumsData.find((x) => x._id === albumId)?.bg_colour
      : "#121212";
  // console.log("bg",bgColor)

  useEffect(() => {
    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColor}, #3f3737)`;
    } else {
      displayRef.current.style.background = `#412C3A`;
    }
  });
  return (
    <div ref={displayRef} className="w-[100%] overflow-auto lg:w-[85%]">
      <div className="w-[100%] mx-5 px-6 pt-4 rounded text-white overflow-auto lg:ml-0">
        {albumsData.length > 0 ? (
          <Routes>
            <Route path="/" element={<DisplayHome />} />
            <Route path="/album/:id" element={<DisplayAlbum />} />
            <Route path="/your-playlist">
              <Route index element={<DisplayYourPlaylist />} />
              <Route path="favorite" element={<DisplayPlaylistFavorite />} />
              <Route
                path=":id"
                element={
                  <DisplayYourPlaylistId
                    data={playlistsData.find((x) => x._id === playlistYourId)}
                    show={true}
                  />
                }
              />
            </Route>
            <Route
              path="/playlist/:id"
              element={
                <DisplayYourPlaylistId
                  data={playlistsData.find((x) => x._id === playlistId)}
                  show={false}
                />
              }
            />

            <Route path="/discover" element={<DisplayDiscover />} />
            <Route path="/albums" element={<DisplayPageAlbum />} />
            <Route path="/artists">
              <Route index element={<DisplayArtist />} />
              <Route path=":id" element={<DisplayArtistId />} />
            </Route>
            <Route path="/about" element={<DisplayAbout />} />
            <Route path="/contact" element={<DisplayContact />} />
            <Route path="/premium" element={<DisplayPremium />} />
          </Routes>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default Display;
