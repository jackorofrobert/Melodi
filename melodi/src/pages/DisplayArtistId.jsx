import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { PlayerContext } from "../context/PlayerContext";
import { useParams } from "react-router-dom";
import AlbumItem from "../components/AlbumItem";
import TableItem from "../components/TableItem";

const DisplayArtistId = () => {
  const { id } = useParams();
  const { songsData, albumsData, artistsData } = useContext(PlayerContext);
  const [artistInfo, setArtistInfo] = useState({});
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [artistSongs, setArtistSongs] = useState([]);

  useEffect(() => {
    const fetchArtistInfo = async () => {
      const dataSongs = await songsData.filter(
        (item) => item?.artist?._id === id
      );
      const dataAlbums = albumsData.filter((album) =>
        album.artist.some((artist) => artist._id === id)
      );
      const dataInfo = await artistsData.filter((item) => item?._id === id);

      if (dataSongs && dataSongs?.length > 0) setArtistSongs(dataSongs);
      if (dataAlbums && dataAlbums?.length > 0) setArtistAlbums(dataAlbums);
      if (dataInfo && dataInfo?.length > 0) setArtistInfo(dataInfo[0]);
    };
    fetchArtistInfo();
  }, [id]);

  //   useEffect(() => {
  //     console.log("artistInfo", artistInfo);
  //     console.log("artistAlbums", artistAlbums);
  //     console.log("albumsData", albumsData);
  //     console.log("artistSongs", artistSongs);
  //   }, [artistInfo, artistAlbums, artistSongs]);
  return (
    <div>
      <Navbar />
      <div className="p-6">
        {/* Album Info */}
        <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
          {/* <div> */}
          <img
            className="w-30 h-60 rounded-lg shadow-custom"
            src={artistInfo?.profile_image}
            alt={artistInfo?.username}
          />
          {/* </div> */}
          <div className="flex flex-col md:ml-6 gap-3">
            <p className="text-lg md:text-xl text-gray-200">Artist</p>
            <h2 className="font-bold text-2xl md:text-3xl text-white mb-4">
              {artistInfo?.username}
            </h2>
            <p>
              With a burning passion and unique musical style,{" "}
              <span className="text-[#0E9EEF]">{artistInfo?.username}</span> has
              quickly affirmed its position in the music industry. Combining
              modern sounds and genuine emotions,{" "}
              <span className="text-[#0E9EEF]">{artistInfo?.username}</span> not
              only conquers listeners with her captivating voice but also
              conveys profound messages through each lyric.{" "}
              <span className="text-[#0E9EEF]">{artistInfo?.username}</span>'s
              journey is a testament to her endless creativity and passion for
              art, touching the hearts of millions of fans.
            </p>
          </div>
        </div>
      </div>
      <div className="my-10 ml-5">
        <div>
          <h1 className="my-5 font-bold text-3xl capitalize">
            The best albums of{" "}
            <span className="text-[#0E9EEF]">{artistInfo?.username}</span>
          </h1>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 ">
          {artistAlbums?.map((item, index) => (
            <AlbumItem
              key={index}
              name={item.name}
              artist={item.artist.map((artist) => artist.username).join(", ")}
              id={item._id}
              image={item.image}
            />
          ))}
        </div>
      </div>
      <div className="my-10 ml-5">
        <h1 className="font-bold text-3xl capitalize">
          The best albums of{" "}
          <span className="text-[#EE10B0]">{artistInfo?.username}</span>
        </h1>
        <div className="flex flex-col gap-4">
          {/* Tiêu đề cột */}
          <div className="grid grid-cols-[0.6fr_3fr_1.5fr_3.4fr_0.5fr_1fr] gap-2 p-2 items-center text-white font-bold text-[18px]">
            <div></div>
            <div></div>
            <div>Release Date</div>
            <div>Music Genre</div>
            <div>Time</div>
          </div>

          {/* Hàng dữ liệu */}
          {artistSongs && artistSongs?.length > 0 ? (
            artistSongs.map((item, index) => (
              <div
                key={index}
                //   className="grid grid-cols-[1fr_1fr_2fr_3fr_1fr] gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
              >
                <TableItem
                  index={index}
                  image={item.image}
                  title={item.title}
                  artist={item.artist.username}
                  dateCreated={new Date(item.createdAt).toDateString()}
                  category={item.category.map((cat) => cat.name).join(", ")}
                  time={item.duration}
                  id={item._id}
                />
              </div>
            ))
          ) : (
            <p>No songs available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayArtistId;
