import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { AppProvider } from "@shopify/polaris";
import store from "./Store";
import enTranslations from "@shopify/polaris/locales/en.json";

import "@shopify/polaris/dist/styles.css";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <AppProvider i18n={enTranslations}>
      <App />
    </AppProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
