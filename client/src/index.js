import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./JS/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import '../node_modules/font-awesome/css/font-awesome.min.css'; 

ReactDOM.render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </>,
  document.getElementById("root")
);
