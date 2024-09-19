import React from "react";
import { ThreeCircles } from "react-loader-spinner";
import { memo } from "react";
const Loading = () => {
  return (
    <div>
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default memo(Loading);
