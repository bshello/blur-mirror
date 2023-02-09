import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { persistor, store } from "../src/redux/store";
import { PersistGate } from "redux-persist/integration/react";

// import "./index.css";                            index에서는 잘 사용하지 않음
// import reportWebVitals from "./reportWebVitals"; 리액트 성능 측정 도구(X)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
<<<<<<< HEAD
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
=======
    <App />
>>>>>>> 417fd0020f435bfb56f7f88a36ee46ed75fa25ce
  </Provider>
);

// reportWebVitals();
{
  /* </React.StrictMode> */
}
