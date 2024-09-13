import React, { useEffect } from "react";
import { Section, SlickSlider } from "../../components";
import * as apis from "../../apis";
const Home = () => {
  return (
    <div className="overflow-y-auto">
      <SlickSlider />
      <Section />
    </div>
  );
};

export default Home;
