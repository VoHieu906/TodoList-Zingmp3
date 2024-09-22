import React from "react";
import { memo } from "react";
import moment from "moment";
import "moment/locale/vi"; // Import locale tiếng Việt
import "./css/SongItem.css";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
// Thiết lập locale tiếng Việt
moment.locale("vi");
const SongItem = ({ thumbnail, title, artists, releaseDate, sid }) => {
  const dispatch = useDispatch();
  return (
    <div
      className=" d-flex gap-3 rounded song-item cursor-pointer"
      style={{ width: "30%", padding: 10 }}
      onClick={() => {
        dispatch(actions.setCurSongId(sid));
        dispatch(actions.play(true));
      }}
    >
      <img
        src={thumbnail}
        alt="thumbnail"
        style={{ width: 60, height: 60 }}
        className="rounded"
      />
      <div className="d-flex flex-column">
        <span className="text-sm fw-semibold">
          {title?.length >= 20 ? `${title.slice(0, 20)} ...` : title}
        </span>
        <span className="text-xs text-secondary">{artists}</span>
        <span className="text-xs text-secondary">
          {moment(releaseDate * 1000)
            .locale("vi")
            .fromNow()}
        </span>
      </div>
    </div>
  );
};

export default memo(SongItem);
