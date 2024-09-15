import { createAsyncThunk } from "@reduxjs/toolkit";

export interface ThunkCallbacks<T> {
  onSuccess?: (result: T) => void;
  onReject?: () => void;
}

export function createThunkWithCallbacks<
  Payload extends ThunkCallbacks<Result>,
  Result = any
>(type: string, asyncFn: (payload: Payload) => Promise<Result>) {
  return createAsyncThunk(type, async (payload: Payload | undefined) => {
    if (payload) {
      const { onSuccess, onReject } = payload;

      try {
        const result = await asyncFn(payload);

        onSuccess?.(result);
        return result;
      } catch (error) {
        onReject?.();
        throw error;
      }
    }
  });
}
