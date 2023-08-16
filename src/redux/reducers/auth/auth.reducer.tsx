import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthPayload, AuthState } from "./auth.type";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import history from "../../store/history";
import { auth, provider } from "../../../configs";

const initialState: AuthState = {
  accessToken: "",
  account: {},
  accountGoogle: {
    uid: "",
    displayName: "",
    photoURL: "",
    email: "",
  },
};

// REGISTER
export const authRegister = createAsyncThunk(
  "auth/authRegister",
  async (payload: AuthPayload) => {
    const { email, password } = payload;

    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  }
);

// LOGIN WITH ACCOUNT
export const authLoginWithAccount = createAsyncThunk(
  "auth/authLoginWithAccount",
  async (payload: AuthPayload) => {
    const { email, password } = payload;

    const { user } = await signInWithEmailAndPassword(auth, email, password);

    return user;
  }
);

// LOGIN WITH GOOGLE
export const authLoginWithGoogle = createAsyncThunk(
  "auth/authLoginWithGoogle",
  async () => {
    const { user } = await signInWithPopup(auth, provider);

    return user;
  }
);

const reducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogout: (state: AuthState) => {
      state.accessToken = "";
      history.push("/auth");
    },
  },
  extraReducers: (builder) => {
    // REGISTER
    builder.addCase(authRegister.pending, () => {
      toast.info("Đang đăng ký");
    });
    builder.addCase(authRegister.rejected, () => {
      toast.error("Đăng ký thất bại");
    });
    builder.addCase(authRegister.fulfilled, () => {
      toast.success("Đăng ký thành công");
    });

    // LOGIN WITH ACCOUNT
    builder.addCase(authLoginWithAccount.pending, () => {
      toast.info("Đang đăng nhập");
    });
    builder.addCase(authLoginWithAccount.rejected, () => {
      toast.error("Đăng nhập thất bại");
    });
    builder.addCase(authLoginWithAccount.fulfilled, (state, action: any) => {
      state.accessToken = action.payload.accessToken;
      toast.success("Đăng nhập thành công");
      history.push("/");
    });

    // LOGIN WITH GOOGLE
    builder.addCase(authLoginWithGoogle.rejected, () => {
      toast.error("Đăng nhập thất bại");
    });
    builder.addCase(authLoginWithGoogle.fulfilled, (state, action: any) => {
      state.accessToken = action.payload.accessToken;

      state.accountGoogle = {
        uid: action.payload.uid,
        displayName: action.payload.displayName,
        photoURL: action.payload.photoURL,
        email: action.payload.email,
      };

      toast.success("Đăng nhập thành công");
      history.push("/");
    });
  },
});

export const AuthAction = reducer.actions;
export const AuthReducer = reducer.reducer;
