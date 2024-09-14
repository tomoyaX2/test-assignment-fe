import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SignupArgs } from "./types";
import { appendTokenToHeaders } from "../../shared/api";
import { ACCESS_TOKEN_KEY } from "../../shared/constants";

export const checkUser = createAsyncThunk("user/checkUser", async () => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (token) {
    appendTokenToHeaders(token);
    const response = await axios.get(`api/user`);
    return response.data;
  }
});

export const login = createAsyncThunk(
  "user/login",
  async (data: { email: string; password: string; onSuccess?: () => void }) => {
    const authResponse = await axios.post<{ access_token: string }>(
      `api/auth/login`,
      { email: data.email, password: data.password }
    );
    appendTokenToHeaders(authResponse.data.access_token);
    localStorage.setItem(ACCESS_TOKEN_KEY, authResponse.data.access_token);
    const response = await axios.get(`api/user`);
    data?.onSuccess?.();
    return response.data;
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async (data: SignupArgs) => {
    const authResponse = await axios.post<{ access_token: string }>(
      `api/auth/signup`,
      { email: data.email }
    );

    appendTokenToHeaders(authResponse.data.access_token);
    localStorage.setItem(ACCESS_TOKEN_KEY, authResponse.data.access_token);

    const response = await axios.get(`api/user`);
    data?.onSuccess?.();
    return response.data;
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("access_token");
});
