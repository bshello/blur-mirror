import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import App from "./App";

// import "./index.css";                            index에서는 잘 사용하지 않음
// import reportWebVitals from "./reportWebVitals"; 리액트 성능 측정 도구(X)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// reportWebVitals();
