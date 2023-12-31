import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SettingState } from "./setting.type";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../configs";
import { toast } from "react-toastify";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

const initialState: SettingState = {
  loading: false,
  greeting: {
    title: "",
    content: "",
    status: false,
    image: "",
    layout: false,
  },
  fileTray: {
    background: "",
    title: "",
    status: false,
    noticeErr: "",
  },
  header: {
    logo: null,
    btnNotice: false,
    btnFullscreen: false,
    btnDarkMode: false,
    profile: false,
    layout: false,
    status: false,
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
        image: "",
        layout: false,
      };
    }
  }
);

export const updateGreeting = createAsyncThunk(
  "setting/updateGreeting",
  async (payload: {
    title: string;
    content: string;
    status: boolean;
    image: string;
    layout: boolean;
  }) => {
    const noticeRef = collection(db, "setting");

    const docSettings = await getDoc(doc(noticeRef, "Greeting"));

    // Nếu chưa tồn tại, tạo mới
    if (!docSettings.exists()) {
      await setDoc(doc(noticeRef, "Greeting"), {
        title: payload.title,
        content: payload.content,
        status: payload.status,
        image: payload.image,
        layout: payload.layout,
      });
    }
    // Nếu đã tồn tại, update những trường thay đổi
    else {
      await updateDoc(doc(noticeRef, "Greeting"), {
        title: payload.title,
        content: payload.content,
        status: payload.status,
        image: payload.image,
        layout: payload.layout,
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

// GENERAL

export const getHeader = createAsyncThunk("setting/getHeader", async () => {
  const noticeRef = collection(db, "setting");

  const docSettings = await getDoc(doc(noticeRef, "Header"));

    return docSettings.data();
});

export const updateHeader = createAsyncThunk(
  "setting/updateHeader",
  async (payload: {
    btnNotice: boolean;
    btnFullscreen: boolean;
    btnDarkMode: boolean;
    profile: boolean;
    layout: boolean;
    status: boolean;
  }) => {
    try {
      const noticeRef = collection(db, "setting");

      const docSettings = await getDoc(doc(noticeRef, "Header"));

      // Nếu chưa tồn tại, tạo mới
      if (!docSettings.exists()) {
        await setDoc(doc(noticeRef, "Header"), {
          btnNotice: payload.btnNotice,
          btnFullscreen: payload.btnFullscreen,
          btnDarkMode: payload.btnDarkMode,
          profile: payload.profile,
          layout: payload.layout,
          status: payload.status,
        });
      }
      // Nếu đã tồn tại, update những trường thay đổi
      else {
        await updateDoc(doc(noticeRef, "Header"), {
          btnNotice: payload.btnNotice,
          btnFullscreen: payload.btnFullscreen,
          btnDarkMode: payload.btnDarkMode,
          profile: payload.profile,
          layout: payload.layout,
          status: payload.status,
        });
      }

      return payload;
    } catch (error) {
      console.log(error);
    }
  }
);

export const uploadLogo = createAsyncThunk(
  "setting/uploadLogo",
  async (payload: any) => {
    try {
      // check has logo remove old logo
      const noticeRef = collection(db, "setting");
      const docSettings = await getDoc(doc(noticeRef, "Header"));
      if (docSettings.exists()) {
        const oldLogo = docSettings.data().logo;
        if (oldLogo) {
          await deleteObject(ref(storage, oldLogo));
        }
      }

      // upload new logo
      const storageRef = ref(storage, `logo/${payload.name}`);
      await uploadBytes(storageRef, payload);
      const url = await getDownloadURL(storageRef);

      // update logo
      await updateDoc(doc(noticeRef, "Header"), {
        logo: url,
      });
  } catch (error) {
      console.log(error);
  }

  return null;
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
          image: action.payload.image,
          layout: action.payload.layout,
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

    builder.addCase(getHeader.fulfilled, (state, action) => {
      if (action.payload) {
        state.header = {
          logo: action.payload.logo,
          btnNotice: action.payload.btnNotice,
          btnFullscreen: action.payload.btnFullscreen,
          btnDarkMode: action.payload.btnDarkMode,
          profile: action.payload.profile,
          layout: action.payload.layout,
          status: true,
        };
      }
    });

    builder.addCase(updateHeader.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateHeader.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.header = action.payload;
      }
      toast.success("Cập nhật thành công");
    });
    builder.addCase(updateHeader.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(uploadLogo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadLogo.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.header.logo = action.payload;
      }
      toast.success("Cập nhật thành công");
    });
    builder.addCase(uploadLogo.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const SettingAction = reducer.actions;
export const SettingReducer = reducer.reducer;
