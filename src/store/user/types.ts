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

export interface SignupArgs {
  email: string;
  onSuccess?: () => void;
}

export interface SetPasswordArgs {
  password: string;
  token: string;
  onSuccess?: () => void;
  onReject?: () => void;
}

export interface UploadAvatarArgs {
  file: File;
  onSuccess?: () => void;
  onReject?: () => void;
}

export interface ChangePasswordArgs {
  oldPassword: string;
  newPassword: string;
  onSuccess?: () => void;
  onReject?: () => void;
}
