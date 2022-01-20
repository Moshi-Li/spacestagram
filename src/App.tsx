import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetImageRadom } from "./actions/ImageActions";

import Header from "./components/Header";
import Home from "./components/Home";

import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("UP");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get("share"));

    dispatch(GetImageRadom());
  }, [dispatch]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    setScrollDirection(
      scrollPosition > e.currentTarget.scrollTop ? "UP" : "DOWN"
    );
    setScrollPosition(e.currentTarget.scrollTop);

    if (
      e.currentTarget.scrollTop + e.currentTarget.clientHeight >=
      e.currentTarget.scrollHeight
    ) {
      dispatch(GetImageRadom());
    }
  };

  return (
    <div className="app" onScroll={handleScroll}>
      <Header scrollDirection={scrollDirection}></Header>
      <div className="content">
        <Home></Home>
      </div>
    </div>
  );
}

export default App;
