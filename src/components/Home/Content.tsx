import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getImageRadom } from "../../actions/ImageActions";
import { RootStoreI } from "../../Store";
import { ImageI } from "../../actions/ImageActionTypes";
import Post from "../Post";
import { BiLoaderCircle } from "react-icons/bi";
import { AiOutlineReload } from "react-icons/ai";

const Content = () => {
  const dispatch = useDispatch();
  const { imageList, imageStreamFetching } = useSelector(
    (store: RootStoreI) => store.image
  );

  useEffect(() => {
    dispatch(getImageRadom());
  }, []);

  return (
    <React.Fragment>
      {imageList.map((imageProps: ImageI, index) => (
        <Post {...imageProps} key={`${imageProps.date}:${index}`}></Post>
      ))}
      {imageStreamFetching && (
        <BiLoaderCircle className="home__loader"></BiLoaderCircle>
      )}
      {!imageStreamFetching && !imageList.length && (
        <AiOutlineReload
          className="home__reload"
          onClick={() => dispatch(getImageRadom())}
        ></AiOutlineReload>
      )}
    </React.Fragment>
  );
};

export default Content;
