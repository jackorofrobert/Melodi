import React, { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddPlaylist = () => {
  const navigate = useNavigate();
  const [shuffle, setShuffle] = useState(false);
  const [publicPl, setPublicPl] = useState(false);
  const [value, setValue] = useState({
    name: "",
    status: "",
  });
  const {
    closeAddPlaylist,
    infoLogin,
    addPlaylist,
    addInfoPlayList,
    editInfoPlayList,
  } = useContext(PlayerContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!value.name) {
      toast.error("Please enter a playlist name.");
      return;
    }

    // Cập nhật giá trị status trực tiếp
    const updatedValue = {
      ...value,
      status: publicPl ? "public" : "private",
    };

    if (!infoLogin || !infoLogin.token) {
      toast.error("Invalid token, please log in again.");
      return;
    }
    if (addPlaylist.name) {
      await editInfoPlayList(updatedValue);
    } else {
      await addInfoPlayList(updatedValue);
    }
  };

  const handleCloseModal = () => {
    closeAddPlaylist();
    setValue({ name: "", status: "" });
    setPublicPl(false);
    setShuffle(false);
  };

  useEffect(() => {
    if (addPlaylist.name) {
      setValue({
        ...value,
        name: addPlaylist.name,
        status: addPlaylist.status,
      });
      setPublicPl(addPlaylist.status === "public");
    }
  }, [addPlaylist]);

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative flex flex-col items-center gap-4 bg-[#642c52] text-white p-6 rounded-2xl shadow-lg w-[25%]">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
          onClick={handleCloseModal}
        >
          <i className="bi bi-x-lg text-xl"></i>
        </button>
        <h1 className="capitalize text-xl font-bold ">
          {addPlaylist.name ? "Edit playlist" : "Create playlist now"}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 w-full"
        >
          <input
            type="text"
            value={value.name}
            className="p-2 border border-gray-300 rounded-3xl focus:outline-none focus:border-blue-500 w-[100%] bg-[#522643] text-white"
            placeholder="Enter playlist name"
            name="name"
            onChange={(e) =>
              setValue({ ...value, [e.target.name]: e.target.value })
            }
          />
          <div className="flex items-center gap-4 w-[90%]">
            <div className="flex flex-col w-[80%]">
              <p className="font-semibold text-base">Public</p>
              <p className="text-sm text-gray-400">
                Everyone can see this playlist
              </p>
            </div>
            <i
              className={`bi bi-toggle-${
                publicPl ? "on text-white" : "off text-gray-300"
              } text-3xl  cursor-pointer hover:text-[#985182]`}
              onClick={() => setPublicPl(!publicPl)}
            ></i>
          </div>
          <div className="flex items-center gap-4 w-[90%]">
            <div className="flex flex-col w-[80%]">
              <p className="font-semibold text-base">Shuffle songs</p>
              <p className="text-sm text-gray-400">Always shuffle all songs</p>
            </div>
            <i
              className={`bi bi-toggle-${
                shuffle ? "on text-white" : "off text-gray-300"
              } text-3xl  cursor-pointer hover:text-[#985182] `}
              onClick={() => setShuffle(!shuffle)}
            ></i>
          </div>
          <button className="bg-[#985182] text-base text-white py-2 px-4 font-semibold hover:bg-[#844671] capitalize w-full rounded-3xl">
            {addPlaylist.name ? "Edit" : "Create new"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPlaylist;
