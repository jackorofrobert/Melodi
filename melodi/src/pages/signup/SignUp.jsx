import React, { useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../validate/login_register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loading from "../loading/Loading";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    roles: "66fbd508107a3d7571bf5570",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validate = (v) => {
    if (!validateName(v.username)) {
      toast.error("Login name must be greater than 3 characters");
      return false;
    }

    if (!validateEmail(v.email)) {
      toast.error("Invalid email");
      return false;
    }
    if (!validatePassword(v.password)) {
      toast.error(
        "Password must contain numbers and special characters and must be longer than 6 characters!!!"
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validate(value)) {
        const response = await axios.post(
          `http://localhost:8000/api/user/register`,
          value
        );
        if (response.data && response.data.success) {
          setLoading(true);
        } else {
          toast.error(response.data.message || "Sign in failed!");
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Sign up failed!");
      } else {
        toast.error("Something went wrong, please try again.");
      }
    }
  };

  return loading ? (
    <Loading
      time={3000}
      notification="Thank you for registering an account, please log in to use the Melodies website. !!!"
      route={"/login"}
      req={"sign-up"}
    />
  ) : (
    <div className="sign-up-container">
      <div className="sign-up-content">
        <div className="sign-up-header">
          <img src="./logo.svg" alt="Melodies Logo" className="sign-up-logo" />
          <h1 className="sign-up-title">Melodies</h1>
        </div>

        <form className="sign-up-form" onSubmit={handleSubmit}>
          <div className="sign-up-back">
            <i
              className="bi bi-arrow-left"
              onClick={() => {
                navigate(-1);
              }}
            ></i>
            <h1>Sign In To Continue</h1>
            <ToastContainer />
          </div>

          <input
            type="text"
            className="sign-up-input no-group"
            placeholder="Name"
            name="username"
            onChange={(e) =>
              setValue({ ...value, [e.target.name]: e.target.value })
            }
          />

          <input
            type="email"
            className="sign-up-input no-group"
            placeholder="E-Mail"
            name="email"
            onChange={(e) =>
              setValue({ ...value, [e.target.name]: e.target.value })
            }
          />

          <div className="sign-up-password-group">
            <input
              type={showPassword ? "password" : "text"}
              className="sign-up-password-input"
              placeholder="Password"
              name="password"
              onChange={(e) =>
                setValue({ ...value, [e.target.name]: e.target.value })
              }
            />
            <i
              className={`${
                showPassword ? "bi bi-eye-slash" : "bi bi-eye"
              } sign-up-password-toggle`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>

          <div className="sign-up-button-container">
            <button type="submit" className="sign-up-btn">
              Create an account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
