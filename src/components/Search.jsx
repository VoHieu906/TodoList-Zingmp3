import React, { useState, useEffect } from "react";
import Icons from "../ultis/Icons";
import { apiSearch } from "../apis";
import * as action from "../store/actions";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Path from "../ultis/Path";
const { BsSearch } = Icons;
const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const handleSearch = async (e) => {
    if (e.keyCode === 13) {
      dispatch(action.search(keyword));
      navigate({
        pathname: `/${Path.SEARCH}/${Path.ALL}`,
        search: createSearchParams({
          q: keyword,
        }).toString(),
      });
    }
  };
  return (
    <>
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
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyUp={handleSearch}
          style={{
            borderTopRightRadius: "25px",
            borderBottomRightRadius: "25px",
            boxShadow: "none",
            outline: "none",
            color: "gray",
          }}
        />
      </div>
    </>
  );
};

export default Search;
