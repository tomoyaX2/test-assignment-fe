export interface User {
  id: string;
  email: string;
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
