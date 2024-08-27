import React from "react";
import { Outlet } from "react-router-dom";
import { LeftSidebar, Rightsidebar } from "../../components";
const General = () => {
  const columnClass =
    "col-lg-2 col-md-3 pt-3 d-flex m-0 p-0 border border-secondary";
  return (
    <div>
      <div className="container-fluid row  m-0 p-0">
        <div className={`${columnClass}  justify-content-start ps-4`}>
          <LeftSidebar />
        </div>
        <div className="col-lg-8 col-md-6 pt-3 d-flex justify-content-center m-0 p-0 border border-primary">
          <Outlet />
        </div>
        <div className={`${columnClass}  justify-content-center`}>
          <Rightsidebar />
        </div>
      </div>
    </div>
  );
};

export default General;
