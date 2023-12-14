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
};

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

const reducer = createSlice({
  name: "setting",
  initialState,
  reducers: {
    handleLogout: (state) => {},
  },
  extraReducers: (builder) => {
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
  },
});

export const SettingAction = reducer.actions;
export const SettingReducer = reducer.reducer;
