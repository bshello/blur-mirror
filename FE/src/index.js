import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
// import "./index.css";                            index에서는 잘 사용하지 않음
// import reportWebVitals from "./reportWebVitals"; 리액트 성능 측정 도구(X)
import App from "./App";
import rootReducer from "./reducer";

const store = createStore(rootReducer, composeWithDevTools);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// reportWebVitals();
