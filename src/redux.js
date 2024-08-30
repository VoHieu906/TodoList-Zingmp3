import rootReducer from "./store/reducers/rootReducer"; // Nếu như export default thì ko cần dấu {}
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { persistStore } from "redux-persist";

const reduxConfig = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  const persistor = persistStore(store);
  return {
    store,
    persistor,
  };
};
export default reduxConfig;
