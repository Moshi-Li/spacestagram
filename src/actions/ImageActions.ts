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
  IMAGE_FETCH_TODAY_SUCCESS,
  IMAGE_FETCH_TODAY_FAIL,
  IMAGE_FETCH_TODAY_LOADING,
} from "./ImageActionTypes";

const defaultParam = {
  api_key: "4egLeim9H2planSVbobmSarfrCgcebdzvcxcAWaS",
};

export const getImageRadom =
  (count = 3) =>
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
      toastClient.error("Fail to get Radom Images");
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

export const getImageToday =
  () => async (dispatch: Dispatch<ImageDispatchTypeI>) => {
    try {
      dispatch({
        type: IMAGE_FETCH_TODAY_LOADING,
      });
      const date = new Date().toISOString().split("T")[0];
      const res = await axios.get("https://api.nasa.gov/planetary/apod", {
        params: { ...defaultParam, date },
      });
      dispatch({
        type: IMAGE_FETCH_TODAY_SUCCESS,
        payload: CamelConverter(res.data),
      });
    } catch (e) {
      dispatch({
        type: IMAGE_FETCH_TODAY_FAIL,
      });
      toastClient.error("Fail to get Image of the Day");
    }
  };
