import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { PlayerContext } from "../context/PlayerContext";
import { validateEmail, validatePassword } from "../validate/login_register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const DisplayInfo = () => {
  const { infoUser, infoLogin, setPageInfo, getInfoUser } =
    useContext(PlayerContext);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    profile_image: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      setUserInfo({ ...userInfo, profile_image: file });
    }
  };

  const validate = async (v) => {
    if (!validateEmail(v.email)) {
      toast.error("Invalid email");
      return false;
    }
    if (v.password && !validatePassword(v.password)) {
      toast.error(
        "Password must contain at least 6 characters, must contain 1 number and special character"
      );
      return false;
    }

    if (!v.username) {
      toast.error("Username cannot be blank");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validate(userInfo);
    if (!isValid) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("username", userInfo.username);
      formData.append("email", userInfo.email);
      if (userInfo.password) formData.append("password", userInfo.password);

      if (imagePreview)
        formData.append("profile_image", userInfo.profile_image);

      const response = await axios.put(
        `http://localhost:8000/api/user/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${infoLogin?.token}`,
            // "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Account updated successfully!");
        await getInfoUser();
        setLoading(false);
        setPageInfo(false);
      } else {
        toast.error("Something went wrong!");
        setLoading(false);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      setLoading(false);
      console.error(error);
    }
    // Thực hiện gọi API để cập nhật thông tin người dùng ở đây
    console.log("Updating user info:", userInfo);
  };

  useEffect(() => {
    if (Object.keys(infoUser).length > 0) {
      setUserInfo((prev) => ({
        ...prev,
        username: infoUser.username,
        email: infoUser.email,
        profile_image: infoUser.profile_image,
      }));

      setImagePreview(infoUser.profile_image);
    }
  }, [infoUser]);
  return (
    <>
      <Navbar />
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="relative flex flex-col items-center gap-4 bg-[#662c54] text-white p-6 rounded-2xl shadow-lg ">
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
            onClick={() => setPageInfo(false)}
          >
            <i className="bi bi-x-lg text-xl"></i>
          </button>
          <h1 className="text-3xl font-bold text-white text-center mb-1">
            Personal Information
          </h1>
          {/* <ToastContainer /> */}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex flex-row gap-8 items-center">
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="relative flex justify-center items-center w-32 h-32 bg-gray-700 rounded-full overflow-hidden border-4 border-gray-500">
                  <input
                    type="file"
                    name="profile_image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    id="profile_image"
                  />
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile Preview"
                      className="w-32 h-32 object-cover"
                    />
                  ) : (
                    <span className="text-white text-sm font-medium">
                      Upload Image
                    </span>
                  )}
                </div>
                <p>Profile Image</p>
              </div>

              <div className="flex flex-col gap-4 w-2/3">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={userInfo.username}
                    onChange={handleChange}
                    required
                    className="w-full p-2 rounded-md border border-gray-600 bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleChange}
                    required
                    className="w-full p-2 rounded-md border border-gray-600 bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={userInfo.password}
                      onChange={handleChange}
                      className="w-full p-2 rounded-md border border-gray-600 bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <i
                      className={`${
                        showPassword ? "bi bi-eye-slash" : "bi bi-eye"
                      } input-group-text absolute right-2 top-3 text-gray-700`}
                      onClick={() => setShowPassword(!showPassword)}
                    ></i>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-blue-500 rounded-md hover:from-blue-500 hover:to-pink-500 transition duration-200"
            >
              {loading ? "..." : "Update Info"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DisplayInfo;
