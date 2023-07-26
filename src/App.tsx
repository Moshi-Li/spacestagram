import { useEffect, Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RootState, useAppDispatch, useAppSelector } from "./store";
import { fetchHomeContent } from "./slices/homeSlice";
import { setModalOpen, setTargetImage } from "./slices/modalSlice";

import { HomeStatus } from "./slices/interface";

import Loading from "./components/Loader";
import ModalComponent from "./components/Modal";

import "./App.scss";

const MainComponent = lazy(() => import("./components/index"));

function App() {
  const { status } = useAppSelector((store: RootState) => store.homeReducer);
  const { isOpen } = useAppSelector((store: RootState) => store.modalReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHomeContent());

    const params = new URLSearchParams(location.search);
    const date = params.get("date");

    if (date !== null && new Date(date).toISOString().split("T")[0] === date) {
      dispatch(setModalOpen(true));
      dispatch(
        setTargetImage({
          targetImage: date,
        })
      );
    }
  }, [dispatch]);

  return (
    <Suspense fallback={<Loading />}>
      {(status === HomeStatus.Ready || status === HomeStatus.Adding) && (
        <>
          <MainComponent></MainComponent>
          {isOpen && <ModalComponent></ModalComponent>}
        </>
      )}
      {status === HomeStatus.Loading && <Loading />}
      <ToastContainer></ToastContainer>
    </Suspense>
  );
}

export default App;
