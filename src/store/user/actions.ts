import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SignupArgs } from "./types";
import { appendTokenToHeaders } from "../../shared/api";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId: string) => {
    const response = await axios.get(`users/${userId}`);
    return response.data;
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (data: { email: string; password: string; onSuccess?: () => void }) => {
    const authResponse = await axios.post<{ access_token: string }>(
      `api/auth/login`,
      { email: data.email, password: data.password }
    );
    appendTokenToHeaders(authResponse.data.access_token);
    const response = await axios.get(`api/user`);
    data?.onSuccess?.();
    return response.data;
  }
);

export const signup = createAsyncThunk<void, SignupArgs>(
  "user/signup",
  async (data: SignupArgs) => {
    const authResponse = await axios.post<{ access_token: string }>(
      `api/auth/signup`,
      { email: data.email }
    );
    appendTokenToHeaders(authResponse.data.access_token);
    const response = await axios.get(`api/user`);
    data?.onSuccess?.();
    return response.data;
  }
);
