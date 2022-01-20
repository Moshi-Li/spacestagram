import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getImageRadom, getImageByDate } from "./actions/ImageActions";

import Header from "./components/Header";
import Home from "./components/Home";

import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("UP");

  useEffect(() => {
    const dateToday = new Date().toISOString().split("T")[0];
    const dateShare = new URLSearchParams(window.location.search).get("share");

    dispatch(getImageRadom());
    if (dateShare !== null && dateShare !== dateToday) {
      Promise.resolve()
        .then(() => dispatch(getImageByDate(dateToday)))
        .then(() => dispatch(getImageByDate(dateShare)));
    } else {
      Promise.resolve().then(() => dispatch(getImageByDate(dateToday)));
    }
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
      dispatch(getImageRadom(2));
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
