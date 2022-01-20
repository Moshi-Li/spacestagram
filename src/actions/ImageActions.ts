import { Dispatch } from "redux";
import axios from "axios";
import {
  ImageDispatchTypeI,
  IMAGE_FETCH_LOADING,
  IMAGE_FETCH_SUCCESS,
  IMAGE_FETCH_FAIL,
} from "./ImageActionTypes";

export const GetImageRadom =
  (count = 5) =>
  async (dispatch: Dispatch<ImageDispatchTypeI>) => {
    try {
      dispatch({
        type: IMAGE_FETCH_LOADING,
      });

      const res = await axios.get(
        "https://api.nasa.gov/planetary/apod?count=3&api_key=4egLeim9H2planSVbobmSarfrCgcebdzvcxcAWaS"
      );
      console.log(res.data);
      dispatch({
        type: IMAGE_FETCH_SUCCESS,
        payload: [],
      });
    } catch (e) {
      dispatch({
        type: IMAGE_FETCH_FAIL,
      });
    }
  };
