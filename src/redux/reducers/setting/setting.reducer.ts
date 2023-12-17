import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SettingState } from "./setting.type";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../configs";
import { toast } from "react-toastify";

const initialState: SettingState = {
  loading: false,
  greeting: {
    title: "",
    content: "",
    status: false,
  },
  fileTray: {
    background: "",
    title: "",
    status: false,
    noticeErr: "",
  },
};

export const getGreetings = createAsyncThunk(
  "setting/getGreetings",
  async () => {
    const noticeRef = collection(db, "setting");

    const docSettings = await getDoc(doc(noticeRef, "Greeting"));

    if (docSettings.exists()) {
      return docSettings.data();
    } else {
      return {
        title: "",
        content: "",
        status: false,
      };
    }
  }
);

export const updateGreeting = createAsyncThunk(
  "setting/updateGreeting",
  async (payload: { title: string; content: string; status: boolean }) => {
    const noticeRef = collection(db, "setting");

    const docSettings = await getDoc(doc(noticeRef, "Greeting"));

    // Nếu chưa tồn tại, tạo mới
    if (!docSettings.exists()) {
      await setDoc(doc(noticeRef, "Greeting"), {
        title: payload.title,
        content: payload.content,
        status: payload.status,
      });
    }
    // Nếu đã tồn tại, update những trường thay đổi
    else {
      await updateDoc(doc(noticeRef, "Greeting"), {
        title: payload.title,
        content: payload.content,
        status: payload.status,
      });
    }

    return payload;
  }
);

export const getFileTray = createAsyncThunk("setting/getFileTray", async () => {
  const noticeRef = collection(db, "setting");

  const docSettings = await getDoc(doc(noticeRef, "FileTray"));

  if (docSettings.exists()) {
    return docSettings.data();
  } else {
    return {
      background: "",
      title: "",
      status: false,
      noticeErr: "",
    };
  }
});

export const updateFileTray = createAsyncThunk(
  "setting/updateFileTray",
  async (payload: {
    background: string;
    title: string;
    status: boolean;
    noticeErr: string;
  }) => {
    const noticeRef = collection(db, "setting");

    const docSettings = await getDoc(doc(noticeRef, "FileTray"));

    // Nếu chưa tồn tại, tạo mới
    if (!docSettings.exists()) {
      await setDoc(doc(noticeRef, "FileTray"), {
        background: payload.background,
        title: payload.title,
        status: payload.status,
        noticeErr: payload.noticeErr,
      });
    }
    // Nếu đã tồn tại, update những trường thay đổi
    else {
      await updateDoc(doc(noticeRef, "FileTray"), {
        background: payload.background,
        title: payload.title,
        noticeErr: payload.noticeErr,
        status: payload.status,
      });
    }

    return payload;
  }
);

const reducer = createSlice({
  name: "setting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGreetings.fulfilled, (state, action) => {
      if (action.payload) {
        state.greeting = {
          title: action.payload.title,
          content: action.payload.content,
          status: action.payload.status,
        };
      }
    });

    builder.addCase(updateGreeting.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateGreeting.fulfilled, (state, action) => {
      state.loading = false;
      state.greeting = action.payload;
      toast.success("Cập nhật thành công");
    });
    builder.addCase(updateGreeting.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getFileTray.fulfilled, (state, action) => {
      if (action.payload) {
        state.fileTray = {
          background: action.payload.background,
          title: action.payload.title,
          status: action.payload.status,
          noticeErr: action.payload.noticeErr,
        };
      }
    });

    builder.addCase(updateFileTray.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateFileTray.fulfilled, (state, action) => {
      state.loading = false;
      state.fileTray = action.payload;
      toast.success("Cập nhật thành công");
    });
    builder.addCase(updateFileTray.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const SettingAction = reducer.actions;
export const SettingReducer = reducer.reducer;
