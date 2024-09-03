import React, { memo } from "react";
import ListItem from "./ListItem";
const ListSong = ({ songs, totalDuration }) => {
  console.log({ songs, totalDuration });
  return (
    <div className="d-flex flex-column text-sm ">
      <div className="d-flex align-items-center justify-content-between p-2 fw-semibold ">
        <span style={{ width: "50%" }}>BÀI HÁT</span>
        <span style={{ width: "30%" }}>ALBUM</span>
        <span style={{ width: "20%" }} className="text-end">
          THỜI GIAN
        </span>
      </div>
      <div className="d-flex flex-column gap-2">
        {songs?.map((item) => (
          <ListItem key={item.encodeId} songData={item} />
        ))}
      </div>
    </div>
  );
};

export default memo(ListSong); //Dùng memo để ko render khi component cha render lại
