import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SongItem } from "./";

const NewRelease = () => {
  const { newRelease } = useSelector((state) => state.app);
  const [isActive, setIsActive] = useState(0);
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    if (isActive === 0) {
      setSongs(newRelease?.items?.all);
    } else if (isActive === 1) {
      setSongs(newRelease?.items?.vPop);
    } else {
      setSongs(newRelease?.items?.others);
    }
  }, [isActive, newRelease]);
  return (
    <div
      style={{ marginTop: 38, fontSize: 12 }}
      className="px-2 d-flex flex-column gap-2"
    >
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="fw-bold text" style={{ fontSize: 20 }}>
          {newRelease?.title}
        </h3>
        <span style={{ fontSize: 12 }}>TẤT CẢ</span>
      </div>
      <div>
        <button
          onClick={() => setIsActive(0)}
          type="button"
          className={`ms-3 py-1 px-4 rounded-pill border border-success ${
            isActive === 0 && "bg-success text-light"
          }`}
        >
          TẤT CẢ
        </button>
        <button
          onClick={() => setIsActive(1)}
          type="button"
          className={`ms-3 py-1 px-4 rounded-pill border border-success ${
            isActive === 1 && "bg-success text-light"
          }`}
        >
          VIỆT NAM
        </button>
        <button
          onClick={() => setIsActive(2)}
          type="button"
          className={`ms-3 py-1 px-4 rounded-pill border border-success ${
            isActive === 2 && "bg-success text-light"
          }`}
        >
          QUỐC TẾ
        </button>
      </div>
      <div className="d-flex flex-wrap w-100 justify-content-center ">
        {songs?.slice(0, 15).map((item) => (
          <div key={item.encodeId} style={{ width: "30%" }}>
            <SongItem
              thumbnail={item.thumbnail}
              title={item.title}
              artists={item.artistsNames}
              releaseDate={item.releaseDate}
              sid={item.encodeId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewRelease;
