import React, { useEffect } from "react";
import { ListItem, ListSong } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
const SearchSong = () => {
  const { searchData } = useSelector((state) => state.music);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getSearchSongs(searchData?.top?.id));
  }, [searchData]);
  console.log(searchData);

  return (
    <div>
      <div className="px-4">
        <ListSong isHideTitle />
      </div>
    </div>
  );
};

export default SearchSong;
