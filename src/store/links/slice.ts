import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Link, LinksState } from "./types";

const initialState: LinksState = {
  links: [],
  loading: false,
  error: null,
};

const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    fetchLinksStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchLinksSuccess(state, action: PayloadAction<Link[]>) {
      state.loading = false;
      state.links = action.payload;
    },
    fetchLinkFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    reset(state) {
      state.links = [];
      state.error = null;
    },
  },
});

export const { fetchLinksStart, fetchLinksSuccess, fetchLinkFailure, reset } =
  linksSlice.actions;

export default linksSlice.reducer;
