import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SetPasswordArgs, SignupArgs, UploadAvatarArgs } from "./types";
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

    localStorage.setItem(ACCESS_TOKEN_KEY, authResponse.data.access_token);
    appendTokenToHeaders(authResponse.data.access_token);

    const response = await axios.get(`api/user`);
    data?.onSuccess?.();
    return response.data;
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("access_token");
});

export const setPassword = createAsyncThunk(
  "user/setPassword",
  async (data: SetPasswordArgs) => {
    try {
      await axios.post(`api/user/set-password`, {
        password: data.password,
        token: data.token,
      });
      data.onSuccess?.();
      return;
    } catch {
      data.onReject?.();
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  "user/uploadAvatar",
  async ({ file, onSuccess, onReject }: UploadAvatarArgs) => {
    try {
      const formData = new FormData();

      formData.append("files", file);
      await axios.post(`api/user/upload-avatar`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onSuccess?.();
      return;
    } catch {
      onReject?.();
    }
  }
);
