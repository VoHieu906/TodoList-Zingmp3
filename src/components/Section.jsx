import React from "react";
import { memo } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

const Section = () => {
  const { hot } = useSelector((state) => state.app);
  const navigate = useNavigate();
  console.log(hot);
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
    <div style={{ marginTop: 38 }} className="px-2 d-flex flex-column gap-5 ">
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="fw-bold text" style={{ fontSize: 20 }}>
          {hot?.title}
        </h3>
        <span style={{ fontSize: 12 }}>TẤT CẢ</span>
      </div>
      <div className="slider-container">
        <Slider {...settings}>
          {hot &&
            hot?.items?.length > 0 &&
            hot.items.map((item) => (
              <div
                key={item.encodeId}
                className="d-flex flex-column gap-2 flex-1 text-sm px-2 py-2 cursor-pointer"
              >
                <img
                  src={item.thumbnailM}
                  alt={item.title}
                  onClick={() => {
                    navigate(item?.link?.split(".")[0]);
                    console.log(item?.link?.split(".")[0]);
                  }}
                  className="w-100 object-contain rounded-lg"
                />

                <span className="fw-semibold">{`${item.title?.slice(
                  0,
                  19
                )}...`}</span>
                <span>{`${item.sortDescription?.slice(0, 40)}...`}</span>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default memo(Section);
