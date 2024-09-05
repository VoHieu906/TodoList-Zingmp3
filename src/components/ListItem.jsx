import React, { memo } from "react";
import icons from "../ultis/Icons";
import moment from "moment";
import "./ListItem.css";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
const { IoIosMusicalNotes } = icons;
const ListItem = ({ songData }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="d-flex align-items-center justify-content-between py-2 hover-effect"
      style={{ borderTop: "1px solid #6c757d" }}
      onClick={() => {
        dispatch(actions.setCurSongId(songData?.encodeId));
        dispatch(actions.play(true));
      }}
    >
      <div
        className="d-flex align-items-center gap-2 flex-grow-1"
        style={{ width: "50%" }}
      >
        <span>
          <IoIosMusicalNotes />
        </span>
        <img
          src={songData?.thumbnail}
          style={{ height: "60px" }}
          className="rounded"
          alt=""
        />
        <span className="d-flex flex-column">
          <span className=" fw-semibold title">
            {songData?.title?.length > 30
              ? `${songData?.title.slice(0, 25)}...`
              : songData?.title}
          </span>
          <span className="artist-name">{songData?.artistsNames}</span>
        </span>
      </div>
      <div className="album-title flex-grow-1 " style={{ width: "40%" }}>
        {songData?.album?.title?.length > 30
          ? `${songData?.album?.title.slice(0, 20)} ...`
          : songData?.album?.title}
      </div>
      <div className="songduration flex-grow-1 " style={{ width: "10%" }}>
        {moment.utc(songData?.duration * 1000).format("mm:ss")}
      </div>
    </div>
  );
};

export default memo(ListItem);
