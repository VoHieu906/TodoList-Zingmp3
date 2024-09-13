import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import * as actions from "../store/actions"; //
import { useNavigate } from "react-router-dom";
const SlickSlider = () => {
  const { banner } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 2, // Giảm số cột khi kích thước nhỏ hơn
        },
      },
      {
        breakpoint: 768, // mobile
        settings: {
          slidesToShow: 1, // Hiển thị một cột khi ở mobile
        },
      },
    ],
  };
  const handleClickBanner = (item) => {
    if (item?.type === 1) {
      dispatch(actions.setCurSongId(item.encodeId));
      dispatch(actions.play(true));
      dispatch(actions.setPlaylist(null));
    } else if (item?.type === 4) {
      const playlistPath = item?.link?.split(".")[0];
      console.log(playlistPath);

      navigate(playlistPath);
    } else {
      dispatch(actions.setPlaylist(null));
    }
    console.log(item.type);
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {banner?.map((item) => (
          <div
            key={item.encodeId}
            className="col-md-4 col-sm-6 col-12 px-2 py-2"
          >
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
