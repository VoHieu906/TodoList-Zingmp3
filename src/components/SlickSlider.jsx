import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
const SlickSlider = () => {
  const { banner } = useSelector((state) => state.app);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {banner?.map((item) => (
          <div key={item.encodeId} className="p-3">
            <img
              src={item.banner}
              alt={`banner-${item.encodeId}`}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "25px",
              }}
              className=" img-fluid"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlickSlider;
