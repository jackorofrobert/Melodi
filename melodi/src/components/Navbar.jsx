import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLogin, infoUser, logout, setPageInfo } = useContext(PlayerContext);
  const location = useLocation(); // Lấy thông tin vị trí hiện tại của URL

  // Kiểm tra xem "playlist" có trong đường dẫn URL không
  let hasAbout = location.pathname.includes("about");
  let hasContact = location.pathname.includes("contact");
  let hasPremium = location.pathname.includes("premium");
  return (
    <div className="mx-5">
      <div className="w-full flex justify-between items-center font-semibold ">
        <div className="flex items-center gap-2">
          <img
            onClick={() => navigate(-1, { replace: true })}
            className="w-8 bg-slate-600 p-2 rounded-2xl cursor-pointer hover:bg-slate-500"
            src={assets.arrow_left}
            alt=""
          />
          <img
            onClick={() => navigate(1, { replace: true })}
            className="w-8 bg-slate-600 p-2 rounded-2xl cursor-pointer hover:bg-slate-500"
            src={assets.arrow_right}
            alt=""
          />
        </div>
        <div className="flex items-center gap-4">
          {/* <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block">
            Explore Premium
          </p>
          <p className="bg-black py-1 px-3 rounded-2xl text-[15px">
            Install App
          </p> */}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 ">
        {/* <!-- Thanh tìm kiếm --> */}
        <div className="flex items-center bg-slate-600 rounded-2xl h-10 w-1/2">
          <img
            src={assets.search_icon}
            alt="search"
            className="h-6 pl-3 cursor-pointer"
          />
          <input
            className="bg-slate-600 text-white placeholder-gray-400 rounded-r-2xl w-full h-full pl-2 focus:outline-none"
            type="text"
            placeholder="Search For Musics, Artists, Albums..."
          />
        </div>

        {/* <!-- Các mục điều hướng --> */}
        <div className="flex gap-4">
          <p
            className={` text-white text-xl px-4 py-2 rounded-2xl crsor-pointer ${
              hasAbout ? "bg-gray-700" : "hover:bg-gray-700"
            }  transition-all duration-300`}
            onClick={() => navigate("/about")}
          >
            About
          </p>
          <p
            className={`text-white text-xl px-4 py-2 rounded-2xl cursor-pointer ${
              hasContact ? "bg-gray-700" : "hover:bg-gray-700"
            } transition-all duration-300`}
            onClick={() => navigate("/contact")}
          >
            Contact
          </p>
          <p
            className={`text-white text-xl px-4 py-2 rounded-2xl cursor-pointer ${
              hasPremium ? "bg-gray-700" : "hover:bg-gray-700"
            } transition-all duration-300`}
            onClick={() => navigate("/premium")}
          >
            Premium
          </p>
        </div>

        {/* <!-- Nút đăng nhập và đăng ký --> */}
        {isLogin ? (
          // <div>
          <div className="group flex justify-center items-center relative w-24 ">
            <div className="font-semibold text-xl text-white w-14 h-14 uppercase rounded-full flex items-center justify-center border-white">
              <img
                src={
                  infoUser?.profile_image
                    ? infoUser?.profile_image
                    : "https://res.cloudinary.com/dr3f3acgx/image/upload/v1724351609/duxt59vn98gdxqcllctt.jpg"
                }
                alt="Profile Image"
                className="w-14 h-14 object-cover rounded-full"
              />
            </div>
            <div className="hidden z-50 absolute top-[60px] right-[20px] flex-col w-72 max-w-80 bg-[#744a65] rounded-lg group-hover:flex p-2">
              <div className="flex justify-start items-center gap-2 text-white border-b-[1px] pb-1 mb-2">
                <img
                  src={
                    infoUser?.profile_image
                      ? infoUser?.profile_image
                      : "https://res.cloudinary.com/dr3f3acgx/image/upload/v1724351609/duxt59vn98gdxqcllctt.jpg"
                  }
                  alt="Profile Image"
                  className="h-16 w-16 object-cover rounded-full"
                />
                <div>
                  <p className="text-white text-lg font-bold">
                    {infoUser?.username}
                  </p>
                  <p className="text-white text-sm w-12 bg-gray-400 px-2 rounded-lg">
                    {" "}
                    Basic
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-2 text-white border-b-[1px] pb-1 mb-2">
                <p className="capitalize font-bold">personal</p>
                <div
                  className=" grid grid-cols-[0.5fr_4fr] items-center gap-0 h-10 pl-5 hover:bg-[#b16092] rounded-lg hover:text-white cursor-pointer"
                  onClick={() => setPageInfo(true)}
                >
                  <i class="bi bi-pencil-square text-xl text-gray-200 hover:text-white"></i>
                  <p className="text-gray-200">Update personal information</p>
                </div>
                <div
                  className=" grid grid-cols-[0.5fr_4fr] items-center gap-0 h-10 pl-5 hover:bg-[#b16092] rounded-lg hover:text-white cursor-pointer"
                  // onClick={() => handleAddToLibrary(id)}
                >
                  <i class="bi bi-trash3 text-xl text-gray-200 hover:text-white"></i>
                  <p className="text-gray-200">Delete account</p>
                </div>
              </div>

              <div
                className=" grid grid-cols-[0.5fr_3fr] items-center gap-0 h-10 pl-5 hover:bg-[#b16092] rounded-lg hover:text-white cursor-pointer"
                onClick={() => logout()}
              >
                <i className="bi  bi-box-arrow-right text-xl hover:text-white"></i>
                <p className="">Logout</p>
              </div>
            </div>
          </div>
        ) : (
          // </div>
          <div className="flex gap-4">
            <button
              className="bg-black text-pink-500 font-bold py-1 px-8 rounded-xl hover:bg-slate-900 hover:text-pink-400"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="bg-pink-500 text-black font-bold py-1 px-4 border-2 border-pink-300 rounded-xl hover:bg-pink-600 hover:text-black"
              onClick={() => navigate("/sign-up")}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
