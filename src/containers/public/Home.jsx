import React from "react";
import { Header } from "../../components";
const Home = () => {
  return (
    <div className="overflow-y-auto">
      <div className="px-4 d-flex " style={{ height: "100px" }}>
        <Header className="w-100" />
      </div>
    </div>
  );
};

export default Home;
