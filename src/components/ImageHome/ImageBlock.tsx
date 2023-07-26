import { ImageDetail } from "../../slices/interface";

import ImageSection from "./ImageSection";
import IconSection from "./IconSection";
import DescriptionSection from "./DescriptionSection";
import CommentSection from "./CommentSection";

const ImageBlock = ({ imageData }: { imageData: ImageDetail }) => {
  return (
    <article className="image--block">
      <ImageSection imageData={imageData}></ImageSection>
      <IconSection imageData={imageData}></IconSection>
      <DescriptionSection
        description={imageData.explanation}
      ></DescriptionSection>
      <CommentSection
        comments={imageData.comments.map((item) => item.text)}
        imageData={imageData}
      ></CommentSection>
    </article>
  );
};

export default ImageBlock;
