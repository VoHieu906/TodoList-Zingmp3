import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import * as actions from "../store/actions"; //
const SlickSlider = () => {
  const { banner } = useSelector((state) => state.app);
  const dispatch = useDispatch();
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
  const handleClickBanner = (item) => {
    if (item?.type === 4) {
      dispatch(actions.setCurSongId(item.encodeId));
    }
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {banner?.map((item) => (
          <div key={item.encodeId} className="px-2 py-2">
            <img
              src={item.banner}
              alt={`banner-${item.encodeId}`}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "25px",
              }}
              className=" img-fluid"
              onClick={() => handleClickBanner(item)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlickSlider;
