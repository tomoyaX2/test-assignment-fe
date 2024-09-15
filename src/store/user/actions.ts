import axios from "axios";
import {
  ChangePasswordArgs,
  LoginArgs,
  SetPasswordArgs,
  SignupArgs,
  UploadAvatarArgs,
} from "./types";
import { appendTokenToHeaders } from "../../shared/api";
import { ACCESS_TOKEN_KEY } from "../../shared/constants";
import { createThunkWithCallbacks } from "@shared/createThunkWithCallbacks";

export const checkUser = createThunkWithCallbacks(
  "user/checkUser",
  async () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      appendTokenToHeaders(token);
      const response = await axios.get(`api/user`);
      return response.data;
    }
  }
);

export const login = createThunkWithCallbacks(
  "user/login",
  async (data: LoginArgs) => {
    const authResponse = await axios.post<{ access_token: string }>(
      `api/auth/login`,
      { email: data.email, password: data.password }
    );
    appendTokenToHeaders(authResponse.data.access_token);
    localStorage.setItem(ACCESS_TOKEN_KEY, authResponse.data.access_token);
    const response = await axios.get(`api/user`);
    return response.data;
  }
);

export const signup = createThunkWithCallbacks(
  "user/signup",
  async (data: SignupArgs) => {
    const authResponse = await axios.post<{ access_token: string }>(
      `api/auth/signup`,
      { email: data.email }
    );

    localStorage.setItem(ACCESS_TOKEN_KEY, authResponse.data.access_token);
    appendTokenToHeaders(authResponse.data.access_token);

    const response = await axios.get(`api/user`);
    return response.data;
  }
);

export const logout = createThunkWithCallbacks("user/logout", async () => {
  localStorage.removeItem("access_token");
});

export const setPassword = createThunkWithCallbacks<SetPasswordArgs>(
  "user/setPassword",
  async (data: SetPasswordArgs) => {
    await axios.post(`api/user/set-password`, {
      password: data.password,
      token: data.token,
    });
  }
);

export const uploadAvatar = createThunkWithCallbacks(
  "user/uploadAvatar",
  async ({ file }: UploadAvatarArgs) => {
    const formData = new FormData();

    formData.append("files", file);
    await axios.post(`api/user/upload-avatar`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
);

export const changePassword = createThunkWithCallbacks(
  "user/changePassword",
  async ({ oldPassword, newPassword }: ChangePasswordArgs) => {
    await axios.post(`api/user/change-password`, {
      oldPassword,
      newPassword,
    });
  }
);

export const changeEmail = createThunkWithCallbacks(
  "user/changeEmail",
  async () => {
    //TBD
  }
);
