import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GENERATED_FREE_LINK_KEY } from "../../shared/constants";
import { Link } from "./types";

export const convertLinkToShortFree = createAsyncThunk(
  "links/convertToShort",
  async ({
    url,
    onSuccess,
  }: {
    url: string;
    onSuccess?: (link: Link) => void;
  }) => {
    const response = await axios.post<Link>("api/links/free/convert", {
      url,
    });

    onSuccess?.(response.data);

    localStorage.setItem(GENERATED_FREE_LINK_KEY, response.data.short_link);

    return response.data;
  }
);

export const checkLink = createAsyncThunk(
  "links/checkLink",
  async ({
    url,
    onSuccess,
    onReject,
  }: {
    url: string;
    onSuccess?: (link: Link) => void;
    onReject?: () => void;
  }) => {
    try {
      const response = await axios.post<Link>("api/links/real", {
        shortLink: url,
      });

      onSuccess?.(response.data);
    } catch {
      onReject?.();
    }
  }
);
