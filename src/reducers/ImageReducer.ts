import {
  ImageI,
  ImageDispatchTypeI,
  IMAGE_FETCH_STREAM_LOADING,
  IMAGE_FETCH_STREAM_SUCCESS,
  IMAGE_FETCH_STREAM_FAIL,
  IMAGE_FETCH_DATE_SUCCESS,
  IMAGE_FETCH_DATE_FAIL,
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
    case IMAGE_FETCH_STREAM_LOADING:
      return { imageFetching: true, imageList: state.imageList };
    case IMAGE_FETCH_STREAM_FAIL:
      return { imageFetching: false, imageList: state.imageList };
    case IMAGE_FETCH_STREAM_SUCCESS:
      return {
        imageFetching: false,
        imageList: state.imageList.concat(action.payload),
      };

    case IMAGE_FETCH_DATE_SUCCESS:
      return {
        imageFetching: state.imageFetching,
        imageList: [action.payload].concat(state.imageList),
      };

    case IMAGE_FETCH_DATE_FAIL:
    default:
      return state;
  }
};

export default imageReducer;
