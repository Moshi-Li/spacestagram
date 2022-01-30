import {
  ImageI,
  ImageDispatchTypeI,
  IMAGE_FETCH_STREAM_LOADING,
  IMAGE_FETCH_STREAM_SUCCESS,
  IMAGE_FETCH_STREAM_FAIL,
  IMAGE_FETCH_TODAY_SUCCESS,
  IMAGE_FETCH_TODAY_FAIL,
  IMAGE_FETCH_TODAY_LOADING,
  IMAGE_FETCH_DATE_SUCCESS,
  IMAGE_FETCH_DATE_FAIL,
} from "../actions/ImageActionTypes";

interface ImageStateI {
  imageList: ImageI[];
  imageToday: ImageI | undefined;
  imageStreamFetching: boolean;
  imageTodayFetching: boolean;
  imageShareFetching: boolean;
}

const imageDefaultState: ImageStateI = {
  imageList: [],
  imageToday: undefined,
  imageStreamFetching: false,
  imageTodayFetching: false,
  imageShareFetching: false,
};

const imageReducer = (
  state: ImageStateI = imageDefaultState,
  action: ImageDispatchTypeI
): ImageStateI => {
  switch (action.type) {
    case IMAGE_FETCH_STREAM_LOADING:
      return { ...state, imageStreamFetching: true };
    case IMAGE_FETCH_STREAM_FAIL:
      return { ...state, imageStreamFetching: false };
    case IMAGE_FETCH_STREAM_SUCCESS:
      return {
        ...state,
        imageStreamFetching: false,
        imageList: state.imageList.concat(action.payload),
      };

    case IMAGE_FETCH_DATE_SUCCESS:
      return {
        ...state,
        imageStreamFetching: state.imageStreamFetching,
        imageList: [action.payload].concat(state.imageList),
      };

    case IMAGE_FETCH_TODAY_LOADING:
      return { ...state, imageTodayFetching: true };
    case IMAGE_FETCH_TODAY_SUCCESS:
      return {
        ...state,
        imageTodayFetching: false,
        imageToday: action.payload,
      };
    case IMAGE_FETCH_TODAY_FAIL:
      return { ...state, imageTodayFetching: false, imageToday: undefined };

    case IMAGE_FETCH_DATE_FAIL:
    default:
      return state;
  }
};

export default imageReducer;
