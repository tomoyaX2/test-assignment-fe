import axios from "axios";
import { GENERATED_FREE_LINK_KEY } from "../../shared/constants";
import { Link, LinkArgs } from "./types";
import { createThunkWithCallbacks } from "@shared/createThunkWithCallbacks";

export const convertLinkToShortFree = createThunkWithCallbacks(
  "links/convertToShortFree",
  async ({ url }: LinkArgs) => {
    const response = await axios.post<Link>("api/links/free/convert", {
      url,
    });

    localStorage.setItem(GENERATED_FREE_LINK_KEY, response.data.short_link);

    return response.data;
  }
);

export const convertLinkToShortAuth = createThunkWithCallbacks(
  "links/convertToShortAuth",
  async ({ url, expirationTime }: LinkArgs) => {
    const response = await axios.post<Link>("api/links/auth/convert", {
      url,
      expirationTime,
    });

    localStorage.setItem(GENERATED_FREE_LINK_KEY, response.data.short_link);

    return response.data;
  }
);

export const checkLink = createThunkWithCallbacks(
  "links/checkLink",
  async ({ url }: LinkArgs) => {
    const response = await axios.post<Link>("api/links/real", {
      shortLink: url,
    });
    return response.data;
  }
);
