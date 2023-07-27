import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import camelcaseKeys from "camelcase-keys";
import Axios from "axios";

import { RootState } from "../store";
import { ImageDetail, ExploreStatus } from "./interface";

const defaultValue: {
  images: ImageDetail[];
  status: ExploreStatus;
} = {
  images: [],
  status: ExploreStatus.Idle,
};

export const fetchExploreContent = createAsyncThunk<
  ImageDetail[],
  number,
  { state: RootState }
>("homeSlice/fetchExploreContent ", async (count = 6) => {
  try {
    const response = await Axios.get<ImageDetail[]>(
      "https://li-moshi.com/v1/apod",
      { params: { count: count * 1.5 } }
    );
    const data = camelcaseKeys(response.data);
    const results = data.filter((item) => item.mediaType !== "video");
    return results.slice(0, count);
  } catch (e) {
    return [];
  }
});

export const fetchMoreExploreContent = createAsyncThunk<
  ImageDetail[],
  number,
  { state: RootState }
>("homeSlice/fetchMoreExploreContent", async (count = 6) => {
  try {
    const response = await Axios.get<ImageDetail[]>(
      "https://li-moshi.com/v1/apod",
      { params: { count: count * 1.5 } }
    );
    const data = camelcaseKeys(response.data);

    console.log({
      count,
      real: data.filter((item) => {
        console.log(item.mediaType);
        if (item.mediaType !== "video") {
          return true;
        }
      }).length,
    });

    const results = data.filter((item) => item.mediaType !== "video");
    return results.slice(0, count);
  } catch (e) {
    return [];
  }
});

const exploreSlice = createSlice({
  name: "exploreSlice",
  initialState: defaultValue,
  reducers: {
    reset: (state) => {
      state.images = defaultValue.images;
      state.status = defaultValue.status;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExploreContent.pending, (state) => {
      state.status = ExploreStatus.Loading;
    });
    builder.addCase(fetchExploreContent.fulfilled, (state, action) => {
      state.status = ExploreStatus.Ready;
      state.images = [...state.images, ...action.payload];
    });
    builder.addCase(fetchExploreContent.rejected, (state) => {
      state.status = ExploreStatus.Error;
    });
    builder.addCase(fetchMoreExploreContent.pending, (state) => {
      state.status = ExploreStatus.Adding;
    });
    builder.addCase(fetchMoreExploreContent.fulfilled, (state, action) => {
      state.status = ExploreStatus.Ready;
      state.images = [...state.images, ...action.payload];
    });
    builder.addCase(fetchMoreExploreContent.rejected, (state) => {
      state.status = ExploreStatus.Error;
    });
  },
});

export const exploreReducer = exploreSlice.reducer;
export const { reset } = exploreSlice.actions;
