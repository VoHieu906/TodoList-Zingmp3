import React, { useEffect } from "react";
import { Header } from "../../components";
import * as apis from "../../apis";
const Home = () => {
  useEffect(() => {
    const fetchdata = async () => {
      const response = await apis.getHome();
      console.log(response);
    };
    fetchdata();
  }, []);
  return (
    <div className="overflow-y-auto">
      <div className="px-4 d-flex " style={{ height: "100px" }}>
        <Header className="w-100" />
      </div>
    </div>
  );
};

export default Home;
