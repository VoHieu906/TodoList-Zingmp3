import React from "react";
import { handleNumber } from "../ultis/fn";
import { IoPersonAddSharp } from "react-icons/io5";
const Artist = ({ thumbnailM, name, totalFollow }) => {
  return (
    <div className=" d-flex flex-column gap-3 m-3">
      <img
        src={thumbnailM}
        alt=""
        style={{ objectFit: "contain" }}
        className="rounded-circle"
      />
      <div className="d-flex flex-column gap-2">
        <span className="d-flex flex-column align-items-center">
          <span style={{ fontSize: 14 }}>{name}</span>
          <span style={{ fontSize: 12 }}>{`${handleNumber(
            totalFollow
          )} quan tâm`}</span>
        </span>

        <button
          type="btn"
          className="px-4 py-1 rounded-pill border-0 text-light d-flex align-items-center justify-content-center gap-2"
          style={{ backgroundColor: "#0E8080", fontSize: 14, width: "auto" }}
        >
          <span>
            <IoPersonAddSharp />
          </span>
          <span>QUAN TÂM</span>
        </button>
      </div>
    </div>
  );
};

export default Artist;
