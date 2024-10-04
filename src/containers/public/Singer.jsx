import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetArtist } from "../../apis/music";
import icons from "../../ultis/Icons";
import { SongItem } from "../../components";
const { IoPersonAdd, FaPlayCircle } = icons;
const Singer = () => {
  const { singer } = useParams();
  const [artistData, setArtistData] = useState(null);
  // console.log(singer);
  useEffect(() => {
    const fetchArtistData = async () => {
      const res = await apiGetArtist(singer);
      console.log(res);
      if (res.data.err === 0) {
        setArtistData(res.data.data);
      }
    };
    singer && fetchArtistData();
  }, [singer]);
  return (
    <div className="d-flex flex-column w-100">
      <div className="position-relative">
        <img
          src={artistData?.cover}
          alt="background"
          style={{ objectFit: "cover", height: 230, width: "100%" }}
        />
        <div
          className="position-absolute px-3 text-light"
          style={{
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
          }}
        >
          <div className="d-flex flex-column gap-4">
            <div
              className="position-absolute bottom-0"
              style={{ paddingBottom: 24 }}
            >
              <div className="d-flex gap-4 align-items-center">
                <h1 style={{ fontSize: 50, fontWeight: "bold" }}>
                  {artistData?.name}
                </h1>
                <span className="cursor-pointer">
                  <FaPlayCircle size={42} />
                </span>
              </div>
              <div className="d-flex gap-4 align-items-center">
                <span style={{ fontSize: 14 }}>
                  {`${Number(
                    artistData?.totalFollow.toFixed(1)
                  ).toLocaleString()}`}{" "}
                  người quan tâm
                </span>
                <button
                  type="button"
                  className="px-4 py-1 rounded-pill border-0 text-light d-flex align-items-center justify-content-center gap-2"
                  style={{
                    backgroundColor: "#0E8080",
                    fontSize: 14,
                    width: "auto",
                  }}
                >
                  <span
                    style={{ display: "inline-flex", alignItems: "center" }}
                  >
                    <IoPersonAdd />
                  </span>
                  <span>QUAN TÂM</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row px-3 mt-5">
        <div className="col-md-12 border border-danger">
          <h3>Bài hát nổi bật</h3>
          <div className="d-flex flex-wrap w-100 justify-content-between ">
            {artistData?.sections
              .find((item) => item.sectionType === "song")
              ?.items?.filter((item, index) => index < 6)
              .map((item) => (
                <div key={item.encodeId} style={{ width: "30%" }}>
                  <SongItem
                    thumbnail={item.thumbnail}
                    title={item.title}
                    artists={item.artistsNames}
                    sid={item.encodeId}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div style={{ height: 500 }}></div>
    </div>
  );
};

export default Singer;
