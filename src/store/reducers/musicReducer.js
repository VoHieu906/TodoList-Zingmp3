import actionTypes from "../actions/actionTypes";
const initState = {
  curSongId: null,
  isPlaying: false,
  atPlaylist: false,
  songs: null,
  curSongData: null,
  curAlbumId: null,
  searchData: {},
  recentSongs: [],
  keyword: "",
};
const musicReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_CUR_SONG_ID:
      return {
        ...state,
        curSongId: action.sid || null,
      };
    case actionTypes.SET_CUR_SONG_DATA:
      return {
        ...state,
        curSongData: action.data || null,
      };
    case actionTypes.PLAY:
      return {
        ...state,
        isPlaying: action.flag,
      };
    case actionTypes.SET_PLAYLIST:
      return {
        ...state,
        atPlaylist: action.flag,
      };
    case actionTypes.PLAYLIST:
      return {
        ...state,
        songs: action.songs || null,
      };
    case actionTypes.SET_CUR_ALBUM_ID:
      return {
        ...state,
        curAlbumId: action.pid || null,
      };
    case actionTypes.SEARCH:
      return {
        ...state,
        searchData: action.data || {},
        keyword: action.keyword || "",
      };

    case actionTypes.SET_RECENT: {
      let songs = state.recentSongs;

      if (action.data) {
        // Loại bỏ bài hát nếu đã có trong danh sách
        if (songs?.some((i) => i.sid === action.data.sid)) {
          songs = songs.filter((i) => i.sid !== action.data.sid);
        }

        // Giới hạn số lượng bài hát nếu vượt quá 2 bài
        if (songs?.length > 20) {
          songs = songs.filter((i, index, self) => index !== self.length - 1);
        }

        // Thêm bài hát mới vào đầu danh sách
        songs = [action.data, ...songs];
      }
      return {
        ...state,
        recentSongs: songs,
      };
    }

    default:
      return state;
  }
};
export default musicReducer;
