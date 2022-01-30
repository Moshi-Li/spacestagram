import React from "react";

import Content from "./Content";
import SideContent from "./SideContent";

import "./index.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="home__content">
        <Content></Content>
      </div>
      <div className="home__side"></div>
      <SideContent></SideContent>
    </div>
  );
};

export default Home;
