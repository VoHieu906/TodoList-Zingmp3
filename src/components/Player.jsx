import React, { useEffect, useState } from "react";
import { customBackgoundColors } from "../ultis/colors";
import { useSelector } from "react-redux";
import * as apis from "../apis";
import icons from "../ultis/Icons";
const Player = () => {
  const { GoHeartFill, GoHeart, PiDotsThree } = icons;
  const { curSongId } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null);
  useEffect(() => {
    const fetchDetailSong = async () => {
      const response = await apis.getDetailSong(curSongId);
      if (response.data.err === 0) {
        setSongInfo(response.data.data);
        console.log(response.data.data);
      }
    };
    fetchDetailSong();
  }, [curSongId]);
  return (
    <div
      style={{
        backgroundColor: customBackgoundColors.color_400,
        height: "100%",
      }}
      className="p-0 row container-fluid m-0"
    >
      <div className="col-md-3 border border-primary d-flex align-items-center ">
        <div className="d-flex align-items-center">
          <img
            src={songInfo?.thumbnail}
            alt=""
            style={{ objectFit: "contain", width: "auto", height: "70px" }}
            className="rounded"
          />
          <div
            className="d-flex flex-column ms-3"
            style={{ fontSize: "14px", marginRight: " 12px" }}
          >
            <span style={{ fontWeight: 600 }}>{songInfo?.title}</span>
            <span style={{ fontWeight: 400 }}>{songInfo?.artistsNames}</span>
          </div>
          <div>
            <span style={{ fontSize: "20px" }}>
              <GoHeart style={{ marginRight: "8px" }} />
              <PiDotsThree />
            </span>
          </div>
        </div>
      </div>
      <div className="col-md-6 border border-primary">Main Player</div>
      <div className="col-md-3 border border-primary">Volumn</div>
    </div>
  );
};

export default Player;
