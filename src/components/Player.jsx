import React, { useEffect, useState } from "react";
import { customBackgoundColors, fontColor } from "../ultis/colors";
import { useSelector, useDispatch } from "react-redux";
import * as apis from "../apis";
import * as actions from "../store/actions";
import icons from "../ultis/Icons";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import "./Player.css";

const Player = () => {
  const {
    GoHeart,
    PiDotsThree,
    MdSkipNext,
    MdSkipPrevious,
    IoIosRepeat,
    IoIosShuffle,
    IoPauseCircleOutline,
    IoPlayCircleOutline,
  } = icons;

  const { curSongId, isPlaying, songs } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null);
  const [audio, setAudio] = useState(new Audio());
  const [progress, setProgress] = useState(0); // State để lưu progress
  const [duration, setDuration] = useState(0); // State để lưu tổng thời gian của bài hát
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
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
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId),
      ]);
      if (res1.data.err === 0) {
        setSongInfo(res1.data.data);
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
      console.log(isShuffle);

      if (isShuffle) {
        handleShuffle();
      } else if (isRepeat) {
        handleNextSong();
      } else {
        audio.pause();
        dispatch(actions.play(false));
      }
    };
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audio, isShuffle, isRepeat]);
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
    setIsShuffle((prev) => !prev);
    const randomIndex = Math.round(Math.random() * songs?.length) - 1;
    dispatch(actions.setCurSongId(songs[randomIndex].encodeId));
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

      <div className="col-md-6 border border-primary d-flex flex-column align-items-center justify-content-center gap-1">
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
            {isPlaying ? <IoPauseCircleOutline /> : <IoPlayCircleOutline />}
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
            className={`cursor-pointer ${isRepeat && "text-success"}`}
            title="Phát lặp lại tất cả"
            onClick={() => setIsRepeat((prev) => !prev)}
          >
            <IoIosRepeat />
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

      <div className="col-md-3 border border-primary d-none d-xl-flex">
        Volume
      </div>
    </div>
  );
};

export default Player;
