import React, { useEffect, useState } from "react";
import { apiGetArtist } from "../../apis/music";
import { useSelector } from "react-redux";
import { SectionItem } from "../../components";
import "./css/SearchPlaylist.css";
const SearchPlaylist = () => {
  const { searchData } = useSelector((state) => state.music);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await apiGetArtist(searchData?.top?.alias);
      if (res.data.err === 0) {
        setPlaylists(res.data.data.sections[1]);
      }
    };
    fetch();
  }, [searchData]);

  return (
    <div className="d-flex flex-column gap-8 px-4">
      <h3>Playlist/Album</h3>
      <div className="grid-container">
        {playlists &&
          playlists?.items?.length > 0 &&
          playlists.items.map((item) => (
            <SectionItem
              key={item.encodeId}
              thumbnailM={item.thumbnailM}
              title={item.title}
              link={item.link}
              artistsNames={item.artistsNames}
              sortDescription={item.sortDescription}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchPlaylist;
