import React, { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { useNavigate } from "react-router-dom";

const TrendAlbumTable = ({ top, setTop }) => {
  const navigate = useNavigate();
  const { albumsData } = useContext(PlayerContext);
  const [topAlbums, setTopAlbums] = useState([]);

  useEffect(() => {
    // Lọc album có lượt xem cao nhất trong tháng hiện tại
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const topAlbumsThisMonth = albumsData
      .filter((album) => {
        const albumDate = new Date(album.createdAt);
        return (
          albumDate.getMonth() === currentMonth &&
          albumDate.getFullYear() === currentYear
        );
      })
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, top);

    setTopAlbums(topAlbumsThisMonth);
    console.log("Current top value:", top);
    console.log("Filtered albums for this month:", topAlbumsThisMonth);
  }, [albumsData, top]);

  return (
    <div className="flex flex-col gap-4">
      {/* Tiêu đề cột */}
      <div className="grid grid-cols-[0.5fr_6fr_2fr_0.5fr] gap-2 p-2 items-center text-white font-bold text-[18px]">
        <div></div>
        <div></div>
        <div>Release Date</div>
        {/* <div>Artist</div> */}
        <div>Views</div>
      </div>

      {/* Hàng dữ liệu */}
      {topAlbums && topAlbums.length > 0 ? (
        topAlbums.map((album, index) => (
          <div key={`${album?._id}-${index}`}>
            <div
              className="group grid grid-cols-[0.6fr_6fr_2fr_0.5fr] rounded-lg items-center gap-0 h-16 cursor-pointer"
              onClick={() => navigate(`/album/${album?._id}`)}
            >
              {/* Cột 1: Hạng */}
              <div className="flex items-center justify-center h-16">
                <p className="text-white text-xl"># {index + 1}</p>
              </div>

              {/* Cột 2: Ảnh và thông tin album */}
              <div className="flex items-center gap-2 -ml-1 relative bg-[#1E1E1E] group-hover:bg-[#323131]">
                <img
                  src={album?.image}
                  alt="album"
                  className="w-16 h-16 rounded-lg  -ml-2"
                />
                <div className="flex flex-col ml-3">
                  <p className="text-[18px] font-bold overflow-hidden truncate">
                    {album?.name}
                  </p>
                  <p className="text-white">
                    {album?.artist.map((item) => item?.username).join(", ")}
                  </p>
                </div>
              </div>

              {/* Cột 3: Ngày phát hành */}
              <div className="text-white bg-[#1E1E1E] h-full flex items-center group-hover:bg-[#323131]">
                {new Date(album?.createdAt).toDateString()}
              </div>

              {/* Cột 4: Thể loại */}
              {/* <div className="text-white truncate">{album?.desc}</div> */}

              {/* Cột 5: Lượt xem */}
              <div className="text-white bg-[#1E1E1E] h-full flex items-center group-hover:bg-[#323131] rounded-r-lg">
                {album?.viewCount}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No albums available for this month.</p>
      )}

      {/* Xem tất cả */}
      <div className=" flex justify-center ">
        {albumsData?.length >= top ? (
          <div
            className="text-white px-3 rounded-lg bg-[#1E1E1E] flex justify-center items-center gap-2 cursor-pointer hover:bg-[#616061]"
            onClick={() => {
              setTop((prev) => prev + 10);
            }}
          >
            <p className="text-4xl mb-2">+</p>
            <p className="text-lg font-semibold ">View All</p>
          </div>
        ) : (
          <div
            className="text-white px-3 py-2 rounded-lg bg-[#1E1E1E] flex justify-center items-center gap-2 cursor-pointer hover:bg-[#616061]"
            onClick={() => {
              setTop((prev) => prev - 10);
            }}
          >
            <p className="text-lg font-semibold ">Collapse</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendAlbumTable;
