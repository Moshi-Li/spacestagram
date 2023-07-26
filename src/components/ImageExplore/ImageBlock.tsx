import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { useAppDispatch } from "../../store";
import { setModalOpen, setTargetImage } from "../../slices/modalSlice";
import { ImageDetail } from "../../slices/interface";

const SingularImage = ({ imageData }: { imageData: ImageDetail }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  return (
    <div
      className="image--container"
      onMouseEnter={() => setHovered(!hovered)}
      onMouseLeave={() => setHovered(!hovered)}
      onClick={() => {
        dispatch(setModalOpen(true));
        dispatch(setTargetImage({ targetImage: imageData.date }));
      }}
    >
      <LazyLoadImage
        src={imageData.url}
        placeholderSrc={"/vite.svg"}
        alt="Image Alt"
        effect="blur"
      />
      {hovered && (
        <div className="image--cover">
          <p>{imageData.explanation}</p>
        </div>
      )}
    </div>
  );
};

const ImageBlock = ({ imageData }: { imageData: ImageDetail[] }) => {
  return (
    <div className="image--block">
      {imageData.map((item) => {
        return <SingularImage key={item.date} imageData={item}></SingularImage>;
      })}
    </div>
  );
};

export default ImageBlock;
