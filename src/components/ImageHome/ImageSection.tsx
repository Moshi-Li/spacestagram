import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { ImageDetail } from "../../slices/interface";

const ImageSection = ({ imageData }: { imageData: ImageDetail }) => {
  const [imageHeight, setImageHeight] = useState(0);

  return (
    <div className="image--section">
      <LazyLoadImage
        src={imageData.url}
        placeholderSrc={"/vite.svg"}
        width={468}
        height={imageHeight === 0 || imageHeight < 468 ? 468 : imageHeight}
        alt="Image Alt"
        effect="blur"
        onLoadedData={(e) => {
          const ratio = e.currentTarget.height / e.currentTarget.width;
          setImageHeight(468 * ratio);
        }}
      />
    </div>
  );
};

export default ImageSection;
