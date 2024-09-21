import React, { useEffect } from "react";
import { Section, SlickSlider, NewRelease } from "../../components";
import { useSelector } from "react-redux";
import * as apis from "../../apis";
const Home = () => {
  const { hot, chill, top100, hAlbum } = useSelector((state) => state.app);
  return (
    <div className="overflow-y-auto">
      <SlickSlider />
      <Section data={hot} />
      <Section data={chill} />
      <NewRelease />
      <Section data={top100} />
      <Section data={hAlbum} />
      <div style={{ height: 500 }}></div>
    </div>
  );
};

export default Home;
