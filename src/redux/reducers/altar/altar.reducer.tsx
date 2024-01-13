import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../configs";
import { AltarState } from "./altar.types";

const initialState: AltarState = {
  data: [],
  loading: false,
};

export const getAllAltar = createAsyncThunk("altar/getAllAltar", async () => {
  const altarRef = await getDocs(collection(db, "altars"));

  const altar = [];

  for (let d of altarRef.docs) {
    const story = d.data();

    // Lấy uid của user từ story
    const userId = story.uid;

    // Call API lấy thông tin user dựa vào userId
    const userSnapshot = await getDoc(doc(db, "users", userId));

    const user = userSnapshot.data();

    // Gộp thông tin user vào story
    altar.push({
      ...story,
      account: user?.account,
      displayName: user?.displayName,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      photoURL: user?.photoURL,
    });
  }

  return altar;
});

const reducer = createSlice({
  name: "altar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get
    builder.addCase(getAllAltar.fulfilled, (state, action: any) => {
      state.data = action.payload;
    });
  },
});

export const AltarAction = reducer.actions;
export const AltarReducer = reducer.reducer;
