import React, { useState } from "react";
import { memo } from "react";
import Slider from "react-slick";
import { SectionItem } from "./";
const Section = ({ data, number }) => {
  console.log(data);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: number || 5, // Hiển thị 5 item
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
    <div style={{ marginTop: 38 }} className="px-2 d-flex flex-column gap-4 ">
      <div className="d-flex align-items-center justify-content-between px-2">
        <h3 className="fw-bold text" style={{ fontSize: 20 }}>
          {data?.title}
        </h3>
        <span style={{ fontSize: 12 }}>TẤT CẢ</span>
      </div>
      <div className="slider-container">
        <Slider {...settings}>
          {data &&
            data?.items?.length > 0 &&
            data.items.map((item) => (
              <SectionItem
                key={item.encodeId}
                thumbnailM={item.thumbnailM}
                title={item.title}
                link={item.link}
                artistsNames={item.artistsNames}
                sortDescription={item.sortDescription}
                data={data}
              />
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default memo(Section);
