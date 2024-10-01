import React, { useState } from "react";
import { handleNumber } from "../ultis/fn";
import { IoPersonAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./css/Artist.css";
const Artist = ({ thumbnailM, name, totalFollow, link }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div className=" d-flex flex-column gap-3 m-3">
      <Link
        className="position-relative rounded-circle cursor-pointer"
        style={{ overflow: "hidden" }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        to={link}
      >
        <img
          src={thumbnailM}
          alt="singer"
          style={{
            objectFit: "cover",
            width: "100%",
            transition: "transform 0.5s ease",
          }}
          className={`rounded-circle ${isHover && "scale"}`}
        />
        {isHover && (
          <div
            className="position-absolute top-0 bottom-0 rounded-circle"
            style={{ width: "100%", backgroundColor: "rgba(0, 0, 0, 0.3)" }}
          ></div>
        )}
      </Link>

      <div className="d-flex flex-column gap-2">
        <span className="d-flex flex-column align-items-center">
          <Link
            to={link}
            style={{ fontSize: 14, color: "inherit" }}
            className=" text-hover"
          >
            {name}
          </Link>
          <span style={{ fontSize: 12 }}>{`${handleNumber(
            totalFollow
          )} quan tâm`}</span>
        </span>

        <button
          type="btn"
          className="px-4 py-1 rounded-pill border-0 text-light d-flex align-items-center justify-content-center gap-2"
          style={{ backgroundColor: "#0E8080", fontSize: 14, width: "auto" }}
        >
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            <IoPersonAdd
              style={{ fontSize: "1.2em", verticalAlign: "middle" }}
            />
          </span>
          <span>QUAN TÂM</span>
        </button>
      </div>
    </div>
  );
};

export default Artist;
