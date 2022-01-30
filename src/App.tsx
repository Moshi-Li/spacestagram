import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast as toastClient } from "react-toastify";

import { getImageRadom, getImageByDate } from "./actions/ImageActions";
import { RootStoreI } from "./Store";

import Header from "./components/Header";
import Home from "./components/Home";

import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const { imageStreamFetching } = useSelector(
    (store: RootStoreI) => store.image
  );
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("UP");

  useEffect(() => {
    toastClient.info(
      "NASA API is not reliable in recently days. Images might not be able to load."
    );

    const dateShare = new URLSearchParams(window.location.search).get("share");

    if (dateShare !== null) {
      dispatch(getImageByDate(dateShare));
    }
  }, [dispatch]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    setScrollDirection(
      scrollPosition > e.currentTarget.scrollTop ? "UP" : "DOWN"
    );
    setScrollPosition(e.currentTarget.scrollTop);

    if (
      e.currentTarget.scrollTop + e.currentTarget.clientHeight >=
        e.currentTarget.scrollHeight &&
      !imageStreamFetching
    ) {
      dispatch(getImageRadom(2));
    }
  };

  return (
    <div className="app" onScroll={handleScroll}>
      <Header scrollDirection={scrollDirection}></Header>

      <Home></Home>
    </div>
  );
}

export default App;
