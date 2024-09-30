import React from "react";
import { Outlet } from "react-router-dom";
import "./css/Search.css";
const Search = () => {
  return (
    <div>
      <div
        className="d-flex align-items-center border-bottom border-secondary py-1 px-4"
        style={{ marginBottom: 28, height: 50 }}
      >
        <span
          style={{ fontSize: 24, paddingRight: 24 }}
          className="fw-bold border-end border-secondary"
        >
          Kết quả tìm kiếm
        </span>
        <span style={{ fontSize: 14 }} className="d-flex align-items-center">
          <span className="px-4 search-category fw-semibold cursor-pointer">
            TẤT CẢ
          </span>
          <span className="px-4 search-category fw-semibold cursor-pointer">
            BÀI HÁT
          </span>
          <span className="px-4 search-category fw-semibold cursor-pointer">
            PLAYLIST/ALBUM
          </span>
        </span>
      </div>
      <div>
        <Outlet />
      </div>
      <div style={{ height: 120 }}></div>
    </div>
  );
};

export default Search;
