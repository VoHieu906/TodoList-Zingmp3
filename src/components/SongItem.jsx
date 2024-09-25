import React from "react";
import { memo } from "react";
import moment from "moment";
import "moment/locale/vi"; // Import locale tiếng Việt
import "./css/SongItem.css";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";

// Thiết lập locale tiếng Việt
moment.locale("vi");
const SongItem = ({
  thumbnail,
  title,
  artists,
  releaseDate,
  sid,
  order,
  percent,
  style,
}) => {
  const dispatch = useDispatch();
  return (
    <div
      className={` 
      d-flex
      justify-content-between
      align-items-center
      gap-3
      rounded
      cursor-pointer 
      ${style || "song-item"}`}
      style={{ width: "100%", padding: 10 }}
      onClick={() => {
        dispatch(actions.setCurSongId(sid));
        dispatch(actions.play(true));
      }}
    >
      <div className="d-flex gap-4 align-items-center">
        {order && (
          <span
            className={`${
              order === 1
                ? "text-shadow-no1"
                : order === 2
                ? "text-shadow-no2"
                : "text-shadow-no3"
            } text-order`}
          >
            {order}
          </span>
        )}
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
          <span className="text-xs opacity-75">{artists}</span>
          {releaseDate && (
            <span className="text-xs  opacity-75">
              {moment(releaseDate * 1000)
                .locale("vi")
                .fromNow()}
            </span>
          )}
        </div>
      </div>
      {percent && <span className="fw-bold">{`${percent}%`}</span>}
    </div>
  );
};

export default memo(SongItem);
