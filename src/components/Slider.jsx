import React from "react";
import { useSelector } from "react-redux";
const Slider = () => {
  const { banner } = useSelector((state) => state.app);
  console.log(banner);
  return (
    <div className="d-flex flex-column">
      {banner?.map((item) => (
        <img key={item.encodeId} src={item.banner} style={{ width: "100%" }} />
      ))}
    </div>
  );
};

export default Slider;
