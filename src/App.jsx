import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";

import "react-toastify/dist/ReactToastify.css";
import {
  Home,
  Login,
  General,
  Personal,
  Playlist,
  WeekRank,
  ZingChart,
  Search,
  SearchSong,
  SearchAll,
  SearchPlaylist,
  Singer,
} from "./containers/public"; //src\containers\public\index.jsx
import { Routes, Route } from "react-router-dom";
import Path from "./ultis/path";
import { useEffect, useState } from "react";
import * as actions from "./store/actions"; //src\store\actions\index.js
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Bounce, ToastContainer } from "react-toastify";
import { apiGetChartHome } from "./apis";

function App() {
  const dispatch = useDispatch();
  const [weekChart, setWeekChart] = useState(null);
  useEffect(() => {
    dispatch(actions.getHome());
    const fetchChartData = async () => {
      const response = await apiGetChartHome();
      if (response.data.err === 0) {
        setWeekChart(response.data.data.weekChart);
      }
    };
    fetchChartData();
  }, []);
  return (
    <>
      <div className="App">
        <Routes>
          <Route path={Path.GENERAL} element={<General />}>
            <Route path={Path.HOME} element={<Home />} />
            <Route path={Path.LOGIN} element={<Login />} />
            <Route path={Path.MY_MUSIC} element={<Personal />} />
            <Route path={Path.PLAYLIST__TITLE__PID} element={<Playlist />} />
            <Route path={Path.ALBUM__TITLE__PID} element={<Playlist />} />
            <Route path={Path.STAR} element={<Home />} />
            <Route
              path={Path.WEEKRANK__TITLE__PID}
              element={
                <WeekRank weekChart={weekChart && Object.values(weekChart)} />
              }
            />
            <Route path={Path.ZING_CHART} element={<ZingChart />} />
            <Route path={Path.HOME__SINGER} element={<Singer />} />
            <Route path={Path.HOME_ARTIST__SINGER} element={<Singer />} />
            <Route path={Path.SEARCH} element={<Search />}>
              <Route path={Path.ALL} element={<SearchAll />} />
              <Route path={Path.SONG} element={<SearchSong />} />
              <Route path={Path.PLAYLIST_SEARCH} element={<SearchPlaylist />} />
            </Route>
          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
