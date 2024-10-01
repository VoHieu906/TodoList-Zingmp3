import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useSearchParams } from "react-router-dom";
import "./css/Search.css";
import { SearchMenu } from "../../ultis/Menu";
import { useSelector } from "react-redux";
const searchnotActiveStyle =
  "px-4 search-category fw-semibold cursor-pointer not-active text-dark";
const searchactiveStyle =
  "px-4 search-category fw-semibold cursor-pointer active";
const Search = () => {
  const { keyword } = useSelector((state) => state.music);
  console.log(keyword);

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
        <div style={{ fontSize: 14 }} className="d-flex align-items-center">
          {SearchMenu.map((item) => (
            <NavLink
              key={item.path}
              to={`${item.path}?q=${keyword.replace("", "+")}`}
              className={({ isActive }) =>
                isActive ? searchactiveStyle : searchnotActiveStyle
              }
              style={{ textDecoration: "none" }}
            >
              {item.text}
            </NavLink>
          ))}
        </div>
      </div>
      <div>
        <Outlet />
      </div>
      <div style={{ height: 120 }}></div>
    </div>
  );
};

export default Search;
