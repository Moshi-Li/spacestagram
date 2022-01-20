import React from "react";
import { useSelector } from "react-redux";
import { BiLoaderCircle } from "react-icons/bi";

import { ImageI } from "../../actions/ImageActionTypes";
import { RootStoreI } from "../../Store";

import Post from "../Post";

import "./index.scss";

const Home = () => {
  const { imageFetching, imageList } = useSelector(
    (store: RootStoreI) => store.image
  );

  return (
    <div className="home">
      {imageFetching && imageList.length === 0 ? (
        <div className="home__loader">
          <BiLoaderCircle></BiLoaderCircle>
        </div>
      ) : imageList.length === 0 ? (
        <p>TODO Empty</p>
      ) : (
        <React.Fragment>
          {imageList.map((imageProps: ImageI, index) => (
            <Post {...imageProps} key={`${imageProps.date}:${index}`}></Post>
          ))}
          {imageFetching ? (
            <div className="home__loader">
              <BiLoaderCircle></BiLoaderCircle>
            </div>
          ) : null}
        </React.Fragment>
      )}
    </div>
  );
};

export default Home;
