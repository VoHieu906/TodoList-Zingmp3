import React, { useEffect, useState, useRef } from "react";
import { customBackgoundColors } from "../ultis/colors";
import { useSelector, useDispatch } from "react-redux";
import * as apis from "../apis";
import * as actions from "../store/actions";
import icons from "../ultis/Icons";
import "./Player.css";
const Player = () => {
  const {
    GoHeartFill,
    GoHeart,
    PiDotsThree,
    MdSkipNext,
    MdSkipPrevious,
    IoIosRepeat,
    IoIosShuffle,
    FaRegCirclePlay,
    FaRegPauseCircle,
    IoPauseCircleOutline,
    IoPlayCircleOutline,
  } = icons;
  const spanStyle = { fontSize: "24px", cursor: "pointer" };

  const audioEl = useRef(new Audio());
  const { curSongId, isPlaying } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null);
  const [source, setSource] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDetailSong = async () => {
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId),
      ]);
      if (res1.data.err === 0) {
        setSongInfo(res1.data.data);
      }
      if (res2.data.err === 0) {
        setSource(res2.data.data["128"]);
      }
    };
    fetchDetailSong();
    console.log("Id bài hát: ", curSongId);
  }, [curSongId]);

  useEffect(() => {
    const handleAudio = async () => {
      try {
        // Kiểm tra trạng thái hiện tại của audio trước khi gọi pause
        if (!audioEl.current.paused) {
          audioEl.current.pause();
        }

        // Cập nhật source và load lại audio
        audioEl.current.src = source;
        audioEl.current.load();

        // Chờ đến khi audio sẵn sàng để phát
        audioEl.current.oncanplaythrough = async () => {
          if (isPlaying) {
            await audioEl.current.play();
            console.log(curSongId);
          }
        };
      } catch (error) {
        console.error("Lỗi khi xử lý âm thanh:", error);
      }
    };

    handleAudio();
  }, [curSongId, source, isPlaying]);

  const handleToggleMusic = () => {
    if (isPlaying) {
      audioEl.current.pause();
      dispatch(actions.play(false));
    } else {
      audioEl.current.play();
      dispatch(actions.play(true));
    }
  };
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
      <div className="col-md-6 border border-primary d-flex flex-column align-items-center justify-content-center gap-2">
        <div className="d-flex gap-5 align-items-center justify-content-center">
          <span style={spanStyle} title="Phát ngẫu nhiên">
            <IoIosShuffle />
          </span>
          <span style={spanStyle}>
            <MdSkipPrevious />
          </span>
          <span
            style={{ fontSize: "30px" }}
            className="hoverable-span"
            onClick={handleToggleMusic}
          >
            {isPlaying ? <IoPauseCircleOutline /> : <IoPlayCircleOutline />}
          </span>
          <span style={spanStyle}>
            <MdSkipNext />
          </span>
          <span style={spanStyle} title="Phát lặp lại">
            <IoIosRepeat />
          </span>
        </div>
        <div>Progress bar</div>
      </div>
      <div className="col-md-3 border border-primary d-none d-xl-flex">
        Volumn
      </div>
    </div>
  );
};

export default Player;
