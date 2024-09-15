import { ThunkCallbacks } from "@shared/createThunkWithCallbacks";

export interface User {
  id: string;
  email: string;
  avatar_url: string | null;
}

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginArgs extends ThunkCallbacks<void> {
  email: string;
  password: string;
}

export interface SignupArgs extends ThunkCallbacks<void> {
  email: string;
}

export interface SetPasswordArgs extends ThunkCallbacks<void> {
  password: string;
  token: string;
}

export interface UploadAvatarArgs extends ThunkCallbacks<void> {
  file: File;
}

export interface ChangePasswordArgs extends ThunkCallbacks<void> {
  oldPassword: string;
  newPassword: string;
}
