import { useCallback } from "react";
import { toast } from "react-toastify";
import { GoComment, GoPaperAirplane } from "react-icons/go";

import { useAppDispatch } from "../../store";
import { setModalOpen, setTargetImage } from "../../slices/modalSlice";
import { ImageDetail } from "../../slices/interface";

//import { useColorScheme } from "../../hooks/colorScheme";

const IconSection = ({ imageData }: { imageData: ImageDetail }) => {
  const dispatch = useAppDispatch();

  const commentClick = useCallback(() => {
    dispatch(setModalOpen(true));
    dispatch(
      setTargetImage({
        targetImage: imageData.date,
        imageDetail: imageData,
      })
    );
  }, [dispatch, imageData]);

  const shareClick = useCallback(() => {
    navigator.clipboard.writeText(
      `${location.origin}${location.pathname}?date=${imageData.date}`
    );
    toast("Share link copied to clipboard", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }, [imageData.date]);

  return (
    <div className="icon--section">
      <span onClick={() => commentClick()}>
        <GoComment></GoComment>
      </span>
      <span onClick={() => shareClick()}>
        <GoPaperAirplane></GoPaperAirplane>
      </span>
    </div>
  );
};

export default IconSection;
