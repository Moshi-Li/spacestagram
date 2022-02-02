import React from "react";
import ReactDOM from "react-dom";
import { Provider as StoreProvider } from "react-redux";

import { ToastContainer } from "react-toastify";

import store from "./Store";

import "react-toastify/dist/ReactToastify.css";

import App from "./App";

ReactDOM.render(
  <StoreProvider store={store}>
    <App />
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </StoreProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
