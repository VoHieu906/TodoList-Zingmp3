import React, { useEffect } from "react";
import {
  Section,
  SlickSlider,
  NewRelease,
  ChartSection,
} from "../../components";
import { useSelector } from "react-redux";
import * as apis from "../../apis";
import { Link } from "react-router-dom";
const Home = () => {
  const { hot, chill, top100, hAlbum, weekChart } = useSelector(
    (state) => state.app
  );
  console.log({ hot });

  return (
    <div className="overflow-y-auto">
      <SlickSlider />
      <Section data={hot} />
      <Section data={chill} />
      <NewRelease />
      <Section data={top100} />
      <Section data={hAlbum} />
      <ChartSection />
      <div className="d-flex align-items-center w-100 mt-5 ">
        {weekChart?.map((item) => (
          <Link
            to={item?.link?.split(".")[0]}
            key={item.link}
            className="flex-grow-1 px-3"
          >
            <img
              src={item.cover}
              alt="cover"
              className="img-cover rounded w-100"
            />
          </Link>
        ))}
      </div>
      <div style={{ height: 500 }}></div>
    </div>
  );
};

export default Home;
