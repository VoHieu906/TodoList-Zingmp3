import React, { useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { RankList } from "../../components";
import "./css/WeekRank.css";

const WeekRank = ({ weekChart }) => {
  const { pid } = useParams();
  console.log(weekChart);
  useEffect(() => {}, [pid]);
  return (
    <div className="px-3 ">
      <div className="d-flex align-items-center mb-3">
        <h3 style={{ fontWeight: "bold", fontSize: 40, color: "#0E8080" }}>
          Bảng xếp hạng tuần
        </h3>
        <span>icon</span>
      </div>
      <div className="d-flex gap-5 mb-3">
        {weekChart?.map((item) => (
          <NavLink
            key={item.chartId}
            to={item.link.split(".")[0]}
            className={({ isActive }) =>
              isActive
                ? "active-style fw-semibold"
                : "not-active-style fw-semibold"
            }
          >
            {item.country === "vn"
              ? "VIỆT NAM"
              : item.country === "us"
              ? "US-UK"
              : item.country === "korea"
              ? "K-POP"
              : ""}
          </NavLink>
        ))}
      </div>
      <RankList
        data={weekChart?.find((item) => item?.link?.includes(pid))?.items}
        number={5}
        full
      />
    </div>
  );
};

export default WeekRank;
