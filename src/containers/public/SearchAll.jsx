import React from "react";
import { useSelector } from "react-redux";
import { handleNumber } from "../../ultis/fn";
const SearchAll = () => {
  const { searchData } = useSelector((state) => state.music);
  console.log(searchData);

  return (
    <div className="d-flex flex-column w-100 px-2 w-100">
      <div className="">
        <h3 className="fs-4 fw-bold mb-5">Nổi bật</h3>
        <div className="d-flex gap-5">
          {searchData?.top && (
            <div
              style={{ padding: 10, backgroundColor: "#DDE4E4" }}
              className="d-flex gap-3 align-items-center flex-fill rounded"
            >
              <img
                src={searchData.top.thumbnail}
                alt=""
                style={{ height: 84, width: 84, objectFit: "cover" }}
                className={`${
                  searchData.top.objectType === "artist" && "rounded-circle"
                }`}
              />
              <div className="d-flex flex-column" style={{ fontSize: 12 }}>
                <span style={{ marginBottom: 6 }}>
                  {searchData.top.objectType === "artist" ? "Nghệ sĩ " : ""}
                </span>
                <span style={{ fontSize: 14 }} className="fw-bold">
                  {searchData.top.title || searchData.top.name}
                </span>
                <span>
                  {searchData.top.objectType === "artist" &&
                    handleNumber(searchData?.artists[0]?.totalFollow)}{" "}
                  quan tâm
                </span>
              </div>
            </div>
          )}
          <div className="flex-fill">song 1</div>
          <div className="flex-fill">song 2</div>
        </div>
      </div>
    </div>
  );
};

export default SearchAll;
