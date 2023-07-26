import { Suspense, lazy, useState } from "react";

import NavBar from "./NavBar";
import Loading from "./Loader";
import ImageHome from "./ImageHome";

import "./index.scss";

const ExploreComponent = lazy(() => import("./ImageExplore"));

const MainComponent = () => {
  const [atHome, setAtHome] = useState(true);

  return (
    <>
      <NavBar setHome={setAtHome}></NavBar>
      {atHome === true && <ImageHome></ImageHome>}
      {atHome === false && (
        <Suspense fallback={<Loading />}>
          <ExploreComponent></ExploreComponent>
        </Suspense>
      )}
    </>
  );
};

export default MainComponent;
