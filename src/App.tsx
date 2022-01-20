import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStoreI } from "./Store";
import { GetImageRadom } from "./actions/ImageActions";
import { Button } from "@shopify/polaris";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const imageStore = useSelector((store: RootStoreI) => store.image);
  useEffect(() => {
    dispatch(GetImageRadom());
  }, [dispatch]);

  return (
    <div className="App">
      {imageStore.imageFetching ? (
        <p>Loading</p>
      ) : imageStore.imageList.length === 0 ? (
        <p>Empty</p>
      ) : (
        <p>has</p>
      )}
    </div>
  );
}

export default App;
