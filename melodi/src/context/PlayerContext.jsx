import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  const volumeBg = useRef();
  const volumeBar = useRef();

  const [historySongList, setHistorySongList] = useState([]);

  const url = "http://localhost:8000";
  const navigate = useNavigate();
  const [addPlaylist, setAddPlaylist] = useState({
    on: false,
    name: "",
    status: "",
    id: "",
  });
  const [songsData, setSongsData] = useState([]);
  const [songsDataWeekly, setSongsDataWeekly] = useState([]);
  const [songsDataNew, setSongsDataNew] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [artistsData, setArtistsData] = useState([]);
  const [playlistsData, setPlaylistsData] = useState([]);
  const [playlistsYourData, setPlaylistsYourData] = useState([]);
  const [playlistsPublicData, setPlaylistsPublicData] = useState([]);
  const [libraryData, setLibraryData] = useState({});
  const [pageInfo, setPageInfo] = useState(false);
  // const [playlistId, setPlayListId] = useState({});

  //Dung để check login
  const [isLogin, setIsLogin] = useState(false);
  const [infoLogin, setInfoLogin] = useState({
    name: "",
    id: "",
    token: "",
  });
  const [infoUser, setInfoUser] = useState({});
  // Dùng đẻ check bài hát nào đang play
  const [checkSongPlay, setCheckSongPlay] = useState({
    isPlaying: false,
    id: "",
  });
  //Dung de lap bai hat
  const [isRepeat, setIsRepeat] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  //Hiển thị danh sách đang phát
  const [isShowListPlay, setIsShowListPlay] = useState(false);
  //Bài hát đang hát
  const [track, setTrack] = useState(songsData[0]);
  //ktra la song/album/playlist
  const [type, setType] = useState({
    type: "",
    id: "",
  });

  //Danh sách phát
  const [playListNow, setPlayListNow] = useState([]);
  const [infoPlayListNow, setInfoPlayListNow] = useState({
    name: "",
    status: "",
  });
  //Trạng thái bài hát: chạy/dừng/next/...
  const [playStatus, setPlayStatus] = useState(false);

  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  // const getPlayListById = (id) => {
  //   playlistsData.map((item) => {
  //     if (item._id === id) {
  //       setPlayListId(item);
  //     }
  //   });
  // };
  //

  //
  // ------------------------------------Function to open the AddPlaylist component
  const openAddPlaylist = (name, status, id) => {
    setAddPlaylist({
      ...addPlaylist,
      on: true,
      name: name,
      status: status,
      id: id,
    });
  };

  // ---------------------------------------Function to close the AddPlaylist component
  const closeAddPlaylist = () => {
    setAddPlaylist({ ...addPlaylist, on: false, name: "", status: "" }); // Reset the state if needed
  };

  //lấy ngẫu nhiên mảng
  const shuffleArray = async (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    // console.log("shuffleArray", array.slice(0, 6));
    return array.slice(0, 6);
  };

  const sortArray = async (array, sortBy = "createdAt") => {
    const topSongs = await array
      .sort((a, b) => b[sortBy] - a[sortBy])
      .slice(0, 10);
    // console.log("sortArray", array);
    return topSongs;
  };

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };
  // ---------------------add history,call API
  // const addHistoryListen = async (song) => {
  //   const check = historySong?.findIndex((item) => item._id === song._id);
  //   if (check > -1) {
  //     setHistorySongList((prev) => {
  //       return [song, ...prev.slice(0, check)];
  //     });
  //   } else {
  //     setHistorySongList((prev) => {
  //       return [song, ...prev];
  //     });
  //   }
  // };

  // useEffect(() => {
  //   localStorage.setItem("HistorySong", historySongList);
  // }, [historySongList]);

  // useEffect(() => {
  //   let historySong;
  //   try {
  //     historySong = JSON.parse(localStorage.getItem("HistorySong")) || [];

  //   } catch (error) {
  //     historySong = [];
  //   }
  //   setHistorySongList(historySong);
  // }, [isLogin]);

  // const putHistoryListener = async () => {
  //   try {
  //     const historyListenSong = localStorage.setItem(
  //       "HistorySong",
  //       historySongList
  //     );
  //     const response = await axios.put(
  //       `${url}/api/user/history`,
  //       historyListenSong,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${infoLogin.token}`, // Gửi token xác thực nếu cần
  //         },
  //       }
  //     );

  //     if (response.data.success) {
  //       console.log("Update history song successfull");
  //     } else {
  //       toast.error(
  //         response.data.message || "Failed to photo update to playlist."
  //       );
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       // Nếu API trả về mã lỗi
  //       if (error.response.status === 400) {
  //         toast.error(
  //           error.response.data.message || "Failed to photo update to library."
  //         );
  //       } else {
  //         toast.error("Error occurred while photo update library");
  //       }
  //     } else {
  //       console.error("Error while adding to library:", error);
  //       toast.error("Error occurred while adding to library");
  //     }
  //   }
  // };
  // ---------------

  const removeSongFromQueue = async (songId) => {
    setPlayListNow((prev) => {
      const updatedList = prev.filter((item) => item._id !== songId);
      return updatedList;
    });
  };

  const addSongToQueue = async (id) => {
    const findSong = await songsData.find((item) => id === item._id);
    if (!findSong) return; // Nếu không tìm thấy bài hát, thoát hàm

    // Lọc ra danh sách bài hát để loại bỏ bài hát đã tồn tại
    const updatedPlayList = playListNow.filter(
      (item) => item._id !== findSong._id
    );

    // Thêm bài hát mới vào danh sách
    setPlayListNow((prev) => [findSong, ...updatedPlayList]);
  };

  const addAlbumToQueue = async (albumid) => {
    const findAlbum = albumsData.find((item) => albumid === item._id);
    // console.log("findAlbum.songs", findAlbum.songs);
    if (!findAlbum || !findAlbum.songs || findAlbum.songs.length === 0) return;
    let data = {
      name: findAlbum?.name,
      status: "album",
    };
    setInfoPlayListNow(data);
    await playWithId(findAlbum?.songs[0]?._id);
    setPlayListNow(findAlbum?.songs);
  };

  const addPlaylistToQueue = async (playlistId) => {
    const findPlaylist = playlistsData.find((item) => playlistId === item._id);
    console.log("findPlaylist?.songs", findPlaylist?.songs);
    if (!findPlaylist || !findPlaylist.songs || findPlaylist.songs.length === 0)
      return;
    let data = {
      name: findPlaylist?.name,
      status: "playlist",
    };
    setInfoPlayListNow(data);
    await playWithId(findPlaylist?.songs[0]?._id);
    setPlayListNow(findPlaylist?.songs);
  };

  useEffect(() => {
    if (playListNow.length > 0) {
      localStorage.setItem("playlistNow", JSON.stringify(playListNow));
    }
  }, [playListNow]);

  const playWithId = async (id) => {
    const selectedTrack = songsData.find((item) => id === item._id);
    if (selectedTrack) {
      setTrack(selectedTrack);
      await addSongToQueue(id);
      addSongsView(id);
      if (audioRef.current) {
        // Xóa event listener trước khi thêm mới
        audioRef.current.removeEventListener("loadedmetadata", handlePlayAudio);
        audioRef.current.addEventListener("loadedmetadata", handlePlayAudio, {
          once: true,
        });
      }
    }
  };

  // Hàm xử lý play audio
  const handlePlayAudio = () => {
    audioRef.current
      .play()
      .then(() => {
        setPlayStatus(true);
      })
      .catch((error) => {
        console.error("Error playing the audio:", error);
      });
  };

  const previous = async () => {
    if (isRandom) {
      // Nếu chế độ random đang bật, có thể chọn một bài hát ngẫu nhiên
      const randomIndex = Math.floor(Math.random() * playListNow.length);
      const previousTrack = playListNow[randomIndex];
      setTrack(previousTrack);
    } else {
      const currentIndex = playListNow.findIndex(
        (item) => track._id === item._id
      );
      if (currentIndex > 0) {
        setTrack(playListNow[currentIndex - 1]);
      } else {
        setTrack(playListNow[playListNow.length - 1]);
      }
    }

    await audioRef.current.play();
    setPlayStatus(true);
  };

  const next = async () => {
    if (!audioRef.current) return;

    if (isRandom) {
      let randomIndex;
      let nextTrack;
      do {
        randomIndex = Math.floor(Math.random() * playListNow.length);
        nextTrack = playListNow[randomIndex];
      } while (nextTrack._id === track._id); // Đảm bảo không chọn bài hiện tại

      setTrack(nextTrack);
    } else {
      const currentIndex = playListNow.findIndex(
        (item) => track._id === item._id
      );
      const nextTrack =
        currentIndex < playListNow.length - 1
          ? playListNow[currentIndex + 1]
          : playListNow[0];
      setTrack(nextTrack);
    }

    try {
      await audioRef.current.play();
      setPlayStatus(true);
    } catch (error) {
      console.error("Error playing the audio:", error);
    }
  };

  const seekSong = async (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/songs`);
      if (response.data.success && response.data.data.length > 0) {
        let dataArr = response.data.data; // Tạo bản sao của mảng gốc

        // Gọi hàm shuffleArray để trộn mảng bài hát (tạo bản sao để tránh bị ảnh hưởng bởi sortArray)
        let shuffledData = structuredClone(dataArr);
        shuffleArray(shuffledData).then((item) => {
          setSongsDataWeekly(item);
        });

        // Sắp xếp theo ngày tạo (tạo bản sao để tránh bị ảnh hưởng bởi shuffleArray)
        let sortedData = structuredClone(dataArr);
        sortArray(sortedData, "createAt").then((item) => {
          setSongsDataNew(item);
        });

        setSongsData(dataArr); // Thiết lập dữ liệu gốc
      }
    } catch (error) {
      toast.error("Error Occur");
    }
  };

  const addSongsView = async (sid) => {
    try {
      const response = await axios.post(`${url}/api/song/view/${sid}`);
      if (response.data.success && response.data.data.length > 0) {
        console.log("+1 song");
      }
    } catch (error) {
      // toast.error("Error Occur");
    }
  };

  const addAlbumsView = async (aid) => {
    try {
      const response = await axios.post(`${url}/api/album/view/${aid}`);
      if (response.data.success && response.data.data.length > 0) {
        console.log("+1 album");
      }
    } catch (error) {
      toast.error("Error Occur");
    }
  };

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/albums`);
      if (response.data.success) {
        setAlbumsData(response.data.data);
      }
    } catch (error) {
      toast.error("Error Occur");
    }
  };

  const getArtistsData = async () => {
    try {
      const response = await axios.get(`${url}/api/user/artist`);
      if (response.data.success) {
        setArtistsData(response.data.data);
      }
    } catch (error) {
      toast.error("Error Occur");
    }
  };

  const getPlaylistData = async () => {
    try {
      const response = await axios.get(`${url}/api/playlist/list`);
      if (response.data.success) {
        setPlaylistsData(response?.data?.data);
        if (isLogin) {
          const dataPlaylist = response?.data?.data?.filter((item) => {
            return item?.user?._id === infoLogin?.id;
          });
          console.log("dataPlaylist", dataPlaylist);
          setPlaylistsYourData(dataPlaylist);
        }
        const dataPublic = response?.data?.data?.filter((item) => {
          return item.status === "public";
        });
        setPlaylistsPublicData(dataPublic);
      }
    } catch (error) {
      toast.error("Error Occur");
    }
  };

  const getLibraryData = async () => {
    if (isLogin) {
      try {
        const response = await axios.get(`${url}/api/library/`, {
          headers: {
            Authorization: `Bearer ${infoLogin.token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.data.success) {
          setLibraryData(response.data.data);
        }
      } catch (error) {
        toast.error("Error Occur");
      }
    }
  };

  // const getPlaylistPublicData = async () => {
  //   try {
  //     const response = await axios.get(`${url}/api/playlist/all-public`);
  //     if (response.data.success) {
  //       setPlaylistsPublicData(response.data.data);
  //     }
  //   } catch (error) {
  //     toast.error("Error Occur");
  //   }
  // };

  // ---------------------add, remove playlistNow--------------end

  // -------------------add,edit ..........playlist.........start

  const addInfoPlayList = async (datavalue) => {
    if (!isLogin) {
      toast.info("Please login first!");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8000/api/playlist/add`,
        datavalue,
        {
          headers: {
            Authorization: `Bearer ${infoLogin.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.success) {
        toast.success(response.data.message);
        navigate(`/playlist/${response.data.data._id}`, { replace: true });
        closeAddPlaylist();
        getPlaylistData();
        getLibraryData();
      }
    } catch (error) {
      if (error.response) {
        // Nếu API trả về mã lỗi
        if (error.response.status === 400) {
          toast.error(
            error.response.data.message || "Failed to add item to library."
          );
        } else {
          toast.error("Error occurred while adding to library");
        }
      } else {
        console.error("Error while adding to library:", error);
        toast.error("Error occurred while adding to library");
      }
    }
  };

  const editInfoPlayList = async (datavalue) => {
    if (!isLogin) {
      toast.info("Please login first!");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:8000/api/playlist/${addPlaylist.id}`,
        datavalue,
        {
          headers: {
            Authorization: `Bearer ${infoLogin.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.success) {
        toast.success(response.data.message);
        closeAddPlaylist();
        getPlaylistData();
      }
    } catch (error) {
      if (error.response) {
        // Nếu API trả về mã lỗi
        if (error.response.status === 400) {
          toast.error(
            error.response.data.message || "Failed to add item to library."
          );
        } else {
          toast.error("Error occurred while adding to library");
        }
      } else {
        console.error("Error while adding to library:", error);
        toast.error("Error occurred while adding to library");
      }
    }
  };
  // -------------------add,edit ..........playlist.........end

  // -----------------add,remove.....library--------------start
  const addToLibrary = async ({ song, playlist, album, artist }) => {
    if (!isLogin) {
      toast.info("Please login first!");
      return;
    }

    let str = "";
    if (song) {
      str = "The song added to your library";
    } else if (playlist) {
      str = "The playlist added to your playlist favorite";
    } else if (album) {
      str = "The album added to your library";
    } else if (artist) {
      str = "The artist follow successfully";
    }

    try {
      const value = {
        song: song || null,
        playlist: playlist || null,
        album: album || null,
        artist: artist || null,
      };

      const response = await axios.put(`${url}/api/library/push`, value, {
        headers: {
          Authorization: `Bearer ${infoLogin.token}`, // Gửi token xác thực nếu cần
        },
      });

      if (response.data.success) {
        toast.success(str);
        getLibraryData();
        //
      } else {
        toast.error(response.data.message || "Failed to add item to library.");
      }
    } catch (error) {
      if (error.response) {
        // Nếu API trả về mã lỗi
        if (error.response.status === 400) {
          toast.error(
            error.response.data.message || "Failed to add item to library."
          );
        } else {
          toast.error("Error occurred while adding to library");
        }
      } else {
        console.error("Error while adding to library:", error);
        toast.error("Error occurred while adding to library");
      }
    }
  };

  const removeFromLibrary = async ({ song, playlist, album, artist }) => {
    if (!isLogin) {
      toast.info("Please login first!");
      return;
    }
    console.log(song, playlist, album, artist);
    try {
      const value = {
        song: song || null,
        playlist: playlist || null,
        album: album || null,
        artist: artist || null,
      };
      let str = "";
      if (song) {
        str = "Are you sure you want to delete the song from your library?";
      } else if (playlist) {
        str =
          "Are you sure you want to delete the playlist from your playlist favorite?";
      } else if (album) {
        str = "Are you sure you want to delete the album from your library?";
      } else if (artist) {
        str = "Are you sure you want to delete the artist from your library?";
      }

      let strRes = "";
      if (song) {
        strRes = "The song removed from your library";
      } else if (playlist) {
        strRes = "The playlist removed from your playlist favorite";
      } else if (album) {
        strRes = "The album removed from your library";
      } else if (artist) {
        strRes = "The artist removed from your library";
      }

      if (window.confirm(str)) {
        const response = await axios.put(`${url}/api/library/remove`, value, {
          headers: {
            Authorization: `Bearer ${infoLogin.token}`, // Gửi token xác thực nếu cần
          },
        });

        if (response.data.success) {
          toast.success(strRes);
          getLibraryData();
          getPlaylistData();
          // if (playlist) navigate("/playlist", { replace: true });
          // getPlaylistData(); // Gọi lại API hoặc cập nhật UI nếu cần thiết
        } else {
          toast.error(
            response.data.message ||
              "Failed to remove item from your playlist favorite."
          );
        }
      }
    } catch (error) {
      if (error.response) {
        // Nếu API trả về mã lỗi
        if (error.response.status === 400) {
          toast.error(
            error.response.data.message ||
              "Failed to remove item to your playlist favorite."
          );
        } else {
          toast.error(
            "Error occurred while removeing to your playlist favorite"
          );
        }
      } else {
        console.error(
          "Error while removeing to your playlist favorite:",
          error
        );
        toast.error("Error occurred while removeing to your playlist favorite");
      }
    }
  };
  // -----------------add,remove.....library-------------end

  // -----------------add,remove .........playlist-------start
  const addSongToPlaylist = async ({ playlistId, songId }) => {
    if (!isLogin) {
      toast.info("Please login first!");
      return;
    }
    try {
      const value = {
        playlistId: playlistId || null,
        songId: songId || null,
      };

      const response = await axios.put(`${url}/api/playlist/push`, value, {
        headers: {
          Authorization: `Bearer ${infoLogin.token}`, // Gửi token xác thực nếu cần
        },
      });

      if (response.data.success) {
        toast.success("Song added to playlist!");
        getPlaylistData();
      } else {
        toast.error(response.data.message || "Failed to add song to playlist.");
      }
    } catch (error) {
      if (error.response) {
        // Nếu API trả về mã lỗi
        if (error.response.status === 400) {
          toast.error(
            error.response.data.message || "Failed to add item to library."
          );
        } else {
          toast.error("Error occurred while adding to library");
        }
      } else {
        console.error("Error while adding to library:", error);
        toast.error("Error occurred while adding to library");
      }
    }
  };

  const removeSongFromPlaylist = async ({ playlistId, songId }) => {
    if (!isLogin) {
      toast.info("Please login first!");
      return;
    }
    try {
      const value = {
        playlistId: playlistId || null,
        songId: songId || null,
      };

      const response = await axios.put(`${url}/api/playlist/remove`, value, {
        headers: {
          Authorization: `Bearer ${infoLogin.token}`, // Gửi token xác thực nếu cần
        },
      });

      if (response.data.success) {
        toast.success("Song removed from playlist!");
        getPlaylistData();
      } else {
        toast.error(
          response.data.message || "Failed to remove song from playlist."
        );
      }
    } catch (error) {
      if (error.response) {
        // Nếu API trả về mã lỗi
        if (error.response.status === 400) {
          toast.error(
            error.response.data.message || "Failed to add item to library."
          );
        } else {
          toast.error("Error occurred while adding to library");
        }
      } else {
        console.error("Error while adding to library:", error);
        toast.error("Error occurred while adding to library");
      }
    }
  };

  const updateImagePlaylist = async (playlistId, image) => {
    if (!isLogin) {
      toast.info("Please login first!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("image", image);
      const response = await axios.put(
        `${url}/api/playlist/${playlistId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${infoLogin.token}`, // Gửi token xác thực nếu cần
          },
        }
      );

      if (response.data.success) {
        toast.success("Photo update successful");
        getPlaylistData();
      } else {
        toast.error(
          response.data.message || "Failed to photo update to playlist."
        );
      }
    } catch (error) {
      if (error.response) {
        // Nếu API trả về mã lỗi
        if (error.response.status === 400) {
          toast.error(
            error.response.data.message || "Failed to photo update to library."
          );
        } else {
          toast.error("Error occurred while photo update library");
        }
      } else {
        console.error("Error while adding to library:", error);
        toast.error("Error occurred while adding to library");
      }
    }
  };
  // -------------------------------add.remove Playlist--------end
  const getInfoUser = async () => {
    if (isLogin) {
      try {
        const response = await axios.get(`${url}/api/user/info-user`, {
          headers: {
            Authorization: `Bearer ${infoLogin.token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.data.success) {
          setInfoUser(response.data.data);
        }
      } catch (error) {
        toast.error("Error Occur");
      }
    }
  };

  const logout = () => {
    localStorage.clear();
    setIsLogin(false);
    setInfoLogin({
      name: "",
      id: "",
    });
    window.location.reload();
  };
  // login-start-------------------------------------------------------------LOGIN
  const verifyToken = (keyName) => {
    const storage = localStorage.getItem(keyName);
    if (storage) {
      const decodeToken = jwtDecode(storage);
      const expiresIn = new Date(decodeToken.exp * 1000);
      if (new Date() > expiresIn) {
        localStorage.removeItem(keyName);
        return null;
      } else {
        return decodeToken;
      }
    } else {
      return null;
    }
  };

  useEffect(() => {
    const info = verifyToken("token");
    const token = localStorage.getItem("token");

    if (info) {
      setInfoLogin({ name: info.name, id: info._id, token: token });
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);
  //login-end------------------------------------------------------------------LOGINN

  useEffect(() => {
    const audioElement = audioRef.current;

    // Kiểm tra xem phần tử âm thanh có sẵn không
    if (audioElement) {
      const updateTime = () => {
        // Kiểm tra nếu duration tồn tại và hợp lệ
        if (audioElement.duration && !isNaN(audioElement.duration)) {
          seekBar.current.style.width =
            Math.floor(
              (audioElement.currentTime / audioElement.duration) * 100
            ) + "%";

          setTime({
            currentTime: {
              second: Math.floor(audioElement.currentTime % 60),
              minute: Math.floor(audioElement.currentTime / 60),
            },
            totalTime: {
              second: Math.floor(audioElement.duration % 60),
              minute: Math.floor(audioElement.duration / 60),
            },
          });
        }
      };

      audioElement.ontimeupdate = updateTime; // Thiết lập hàm xử lý ontimeupdate

      // Dọn dẹp hàm xử lý khi component unmount
      return () => {
        audioElement.ontimeupdate = null; // Đặt ontimeupdate về null khi unmount
      };
    }
  }, [audioRef]);

  useEffect(() => {
    // Lắng nghe sự kiện khi bài hát kết thúc
    audioRef.current.onended = () => {
      setTime({
        currentTime: {
          second: 0,
          minute: 0,
        },
        totalTime: {
          second: Math.floor(audioRef.current.duration % 60) || 0,
          minute: Math.floor(audioRef.current.duration / 60) || 0,
        },
      });

      // Đặt lại thanh seekBar về 0
      seekBar.current.style.width = "0%";
      setPlayStatus(false);

      if (isRepeat) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else {
        next();
      }
    };
  }, [isRepeat, track, isRandom]);

  //load 1 lần sau khi reload trang
  useEffect(() => {
    let dataPlaylistNow = [];
    try {
      const storedData = JSON.parse(localStorage.getItem("playlistNow"));
      if (Array.isArray(storedData)) {
        dataPlaylistNow = storedData;
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ localStorage:", error);
    }
    setPlayListNow(dataPlaylistNow);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getSongsData();
      await getAlbumsData();
      await getArtistsData();
      // await getPlaylistPublicData();
      await getPlaylistData();

      if (infoLogin.id) {
        await getLibraryData();
        await getInfoUser();
      }
    };

    fetchData();
  }, [isLogin, infoLogin]);

  // useEffect(() => {
  //   console.log("playlistsData", playlistsData);
  //   console.log("playlistsYourData", playlistsYourData);
  //   console.log("playlistsPublicData", playlistsPublicData);
  // }, [playlistsData, playlistsYourData, playlistsPublicData]);

  const contextValue = {
    addAlbumToQueue,
    addInfoPlayList,
    addPlaylist,
    addPlaylistToQueue,
    addSongToPlaylist,
    addSongToQueue,
    addToLibrary,
    albumsData,
    artistsData,
    audioRef,
    checkSongPlay,
    closeAddPlaylist,
    editInfoPlayList,
    infoUser,
    infoLogin,
    infoPlayListNow,
    isLogin,
    isRepeat,
    isShowListPlay,
    isRandom,
    libraryData,
    logout,
    next,
    openAddPlaylist,
    pause,
    pageInfo,
    getInfoUser,
    play,
    playListNow,
    playStatus,
    playWithId,
    playlistsData,
    playlistsYourData,
    playlistsPublicData,
    previous,
    removeFromLibrary,
    removeSongFromPlaylist,
    removeSongFromQueue,
    seekBar,
    seekBg,
    seekSong,
    setAddPlaylist,
    setIsLogin,
    setIsRepeat,
    setIsShowListPlay,
    setPlayStatus,
    setTime,
    setTrack,
    setType,
    setIsRandom,
    setPageInfo,
    songsData,
    songsDataNew,
    songsDataWeekly,
    time,
    track,
    type,
    updateImagePlaylist,
    volumeBar,
    volumeBg,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
