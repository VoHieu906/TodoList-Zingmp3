import actionTypes from "./actionTypes";
import * as apis from "../../apis";
export const setCurSongId = (sid) => ({
  type: actionTypes.SET_CUR_SONG_ID,
  sid,
});
export const setCurSongData = (data) => ({
  type: actionTypes.SET_CUR_SONG_DATA,
  data,
});
export const play = (flag) => ({
  type: actionTypes.PLAY,
  flag,
});
export const playPlaylist = (flag) => ({
  type: actionTypes.SET_PLAYLIST,
  flag,
});
export const setPlaylist = (songs) => ({
  type: actionTypes.PLAYLIST,
  songs,
});
export const loading = (flag) => ({
  type: actionTypes.LOADING,
  flag,
});
export const setCurAlbumId = (pid) => ({
  type: actionTypes.SET_CUR_ALBUM_ID,
  pid,
});
export const setRecent = (data) => ({
  type: actionTypes.SET_RECENT,
  data,
});
export const search = (keyword) => async (dispatch) => {
  try {
    const response = await apis.apiSearch(keyword);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.SEARCH,
        data: response.data.data,
        keyword,
      });
    } else {
      dispatch({
        type: actionTypes.SEARCH,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.SEARCH,
      data: null,
    });
  }
};
