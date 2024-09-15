import { ThunkCallbacks } from "@shared/createThunkWithCallbacks";

export interface Link {
  id: string;
  created_date: string;
  real_link: string;
  short_link: string;
}

export interface LinksState {
  links: Link[];
  loading: boolean;
  error: string | null;
}

export interface LinkArgs extends ThunkCallbacks<Link> {
  url: string;
  expirationTime?: number;
}
