import React, { useContext, useEffect } from "react";
import "./loading.css";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../../context/PlayerContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Loading = ({ time, req, notification, route }) => {
  const navigate = useNavigate();
  const { setIsLogin } = useContext(PlayerContext);

  useEffect(() => {
    if (time) {
      if (req === "login") {
        toast.success(notification);
        setTimeout(() => {
          setIsLogin(true);
        }, time);
      }
      if (req === "sign-up") {
        toast.success(notification);
        setTimeout(() => {
          navigate(route);
        }, time);
      }
    }
  }, [time, notification]);

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <img src="./logo.svg" alt="Melodies Logo" className="logo" />
        <div>
          <div className="loading-text">Loading</div>
          <img
            src="./loading.svg"
            alt="Loading Spinner"
            className="loading-spinner"
          />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Loading;
