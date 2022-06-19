import { Route, Routes } from "react-router-dom";

import Home from "./Components/Home/Home";
import React from "react";
import SearcBar from "./Components/SearcBar";

class BooksApp extends React.Component {
  render() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="search" element={<SearcBar />} />
        </Routes>
      </div>
    );
  }
}

export default BooksApp;
