import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  LeftSidebar,
  Rightsidebar,
  Player,
  Header,
  Loading,
} from "../../components";
import { customBackgoundColors } from "../../ultis/colors";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";
const General = () => {
  const columnClass = "col-xl-2 col-lg-3  d-flex m-0 p-0 ";
  const [isShowRightSidebar, setIsShowRightSidebar] = useState(true);
  const { isLoading } = useSelector((state) => state.app);
  return (
    <div
      style={{
        backgroundColor: customBackgoundColors.color_300,
        minHeight: "100vh",
      }}
      className="d-flex flex-column "
    >
      <div
        className="container-fluid row m-0 p-0 w-100 position-relative"
        style={{ minHeight: "100vh" }}
      >
        <div className={`${columnClass} justify-content-start ps-4 pt-3`}>
          <LeftSidebar />
        </div>
        <div
          className={`col-xl-8 col-lg-6  m-0 p-0  overflow-y-auto d-flex flex-column flex-grow-1 flex-shrink-1 position-relative ${
            !isShowRightSidebar ? "flex-grow-1" : ""
          }`}
          style={{ zIndex: 1, boxSizing: "border-box" }} // Ensure relative positioning and a lower zIndex for the parent
        >
          {isLoading && (
            <div
              className="position-absolute top-0 bottom-0 right-0 d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: customBackgoundColors.color_200,
                zIndex: 10, // Ensure this is higher than the parent's zIndex
                boxSizing: "border-box",
                width: "100%",
              }}
            >
              <Loading />
            </div>
          )}

          <div className="px-2 d-flex " style={{ height: "70px" }}>
            <Header className="w-100" />
          </div>
          <div className="flex-grow-1 flex-shrink-1 w-100">
            <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
              <Outlet />
            </Scrollbars>
          </div>
        </div>

        {isShowRightSidebar && (
          <div
            className={`${columnClass}  d-none d-xl-flex `}
            style={{ height: "100vh" }}
          >
            <Rightsidebar />
          </div>
        )}
      </div>
      <div
        style={{ height: "90px", zIndex: 1000 }}
        className="position-fixed bottom-0 w-100"
      >
        <Player setIsShowRightSidebar={setIsShowRightSidebar} />
      </div>
    </div>
  );
};

export default General;
