import React from "react";
import Icons from "../ultis/Icons";
const { BsSearch } = Icons;
const Search = () => {
  return (
    <>
      <form className="d-flex" style={{ color: "gray" }}>
        <div className="input-group">
          <span
            className="input-group-text bg-white border-0"
            id="search-icon"
            style={{
              borderTopLeftRadius: "25px",
              borderBottomLeftRadius: "25px",
              color: "gray",
            }}
          >
            <BsSearch size={24} />
          </span>
          <input
            type="search"
            className="form-control border-0"
            placeholder="Tìm kiếm bài hát, nghệ sĩ, ..."
            style={{
              borderTopRightRadius: "25px",
              borderBottomRightRadius: "25px",
              boxShadow: "none",
              outline: "none",
              color: "gray",
            }}
          />
        </div>
      </form>
    </>
  );
};

export default Search;
