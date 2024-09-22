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
} from "./containers/public"; //src\containers\public\index.jsx
import { Routes, Route } from "react-router-dom";
import Path from "./ultis/path";
import { useEffect } from "react";
import * as actions from "./store/actions"; //src\store\actions\index.js
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getHome());
  });
  return (
    <>
      <div className="App">
        <Routes>
          <Route path={Path.GENERAL} element={<General />}>
            <Route path={Path.HOME} element={<Home />} />
            <Route path={Path.LOGIN} element={<Login />} />
            <Route path={Path.MY_MUSIC} element={<Personal />} />
            <Route path={Path.PLAYLIST_TITLE_PID} element={<Playlist />} />
            <Route path={Path.ALBUM_TITLE_PID} element={<Playlist />} />
            <Route path={Path.STAR} element={<Home />} />
            <Route path={Path.WEEKRANK_TITLE_PID} element={<WeekRank />} />
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
