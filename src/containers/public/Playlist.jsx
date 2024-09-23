import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as apis from "../../apis";
import moment from "moment";
import { ListSong, AudioLoading } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import "./css/Playlist.css";
import icons from "../../ultis/Icons";
import { useLocation } from "react-router-dom";
const { FaPlay } = icons;

const Playlist = () => {
  const { title, pid } = useParams();
  const { isPlaying } = useSelector((state) => state.music);
  const [playlistData, setPlaylistData] = useState({});
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDetailPlayList = async () => {
      dispatch(actions.loading(true));
      try {
        const response = await apis.apiGetDetailPlaylist(pid);
        dispatch(actions.loading(false));
        if (response?.data.err === 0) {
          setPlaylistData(response.data?.data);
          dispatch(actions.setPlaylist(response?.data?.data?.song?.items));
        } else {
          console.error("API Error:", response?.data.msg);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchDetailPlayList();
  }, [pid, dispatch]);

  useEffect(() => {
    if (!isPlaying) {
      setShouldAnimate(true);
    }
  }, [isPlaying]);
  useEffect(() => {
    if (location.state?.playAlbum) {
      const randomSong =
        Math.round(Math.random() * playlistData?.song?.items?.length) - 1;
      dispatch(
        actions.setCurSongId(playlistData?.song?.items[randomSong]?.encodeId)
      );
      dispatch(actions.play(true));
    }
  }, [pid, playlistData]);
  const location = useLocation();
  console.log(location);

  return (
    <div className="d-flex gap-1 px-2 position-relative">
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
        <div style={{ height: "224px" }} className="position-relative">
          <img
            style={{ height: "100%", width: "auto" }}
            className={`shadow-lg ${
              isPlaying
                ? "rotate custom-rounded-circle"
                : `custom-rounded ${shouldAnimate ? "rotate-reverse" : ""}`
            }`}
            src={playlistData?.thumbnailM}
            alt="thumbnailM"
            onAnimationEnd={() => {
              if (!isPlaying) {
                setShouldAnimate(false);
              }
            }}
          />
          <div
            className={`position-absolute overlay d-flex align-items-center justify-content-center ${
              isPlaying ? "rounded-circle" : ""
            }`}
            style={{
              right: "0",
              top: "0",
              left: "0",
              bottom: "0",
              color: "#fff",
            }}
          >
            <span className="p-3 border border-radius rounded-circle">
              {isPlaying ? <AudioLoading /> : <FaPlay size={40} />}
            </span>
          </div>
        </div>

        <div className="d-flex flex-column align-items-center">
          <h4>{playlistData.title}</h4>
          <span
            className="d-flex align-items-center gap-2"
            style={{ fontSize: "12px", color: "#6c757d" }}
          >
            <span>Cập nhật: </span>
            <span>
              {moment.unix(playlistData?.contentLastUpdate).format("DD/MM/YY")}
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

        <ListSong totalDuration={playlistData?.song?.totalDuration || 0} />
      </div>
    </div>
  );
};

export default Playlist;
