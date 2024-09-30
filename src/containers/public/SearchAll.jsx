import React from "react";
import { useSelector } from "react-redux";
import { handleNumber } from "../../ultis/fn";
import { SongItem, ListItem, SectionItem, Artist } from "../../components";
import Slider from "react-slick";

import "./css/SearchAll.css";
const SearchAll = () => {
  const { searchData } = useSelector((state) => state.music);
  console.log(searchData);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Hiển thị 5 item
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 3, // Giảm số cột khi kích thước nhỏ hơn
        },
      },
      {
        breakpoint: 768, // mobile
        settings: {
          slidesToShow: 2, // Hiển thị 2 cột khi ở mobile
        },
      },
      {
        breakpoint: 480, // mobile nhỏ hơn
        settings: {
          slidesToShow: 1, // Hiển thị một cột khi ở kích thước rất nhỏ
        },
      },
    ],
  };

  return (
    <div
      className="d-flex flex-column w-100 px-4 w-100 gap-5"
      style={{ width: "100%" }}
    >
      <div className="d-flex flex-column">
        <h3 className="fs-4 fw-bold mb-3">Nổi bật</h3>
        <div className="d-flex gap-4">
          {searchData?.top && (
            <div
              style={{ padding: 10, backgroundColor: "#DDE4E4" }}
              className="d-flex gap-3 align-items-center flex-fill rounded cursor-pointer"
            >
              <img
                src={searchData.top.thumbnail}
                alt=""
                style={{ height: 84, width: 84, objectFit: "cover" }}
                className={`${
                  searchData.top.objectType === "artist" && "rounded-circle"
                }`}
              />
              <div className="d-flex flex-column" style={{ fontSize: 12 }}>
                <span style={{ marginBottom: 6 }}>
                  {searchData.top.objectType === "artist" ? "Nghệ sĩ " : ""}
                </span>
                <span style={{ fontSize: 14 }} className="fw-bold">
                  {searchData.top.title || searchData.top.name}
                </span>
                <span>
                  {searchData.top.objectType === "artist" &&
                    handleNumber(searchData?.artists[0]?.totalFollow)}{" "}
                  quan tâm
                </span>
              </div>
            </div>
          )}
          {searchData?.songs
            ?.filter((item, index) =>
              [...Array(2).keys()].some((i) => i === index)
            )
            ?.map((item) => (
              <div key={item.encodeId} className="flex-fill">
                <SongItem
                  title={item.title}
                  artists={item.artistsNames}
                  thumbnail={item.thumbnail}
                  sid={item.encodeId}
                  size="img-84"
                  style="bg-main-200"
                />
              </div>
            ))}
        </div>
      </div>
      <div className="d-flex flex-column">
        <h3 className="fs-4 fw-bold mb-3">Bài hát</h3>
        <div
          className="d-flex justify-content-between flex-wrap"
          style={{ width: "100%" }}
        >
          {searchData?.songs?.map((item, index) => (
            <div
              key={item.encodeId}
              className={`d-flex flex-fill ${
                index % 2 !== 0 ? "pl-4" : "pr-4"
              }`}
              style={{ width: "45%" }}
            >
              <ListItem songData={item} isHideAlbum />
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex flex-column">
        <h3 className="fs-4 fw-bold mb-3">Playlist/Album</h3>
        <div className="slider-container">
          <Slider {...settings}>
            {searchData?.playlists
              ?.filter((item, index) => index <= 4)
              ?.map((item) => (
                <SectionItem
                  key={item.encodeId}
                  thumbnailM={item.thumbnailM}
                  title={item.title}
                  link={item.link}
                  sortDescription={item.sortDescription}
                />
              ))}
          </Slider>
        </div>
      </div>
      <div className="d-flex flex-column">
        <h3 className="fs-4 fw-bold mb-3">Nghệ sĩ</h3>
        <div className="row" style={{ width: "100%" }}>
          {searchData?.artists?.map((item) => (
            <div key={item.id} className="col-md-3">
              <Artist
                name={item.name}
                thumbnailM={item.thumbnailM}
                totalFollow={item.totalFollow}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchAll;
