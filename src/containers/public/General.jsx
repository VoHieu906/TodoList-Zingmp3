import React from "react";
import { Outlet } from "react-router-dom";
import { LeftSidebar, Rightsidebar, Player, Header } from "../../components";
import { customBackgoundColors } from "../../ultis/colors";

const General = () => {
  const columnClass =
    "col-xl-2 col-lg-3 pt-3 d-flex m-0 p-0 border border-secondary";

  return (
    <div
      style={{
        backgroundColor: customBackgoundColors.color_300,
        minHeight: "100vh",
      }}
      className="d-flex flex-column"
    >
      <div className="container-fluid row m-0 p-0 w-100 h-100 position-relative">
        <div className={`${columnClass} justify-content-start ps-4`}>
          <LeftSidebar />
        </div>
        <div
          style={{ minHeight: 0 }}
          className="col-xl-8 col-lg-6 pt-3 m-0 p-0 border border-primary overflow-y-auto d-flex flex-column"
        >
          <div className="px-2 d-flex" style={{ height: "70px" }}>
            <Header className="w-100" />
          </div>
          <Outlet />
          <div className="w-100" style={{ height: 500 }}></div>
        </div>
        <div
          className={`${columnClass} justify-content-center d-none d-xl-flex`}
        >
          <Rightsidebar />
        </div>
      </div>
      <div
        style={{ height: "90px", zIndex: 1000 }}
        className="position-fixed bottom-0 w-100"
      >
        <Player />
      </div>
    </div>
  );
};

export default General;
