import React, { useEffect } from "react";
import { Header, Slider } from "../../components";
import * as apis from "../../apis";
const Home = () => {
  return (
    <div className="overflow-y-auto">
      <div className="px-4 d-flex " style={{ height: "100px" }}>
        <Header className="w-100" />
      </div>
      <Slider />
    </div>
  );
};

export default Home;
