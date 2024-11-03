import React, { useEffect, useState, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./login.css";
import { validateEmail, validatePassword } from "../../validate/login_register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loading from "../loading/Loading";
import { PlayerContext } from "../../context/PlayerContext";
import { auth } from "../../config/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Add this import
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Hàm xử lý khi thay đổi giá trị trong input
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const validate = async (v) => {
    if (!validateEmail(v.email)) {
      toast.error("Invalid email");
      return false;
    }
    if (!validatePassword(v.password)) {
      toast.error("Invalid password");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu đầu vào
    const isValid = await validate(value);
    if (!isValid) return;

    // Lấy dữ liệu history từ localStorage và kiểm tra giá trị
    let historySong;
    try {
      historySong = JSON.parse(localStorage.getItem("HistorySong")) || [];
    } catch (error) {
      // Nếu JSON không hợp lệ hoặc không có dữ liệu, sử dụng mảng rỗng
      historySong = [];
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/user/login`,
        value
      );

      if (response.data && response.data.success) {
        // Lưu token vào localStorage
        localStorage.setItem("token", response.data.token);

        // Nếu có dữ liệu lịch sử nghe từ server
        const serverHistorySongs = response?.data?.historyListenSong || [];

        // Gộp dữ liệu từ localStorage và server, tránh trùng lặp
        const combinedHistory = [...historySong, ...serverHistorySongs].filter(
          (song, index, self) =>
            index === self.findIndex((s) => s._id === song._id)
        );

        // Lưu lại lịch sử đã được gộp vào localStorage dưới dạng JSON
        localStorage.setItem("HistorySong", JSON.stringify(combinedHistory));
        setLoading(true);
      } else {
        toast.error(response.data.message || "Login failed!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider(); //mở google của firebase
      const result = await signInWithPopup(auth, provider);

      // Send the Firebase token to your backend
      const firebaseToken = await result.user.getIdToken(); //lấy token của firebase

      const response = await axios.post(
        `http://localhost:8000/api/user/firebase-login`,
        { firebaseToken }
      );

      if (response.data && response.data.success) {
        // Lưu token vào localStorage
        localStorage.setItem("token", response.data.token);

        // Handle history merging similar to regular login
        let historySong = JSON.parse(localStorage.getItem("HistorySong")) || [];
        const serverHistorySongs = response?.data?.historyListenSong || [];
        const combinedHistory = [...historySong, ...serverHistorySongs].filter(
          (song, index, self) =>
            index === self.findIndex((s) => s._id === song._id)
        );

        localStorage.setItem("HistorySong", JSON.stringify(combinedHistory));
        setLoading(true);
      }
    } catch (error) {
      toast.error("Google login failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loading time={3000} notification={"Login success!!!"} req={"login"} />
      ) : (
        <div className="login">
          <div className="login-content">
            <div className="login-main">
              <div className="login-top">
                <img src="./logo.svg" alt="Melodies Logo" />
                <h1>Molodies</h1>
              </div>
              <div className="login-form">
                <form onSubmit={handleSubmit}>
                  <h1>Login To Continue</h1>
                  <ToastContainer />

                  <input
                    type="text"
                    name="email"
                    className="form-control email"
                    placeholder="E-Mail"
                    onChange={handleChange}
                    autoComplete="email"
                  />
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                      autoComplete="password"
                    />
                    <i
                      className={`${
                        showPassword ? "bi bi-eye-slash" : "bi bi-eye"
                      } input-group-text`}
                      onClick={togglePasswordVisibility}
                    ></i>
                  </div>
                  <div className="forgot-password">
                    <span>
                      <h4>Forgot password</h4>
                      <i className="bi bi-chevron-compact-right"></i>
                    </span>
                    <button type="submit">Login</button>
                  </div>
                </form>
              </div>
              <div className="login-bottom">
                <div onClick={handleGoogleLogin} style={{ cursor: "pointer" }}>
                  <img src="./devicon_google.svg" alt="Google Logo" />
                  <p>Google Login</p>
                </div>
                <div>
                  <img src="./logos_facebook.svg" alt="Facebook Logo" />
                  <p>Facebook</p>
                </div>
              </div>
            </div>
            <div className="login-sign">
              <span>
                <h2>Don't Have An Account</h2>
                <p>Sign Up Here</p>
              </span>
              <div className="sign-up">
                <Link to={"/sign-up"}>
                  <h4>Sign Up</h4>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
