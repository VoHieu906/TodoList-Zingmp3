import React, { useEffect, useState } from "react";
import { customBackgoundColors, fontColor } from "../ultis/colors";
import { useSelector, useDispatch } from "react-redux";
import * as apis from "../apis";
import * as actions from "../store/actions";
import icons from "../ultis/Icons";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import "./css/Player.css";
import { LoadingSong } from "./";

const Player = ({ setIsShowRightSidebar }) => {
  const {
    GoHeart,
    PiDotsThree,
    MdSkipNext,
    MdSkipPrevious,
    IoIosRepeat,
    IoIosShuffle,
    IoPauseCircleOutline,
    IoPlayCircleOutline,
    RiRepeatOneLine,
    BsMusicNoteList,
    FaVolumeUp,
    FaVolumeMute,
    FaVolumeDown,
  } = icons;

  const { curSongId, isPlaying, songs } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null);
  const [audio, setAudio] = useState(new Audio());
  const [progress, setProgress] = useState(0); // State để lưu progress
  const [duration, setDuration] = useState(0); // State để lưu tổng thời gian của bài hát
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const [isLoadedSource, setIsLoadedSource] = useState(true);
  const [volume, setVolume] = useState(100);
  const dispatch = useDispatch();
  const handleProgressClick = (e) => {
    const clickX = e.nativeEvent.offsetX;
    const progressBarWidth = e.currentTarget.offsetWidth;
    const newTime = (clickX / progressBarWidth) * duration;
    audio.currentTime = newTime; // Điều chỉnh thời gian phát nhạc
    setProgress(newTime);
  };
  useEffect(() => {
    const fetchDetailSong = async () => {
      setIsLoadedSource(false);
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId),
      ]);
      setIsLoadedSource(true);
      if (res1.data.err === 0) {
        setSongInfo(res1.data.data);
        dispatch(actions.setCurSongData(res1.data.data));
      }
      if (res2.data.err === 0) {
        audio.pause();
        setAudio(new Audio(res2.data.data["128"]));
      } else {
        audio.pause();
        setAudio(new Audio());
        dispatch(actions.play(false));
        setProgress(0);
        setDuration(0);
        toast.warning(res2.data.msg);
      }
    };
    fetchDetailSong();
  }, [curSongId]);
  useEffect(() => {
    audio.volume = volume / 100;
  });
  useEffect(() => {
    audio.load();
    if (isPlaying) audio.play();
  }, [audio]);

  useEffect(() => {
    // Đặt sự kiện cập nhật progress bar khi audio đang phát
    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    // Dọn dẹp sự kiện
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audio]);
  useEffect(() => {
    const handleEnded = () => {
      console.log("shuflle: ", isShuffle);
      console.log("repeat:", repeatMode);
      if (isShuffle) {
        handleShuffle();
      } else if (repeatMode) {
        repeatMode === 1 ? handleRepeatOne() : handleNextSong();
      } else {
        audio.pause();
        dispatch(actions.play(false));
      }
    };
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audio, isShuffle, repeatMode]);
  // Tính toán phần trăm progress
  const calculateProgressPercentage = () => {
    if (duration > 0) {
      return (progress / duration) * 100;
    }
    return 0;
  };

  // Định dạng thời gian thành mm:ss
  const formatTime = (time) => {
    if (isNaN(time) || time < 0) {
      return "0:00";
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return moment.utc(time * 1000).format("m:ss");
  };
  const handleRepeatOne = () => {
    audio.play();
  };
  const handleToggleMusic = async () => {
    if (isPlaying) {
      audio.pause();
      dispatch(actions.play(false));
    } else {
      audio.play();
      dispatch(actions.play(true));
    }
  };
  const handleNextSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) {
          currentSongIndex = index;
        }
      });
      dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId));
      dispatch(actions.play(true));
    }
  };
  const handlePrevSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) {
          currentSongIndex = index;
        }
      });
      dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId));
      dispatch(actions.play(true));
    }
  };
  const handleShuffle = () => {
    const randomIndex = Math.round(Math.random() * songs?.length) - 1;
    dispatch(actions.setCurSongId(songs[randomIndex].encodeId));
    dispatch(actions.play(true));
  };

  return (
    <div
      style={{
        backgroundColor: customBackgoundColors.color_400,
        height: "100%",
      }}
      className="p-0 row container-fluid m-0"
    >
      <div className="col-md-3  d-flex align-items-center ">
        <div className="d-flex align-items-center">
          <img
            src={songInfo?.thumbnail}
            alt=""
            style={{ objectFit: "contain", width: "auto", height: "70px" }}
            className="rounded"
          />
          <div
            className="d-flex flex-column ms-3"
            style={{ fontSize: "14px", marginRight: "12px" }}
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

      <div className="col-md-6  d-flex flex-column align-items-center justify-content-center gap-1">
        <div className="d-flex gap-5 align-items-center justify-content-center">
          <span
            style={{ fontSize: "24px" }}
            className={`cursor-pointer ${isShuffle && "text-success"}`}
            onClick={() => setIsShuffle((prev) => !prev)}
            title="Phát ngẫu nhiên"
          >
            <IoIosShuffle />
          </span>
          <span
            onClick={handlePrevSong}
            style={{ fontSize: "24px" }}
            className={`${!songs ? "text-secondary" : "cursor-pointer"}`}
          >
            <MdSkipPrevious />
          </span>
          <span
            style={{ fontSize: "30px" }}
            className="hoverable-span"
            onClick={handleToggleMusic}
          >
            {!isLoadedSource ? (
              <LoadingSong />
            ) : isPlaying ? (
              <IoPauseCircleOutline />
            ) : (
              <IoPlayCircleOutline />
            )}
          </span>
          <span
            style={{ fontSize: "24px" }}
            className={`${!songs ? "text-secondary" : "cursor-pointer"}`}
            onClick={handleNextSong}
          >
            <MdSkipNext />
          </span>
          <span
            style={{ fontSize: "24px" }}
            className={`cursor-pointer ${repeatMode && "text-success"}`}
            title="Phát lặp lại tất cả"
            onClick={() => setRepeatMode((prev) => (prev === 2 ? 0 : prev + 1))}
          >
            {repeatMode === 1 ? (
              <RiRepeatOneLine size={24} />
            ) : (
              <IoIosRepeat size={24} />
            )}
          </span>
        </div>

        {/* Progress bar với thời gian */}
        <div className="progress-container">
          <div className="progress-time-start">
            <span>{formatTime(progress)}</span>
          </div>

          <div className="progress-bar-wrapper" onClick={handleProgressClick}>
            <div
              className="progress-bar"
              style={{ width: `${calculateProgressPercentage()}%` }}
            ></div>
            <div
              className="progress-handle"
              style={{
                left: `${calculateProgressPercentage()}%`, // Đặt vị trí của dấu chấm
              }}
            ></div>
          </div>

          <div className="progress-time-end">
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <div className="col-md-3  d-none d-xl-flex align-items-center justify-content-end gap-4">
        <div className="d-flex align-items-center gap-2">
          <span onClick={() => setVolume((prev) => (+prev === 0 ? 70 : 0))}>
            {+volume >= 50 ? (
              <FaVolumeUp />
            ) : +volume === 0 ? (
              <FaVolumeMute />
            ) : (
              <FaVolumeDown />
            )}
          </span>
          <input
            type="range"
            step={1}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
        </div>

        <span
          className="p-1 rounded cursor-pointer opacity-custom"
          style={{ backgroundColor: `${customBackgoundColors.color_500}` }}
          onClick={() => setIsShowRightSidebar((prev) => !prev)}
        >
          <BsMusicNoteList size={24} />
        </span>
      </div>
    </div>
  );
};

export default Player;
