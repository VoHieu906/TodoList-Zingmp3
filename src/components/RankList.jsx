import React, { useState, useEffect } from "react";
import { ListItem } from "../components";

const RankList = ({ data }) => {
  const [isShowFull, setIsShowFull] = useState(false);
  const [songs, setSongs] = useState(null);
  useEffect(() => {
    if (!isShowFull) {
      setSongs(data?.filter((item, index) => index < 10));
    } else {
      setSongs(data);
    }
  }, [isShowFull, data]);
  return (
    <div style={{ width: "100%" }}>
      {songs?.map((item, index) => (
        <ListItem
          key={item.encodeId}
          songData={item}
          isHideNote
          order={index + 1}
        />
      ))}
      <div className="d-flex justify-content-center m-3">
        <button
          type="button"
          className="btn rounded-pill show-full text-center"
          style={{
            width: 150,
            border: "1px solid #0E8080",
            color: "#0E8080",
          }}
          onClick={() => setIsShowFull((prev) => !prev)}
        >
          {isShowFull ? "Ẩn bớt" : "Xem tất cả"}
        </button>
      </div>
    </div>
  );
};

export default RankList;
