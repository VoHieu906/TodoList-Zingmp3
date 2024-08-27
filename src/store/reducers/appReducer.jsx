import actionTypes from "../actions/actionTypes";
const initState = {
  home: [],
  test: "hello",
};
const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      return;

    default:
      return state;
  }
};
export default appReducer;
