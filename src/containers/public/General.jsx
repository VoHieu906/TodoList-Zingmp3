import React from "react";
import { Outlet } from "react-router-dom";
import { LeftSidebar, Rightsidebar, Player } from "../../components";
import { customBackgoundColors } from "../../ultis/colors";
const General = () => {
  const columnClass =
    "col-lg-2 col-md-3 pt-3 d-flex m-0 p-0 border border-secondary";
  return (
    <div
      style={{
        backgroundColor: customBackgoundColors.color_300,
        minHeight: "100vh",
      }}
      className="d-flex flex-column"
    >
      <div className="container-fluid row  m-0 p-0 flex-grow-1">
        <div className={`${columnClass}  justify-content-start ps-4`}>
          <LeftSidebar />
        </div>
        <div className="col-lg-8 col-md-6 pt-3 m-0 p-0 border border-primary">
          <Outlet />
        </div>
        <div className={`${columnClass}  justify-content-center`}>
          <Rightsidebar />
        </div>
      </div>
      <div style={{ height: "90px" }}>
        <Player />
      </div>
    </div>
  );
};

export default General;
