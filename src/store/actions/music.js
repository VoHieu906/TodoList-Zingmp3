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
// export const fetchDetailPlayList = (pid) => async (dispatch) => {
//   try {
//     const response = await apis.apiGetDetailPlaylist(pid);

//     if (response?.data.err === 0) {
//       dispatch({
//         type: actionTypes.PLAYLIST,
//         songs: response.data?.data?.items,
//       });
//     }
//   } catch (error) {
//     dispatch({
//       type: actionTypes.PLAYLIST,
//       songs: null,
//     });
//   }
// };
