import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Navigate, Outlet } from "react-router-dom";

const Public = () => {
  const { isLogin } = useContext(PlayerContext);

  return !isLogin ? <Outlet /> : <Navigate to="/" replace />;
};

export default Public;
