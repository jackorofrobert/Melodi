import React, { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import TableItem from "./TableItem";

const TrendSongTable = () => {
  const { songsData, playWithId } = useContext(PlayerContext);
  const [songTop10, setSongTop] = useState([]);
  const [top, setTop] = useState(10);
  useEffect(() => {
    const topSongs = songsData
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, top);
    setSongTop(topSongs);
  }, [top, songsData]);
  return (
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
      {songTop10 && songTop10.length > 0 ? (
        songTop10.map((item, index) => (
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
      <div className=" flex justify-center ">
        {songsData?.length >= top ? (
          <div
            className="text-white px-3 rounded-lg bg-[#1E1E1E] flex justify-center items-center gap-2 cursor-pointer hover:bg-[#616061]"
            onClick={() => {
              setTop((prev) => prev + 10);
            }}
          >
            <p className="text-4xl mb-2">+</p>
            <p className="text-lg font-semibold ">View more</p>
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

export default TrendSongTable;
