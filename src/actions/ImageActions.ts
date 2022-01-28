import React from "react";
import { Dispatch } from "redux";
import CamelConverter from "camelcase-keys";
import { toast as toastClient } from "react-toastify";
import axios, { AxiosError } from "axios";
import {
  ImageDispatchTypeI,
  IMAGE_FETCH_STREAM_LOADING,
  IMAGE_FETCH_STREAM_SUCCESS,
  IMAGE_FETCH_STREAM_FAIL,
  IMAGE_FETCH_DATE_SUCCESS,
  IMAGE_FETCH_DATE_FAIL,
} from "./ImageActionTypes";

const defaultParam = {
  api_key: "4egLeim9H2planSVbobmSarfrCgcebdzvcxcAWaS",
};

export const getImageRadom =
  (count = 5) =>
  async (dispatch: Dispatch<ImageDispatchTypeI>) => {
    try {
      dispatch({
        type: IMAGE_FETCH_STREAM_LOADING,
      });

      const res = await axios.get("https://api.nasa.gov/planetary/apod", {
        params: { ...defaultParam, count: count },
      });

      dispatch({
        type: IMAGE_FETCH_STREAM_SUCCESS,
        payload: CamelConverter(res.data),
      });
    } catch (e) {
      toastClient.error("Fetching Failed");
      dispatch({
        type: IMAGE_FETCH_STREAM_FAIL,
      });
    }
  };

export const getImageByDate =
  (date: string) => async (dispatch: Dispatch<ImageDispatchTypeI>) => {
    try {
      const res = await axios.get("https://api.nasa.gov/planetary/apod", {
        params: { ...defaultParam, date },
      });
      dispatch({
        type: IMAGE_FETCH_DATE_SUCCESS,
        payload: CamelConverter(res.data),
      });
    } catch (e) {
      toastClient.error("Fetching Failed");
      dispatch({
        type: IMAGE_FETCH_DATE_FAIL,
      });
    }
  };
