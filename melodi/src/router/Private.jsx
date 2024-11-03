import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Navigate } from "react-router-dom";
const Private = ({ children }) => {
  const { isLogin } = useContext(PlayerContext);

  return isLogin ? children : <Navigate to="/login" replace />;
};

export default Private;
