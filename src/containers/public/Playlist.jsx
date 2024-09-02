import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as apis from "../../apis";
import moment from "moment";
const Playlist = () => {
  const { title, pid } = useParams();
  const [playlistData, setPlaylistData] = useState({});
  console.log({ title, pid });
  useEffect(() => {
    const fetchDetailPlayList = async () => {
      const response = await apis.apiGetDetailPlaylist(pid);
      if (response?.data.err === 0) {
        setPlaylistData(response.data?.data);
      }
    };
    fetchDetailPlayList();
  }, [pid]);
  return (
    <>
      <div className="d-flex gap-2 px-4">
        <div
          style={{ flex: 3 }}
          className="d-flex flex-column align-items-center gap-2"
        >
          <img
            style={{ height: "70%", width: "auto" }}
            className="rounded shadow-lg"
            src={playlistData?.thumbnailM}
            alt="thumbnailM"
          />
          <div className="d-flex flex-column align-items-center">
            <h4>{playlistData.title}</h4>
            <span
              className="d-flex align-items-center gap-2"
              style={{ fontSize: "14px", color: "#6c757d" }}
            >
              <span>Cập nhật: </span>
              <span>
                {moment
                  .unix(playlistData?.contentLastUpdate)
                  .format("DD/MM/YY")}
              </span>
            </span>
            <span style={{ fontSize: "14px", color: "#6c757d" }}>
              {playlistData?.artistsNames}
            </span>
            <span style={{ fontSize: "14px", color: "#6c757d" }}>
              {`${Math.round(playlistData?.like / 1000)}k người yêu thích`}
            </span>
          </div>
        </div>
        <div style={{ flex: 7 }} className="">
          Right
        </div>
      </div>
    </>
  );
};

export default Playlist;
