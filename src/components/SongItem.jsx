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
  size,
  rsb,
}) => {
  const dispatch = useDispatch();
  return (
    <div
      className={` 
      d-flex
      justify-content-between
      align-items-center
      gap-3
      cursor-pointer 
      song-item
      ${style || "rounded"}`}
      style={{ width: "100%", padding: 10 }}
      onClick={() => {
        dispatch(actions.setCurSongId(sid));
        dispatch(actions.play(true));
        dispatch(actions.setRecent({ thumbnail, title, sid, artists }));
      }}
    >
      <div className="d-flex gap-3 align-items-center">
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
          className={`rounded ${size || "img-60"}`}
        />

        <div className="d-flex flex-column gap-1">
          <span className=" fw-semibold" style={{ fontSize: 14 }}>
            {rsb
              ? title?.length >= 15
                ? `${title.slice(0, 15)} ...`
                : title
              : title?.length >= 20
              ? `${title.slice(0, 20)} ...`
              : title}
          </span>
          <span className="text-xs opacity-75" style={{ fontSize: 12 }}>
            {artists?.length > 15 ? `${artists.slice(0, 15)} ...` : artists}
          </span>
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
