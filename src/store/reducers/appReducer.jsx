import actionTypes from "../actions/actionTypes";
const initState = {
  banner: [],
  hot: {},
};
const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      return {
        ...state,
        banner:
          action.homeData?.find((item) => item.sectionId === "hSlider")
            ?.items || null,
        hot:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme1") ||
          {},
      };

    default:
      return state;
  }
};
export default appReducer;
