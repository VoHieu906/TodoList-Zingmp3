import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
import { useRef } from "react";
import "./css/SectionItem.css";
import Icons from "../ultis/Icons";
const SectionItem = ({
  thumbnailM,
  title,
  link,
  artistsNames,
  sortDescription,
  data,
}) => {
  const { PiDotsThreeBold, IoPlayCircleOutline, GoHeart, GoHeartFill } = Icons;
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();
  const imageRef = useRef();
  const handleHover = () => {
    setIsHover(true);
    imageRef.current.classList.add("scale");
  };
  const handleLeave = () => {
    setIsHover(false);
    imageRef.current.classList.remove("scale");
  };
  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      className="d-flex flex-column gap-2 flex-1 text-sm px-2 py-2 cursor-pointer "
      onClick={() => {
        navigate(link.split(".")[0], { state: { playAlbum: false } });
      }}
    >
      <div className="position-relative overflow-hidden rounded">
        {isHover && (
          <div
            className="position-absolute top-0 bottom-0 left-0 right-0 rounded text-light d-flex align-items-center justify-content-center gap-3"
            style={{
              backgroundColor: " rgba(0, 0, 0, 0.3)",
              width: "100%",
              zIndex: 40,
            }}
          >
            <span>
              <GoHeart size={25} />
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                navigate(link.split(".")[0], { state: { playAlbum: true } });
              }}
            >
              <IoPlayCircleOutline size={50} />
            </span>
            <span>
              <PiDotsThreeBold size={25} />
            </span>
          </div>
        )}
        <img
          ref={imageRef}
          src={thumbnailM}
          alt={title}
          className={`w-100 object-contain rounded `}
          style={{
            transition: "transform 0.5s ease", // Tạo hiệu ứng mượt mà
          }}
        />
      </div>

      <span className="fw-semibold">{`${title?.slice(0, 15)}...`}</span>
      {data?.sectionId === "h100" || data?.sectionId === "hAlbum" ? (
        <span>
          {artistsNames?.length >= 20
            ? `${artistsNames?.slice(0, 20)}...`
            : artistsNames}
        </span>
      ) : (
        <span>
          {sortDescription?.length >= 20
            ? `${sortDescription?.slice(0, 20)}...`
            : sortDescription}
        </span>
      )}
    </div>
  );
};

export default memo(SectionItem);
