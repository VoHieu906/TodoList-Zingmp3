import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as apis from "../../apis";
import moment from "moment";
import { ListSong } from "../../components";
const Playlist = () => {
  const { title, pid } = useParams();
  const [playlistData, setPlaylistData] = useState({});
  useEffect(() => {
    const fetchDetailPlayList = async () => {
      try {
        const response = await apis.apiGetDetailPlaylist(pid);
        if (response?.data.err === 0) {
          setPlaylistData(response.data?.data);
        } else {
          console.error("API Error:", response?.data.msg);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchDetailPlayList();
  }, [pid]);
  console.log(playlistData);

  return (
    <>
      <div className="d-flex gap-1 px-2">
        <style>
          {`
    /* CSS cho thanh cuộn trong Chrome, Edge, Safari */
    div[style*="overflow-y: auto"]::-webkit-scrollbar {
      width: 7px;
    }
    div[style*="overflow-y: auto"]::-webkit-scrollbar-track {
     
      border-radius: 10px;
    }
    div[style*="overflow-y: auto"]::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 10px;
    }
    div[style*="overflow-y: auto"]::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  `}
        </style>
        <div
          style={{ flex: 3 }}
          className="d-flex flex-column align-items-center gap-2"
        >
          <div style={{ height: "224px" }}>
            <img
              style={{ height: "100%", width: "auto" }}
              className="rounded shadow-lg"
              src={playlistData?.thumbnailM}
              alt="thumbnailM"
            />
          </div>
          <div className="d-flex flex-column align-items-center">
            <h4>{playlistData.title}</h4>
            <span
              className="d-flex align-items-center gap-2"
              style={{ fontSize: "12px", color: "#6c757d" }}
            >
              <span>Cập nhật: </span>
              <span>
                {moment
                  .unix(playlistData?.contentLastUpdate)
                  .format("DD/MM/YY")}
              </span>
            </span>
            <span style={{ fontSize: "12px", color: "#6c757d" }}>
              {playlistData?.artistsNames}
            </span>
            <span style={{ fontSize: "12px", color: "#6c757d" }}>
              {`${Math.round(playlistData?.like / 1000)}k người yêu thích`}
            </span>
          </div>
        </div>
        <div
          style={{
            flex: 7,
            overflowY: "auto",
            maxHeight: "calc(100vh - 177px)",
            paddingBottom: "50px",
          }}
          className="d-flex flex-column "
        >
          <span className="text-sm">
            <span style={{ color: "#6c757d" }}>Lời tựa: </span>
            <span>{playlistData?.sortDescription}</span>
          </span>

          <ListSong
            songs={playlistData?.song?.items || []}
            totalDuration={playlistData?.song?.totalDuration || 0}
          />
        </div>
      </div>
    </>
  );
};

export default Playlist;
