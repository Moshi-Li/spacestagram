import {
  ImageI,
  ImageDispatchTypeI,
  IMAGE_FETCH_LOADING,
  IMAGE_FETCH_SUCCESS,
  IMAGE_FETCH_FAIL,
} from "../actions/ImageActionTypes";

interface ImageStateI {
  imageList: ImageI[];
  imageFetching: boolean;
}

const imageDefaultState: ImageStateI = {
  imageList: [],
  imageFetching: false,
};

const imageReducer = (
  state: ImageStateI = imageDefaultState,
  action: ImageDispatchTypeI
): ImageStateI => {
  switch (action.type) {
    case IMAGE_FETCH_LOADING:
      return { imageFetching: true, imageList: state.imageList };
    case IMAGE_FETCH_FAIL:
      return { imageFetching: false, imageList: state.imageList };
    case IMAGE_FETCH_SUCCESS:
      return {
        imageFetching: false,
        imageList: state.imageList.concat(action.payload),
      };
    default:
      return state;
  }
};

export default imageReducer;
