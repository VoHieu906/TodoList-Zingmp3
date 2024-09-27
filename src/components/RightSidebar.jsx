import React, { useState, useEffect } from "react";
import Icons from "../ultis/Icons";
import { useSelector } from "react-redux";
import { customBackgoundColors } from "../ultis/colors";
import { SongItem } from ".";
import "./css/RightSidebar.css";
import { apiGetDetailPlaylist } from "../apis";
import { Scrollbars } from "react-custom-scrollbars-2";
const { IoTrashBin } = Icons;
const RightSidebar = () => {
  const [isRecent, setIsRecent] = useState(false);
  const { curSongData, curAlbumId, curSongId, isPlaying, recentSongs } =
    useSelector((state) => state.music);
  const [playlist, setPlaylist] = useState();
  const fetchDetailPlaylist = async () => {
    const response = await apiGetDetailPlaylist(curAlbumId);
    if (response.data?.err === 0) setPlaylist(response.data?.data?.song?.items);
  };
  useEffect(() => {
    if (curAlbumId) fetchDetailPlaylist();
  }, []);
  useEffect(() => {
    if (curAlbumId && isPlaying) fetchDetailPlaylist();
  }, [curAlbumId, isPlaying]);
  useEffect(() => {
    isPlaying && setIsRecent(false);
  }, [isPlaying, curSongId]);
  return (
    <div
      className="d-flex flex-column w-100"
      style={{ fontSize: 12, height: "100%" }}
    >
      <div
        style={{ height: 70 }}
        className="px-2 d-flex align-items-center gap-2 justify-content-between"
      >
        <div
          className="d-flex flex-grow-1 flex-shrink-1 justify-content-center  rounded-pill cursor-pointer"
          style={{
            backgroundColor: customBackgoundColors.color_200,
            padding: 6,
          }}
        >
          <span
            className={`flex-basis-0 flex-grow-1 flex-shrink-1 d-flex align-items-center justify-content-center rounded-pill ${
              !isRecent && "tab"
            } `}
            onClick={() => setIsRecent((prev) => !prev)}
          >
            Danh sách phát
          </span>
          <span
            className={`flex-basis-0 flex-grow-1 flex-shrink-1 d-flex align-items-center justify-content-center rounded-pill ${
              isRecent && "tab"
            } `}
            onClick={() => setIsRecent((prev) => !prev)}
          >
            Nghe gần đây
          </span>
        </div>
        <span className="p-1 rounded-circle trash-icon-hover cursor-pointer">
          <IoTrashBin size={16} />
        </span>
      </div>
      {isRecent ? (
        <div
          className="w-100 d-flex flex-column px-2 flex-grow-1 flex-shrink-1"
          style={{ marginBottom: 90 }}
        >
          <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
            {recentSongs && (
              <div className="d-flex flex-column">
                {recentSongs?.map((item) => (
                  <SongItem
                    key={item.sid}
                    thumbnail={item?.thumbnail}
                    title={item?.title}
                    artists={item?.artists}
                    sid={item?.sid}
                    sm={true}
                    rsb
                  />
                ))}
              </div>
            )}
          </Scrollbars>
        </div>
      ) : (
        <div className="w-100 d-flex flex-column px-2 flex-grow-1 flex-shrink-1">
          <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
            <SongItem
              thumbnail={curSongData?.thumbnail}
              title={curSongData?.title}
              artists={curSongData?.artistsNames}
              sid={curSongData?.encodeId}
              sm={true}
              style={"bg-main-500 text-light"}
            />
            <div
              className="d-flex flex-column text-dark px-2"
              style={{ paddingTop: 15, paddingBottom: 5 }}
            >
              <span style={{ fontSize: 14 }} className="fw-bold">
                Tiếp theo
              </span>
              <span className="opacity-75 text-xs d-flex gap-1">
                <span>Playlist: </span>
                <span className="fw-semibold text-main-500">
                  {curSongData?.album.title.length >= 20
                    ? `${curSongData?.album.title.slice(0, 20)}...`
                    : curSongData?.album.title}
                </span>
              </span>
            </div>

            {playlist && (
              <div className="d-flex flex-column" style={{ marginBottom: 90 }}>
                {playlist?.map((item) => (
                  <SongItem
                    key={item?.encodeId}
                    thumbnail={item?.thumbnail}
                    title={item?.title}
                    artists={item?.artistsNames}
                    sid={item?.encodeId}
                    sm={true}
                    rsb
                  />
                ))}
              </div>
            )}
          </Scrollbars>
        </div>
      )}
    </div>
  );
};

export default RightSidebar;
