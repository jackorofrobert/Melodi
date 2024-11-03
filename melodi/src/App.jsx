import React, { useContext, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Display from "./pages/Display";
import { PlayerContext } from "./context/PlayerContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/Login";

import AddPlaylist from "./components/AddPlaylist";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Private from "./router/Private";
import Public from "./router/Public";
import Loading from "./pages/loading/Loading";
import SignUp from "./pages/signup/SignUp";
import PlayListNow from "./components/PlayListNow";
import DisplayInfo from "./pages/DisplayInfo";

function App() {
  const { audioRef, track, songsData, addPlaylist, pageInfo } =
    useContext(PlayerContext);

  useEffect(() => {
    console.log("addPlaylist", addPlaylist);
  }, [addPlaylist]);
  return (
    <>
      <div className="h-screen bg-black">
        <Routes>
          <Route
            path="/*"
            element={
              <>
                {songsData.length !== 0 ? (
                  <>
                    <div className={`${track ? "h-[88%]" : "h-full"} flex`}>
                      <Sidebar />
                      <Display />
                    </div>
                    <ToastContainer />
                    {track && <Player />}
                    <PlayListNow />
                    {addPlaylist.on && (
                      <Private>
                        <AddPlaylist />
                      </Private>
                    )}
                    {pageInfo && (
                      <Private>
                        <DisplayInfo />
                      </Private>
                    )}
                  </>
                ) : null}
              </>
            }
          />
          <Route element={<Public />}>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            {/* <Route path="/loading" element={<Loading />} /> */}
          </Route>
        </Routes>
        <audio
          ref={audioRef}
          src={track ? track.audio : ""}
          preload="auto"
        ></audio>
      </div>
    </>
  );
}

export default App;
