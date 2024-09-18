import React from "react";
import { RotatingLines } from "react-loader-spinner";
import { memo } from "react";
const LoadingSong = () => {
  return (
    <RotatingLines
      visible={true}
      height="30"
      width="30"
      color="black"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default memo(LoadingSong);
