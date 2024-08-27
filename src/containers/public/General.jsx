import React from "react";
import { Outlet } from "react-router-dom";
const General = () => {
  return (
    <div>
      General
      <Outlet />
    </div>
  );
};

export default General;
