import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import reduxConfig from "./redux.js";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
const store = reduxConfig();
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </StrictMode>
);
