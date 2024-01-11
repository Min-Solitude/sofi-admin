import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StoryState } from "./story.type";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../configs";
import Swal from "sweetalert2";

const initialState: StoryState = {
  listStory: [],
  loading: false,
};

export const getAllStory = createAsyncThunk("story/getAllStory", async () => {
  const storiesSnapshot = await getDocs(collection(db, "stories"));

  const stories = [];

  for (let d of storiesSnapshot.docs) {
    const story = d.data();

    // Lấy uid của user từ story
    const userId = story.uid;

    // Call API lấy thông tin user dựa vào userId
    const userSnapshot = await getDoc(doc(db, "users", userId));

    const user = userSnapshot.data();

    // Gộp thông tin user vào story
    stories.push({
      ...story,
      account: user?.account,
      displayName: user?.displayName,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      photoURL: user?.photoURL,
      isVip: user?.vip?.isVip,
    });
  }

  return stories;
});

export const updateStatusStory = createAsyncThunk(
  "story/updateStatusStory",
  async (data: {
    id: string;
    status: 'pending' | 'approved' | 'rejected';
  }) => {

    const storyRef = doc(db, "stories", data.id);

    await updateDoc(storyRef, {
      status: data.status,
    });

    return data;
  }
);

const reducer = createSlice({
  name: "story",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllStory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllStory.fulfilled, (state, action: any) => {
      state.loading = false;
      state.listStory = action.payload;
    });
    builder.addCase(getAllStory.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateStatusStory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateStatusStory.fulfilled, (state, action: any) => {
      state.loading = false;
      Swal.fire({
        icon: "success",
        title: "Thành công!",
        text: "Cập nhật trạng thái thành công!",
      });

      if (state.listStory) {
        const index = state.listStory.findIndex(
          (story) => story.uid === action.payload.id  
        );
      
        if (index !== -1) {
          state.listStory[index].status = action.payload.status;
      
          state.listStory = [...state.listStory];
        }
      }
    });
    builder.addCase(updateStatusStory.rejected, (state) => {
      state.loading = false;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Cập nhật trạng thái thất bại!",
      });
    });
  },
});

export const StoryAction = reducer.actions;
export const StoryReducer = reducer.reducer;
