import React from "react";
import ReactDOM from "react-dom";
import { Provider as StoreProvider } from "react-redux";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { AppProvider } from "@shopify/polaris";

import store from "./Store";
import enTranslations from "@shopify/polaris/locales/en.json";

import "@shopify/polaris/dist/styles.css";
import App from "./App";

const alterOptions = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...alterOptions}>
    <StoreProvider store={store}>
      <AppProvider i18n={enTranslations}>
        <App />
      </AppProvider>
    </StoreProvider>
  </AlertProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
