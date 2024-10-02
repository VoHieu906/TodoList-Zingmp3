import React, { memo, useEffect } from "react";
import icons from "../ultis/Icons";
import moment from "moment";
import "./css/ListItem.css";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
const { IoIosMusicalNotes } = icons;
const ListItem = ({ songData, isHideAlbum }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="d-flex align-items-center justify-content-between px-2 py-2 hover-effect w-100"
      style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}
      onClick={() => {
        dispatch(actions.setCurSongId(songData?.encodeId));
        dispatch(actions.play(true));
        dispatch(actions.playPlaylist(true));
        dispatch(
          actions.setRecent({
            thumbnail: songData?.thumbnail,
            title: songData?.title,
            sid: songData?.encodeId,
            artists: songData?.artistsNames,
          })
        );
      }}
    >
      <div
        className="d-flex align-items-center gap-2 flex-grow-1"
        style={{ width: "50%" }}
      >
        {!isHideAlbum && (
          <span>
            <IoIosMusicalNotes />
          </span>
        )}

        <img
          src={songData?.thumbnail}
          style={{ height: "60px" }}
          className="rounded"
          alt=""
        />
        <span className="d-flex flex-column">
          <span className=" fw-semibold title" style={{ fontSize: 14 }}>
            {songData?.title?.length > 30
              ? `${songData?.title.slice(0, 25)}...`
              : songData?.title}
          </span>
          <span className="artist-name opacity-75" style={{ fontSize: 12 }}>
            {songData?.artistsNames}
          </span>
        </span>
      </div>
      {!isHideAlbum && (
        <div
          className="album-title flex-grow-1 opacity-75"
          style={{ width: "40%" }}
        >
          {songData?.album?.title?.length > 30
            ? `${songData?.album?.title.slice(0, 20)} ...`
            : songData?.album?.title}
        </div>
      )}

      {!isHideAlbum && (
        <div
          className={`songduration flex-grow-1 opacity-75 d-flex justify-content-end
        `}
          style={{ width: "10%" }}
        >
          {moment.utc(songData?.duration * 1000).format("mm:ss")}
        </div>
      )}
    </div>
  );
};

export default memo(ListItem);
