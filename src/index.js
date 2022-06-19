import "./index.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import booksReducer from "./Redux/booksSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

const RRedux = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<RRedux />, document.getElementById("root"));
