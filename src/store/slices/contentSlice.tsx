import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { db, storage } from "@/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { RootState } from "@/store/store";
import { ContentItem } from "@/props/props";

interface ContentState {
  content: ContentItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ContentState = {
  content: [],
  status: "idle",
  error: null,
};

export const fetchContent = createAsyncThunk(
  "content/fetchContent",
  async () => {
    const querySnapshot = await getDocs(collection(db, "content"));
    const contentList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ContentItem[];
    return contentList;
  },
);

export const addContentToFirestore = createAsyncThunk(
  "content/addContentToFirestore",
  async (
    newContent: Omit<ContentItem, "id" | "source"> & { videoFile: File },
  ) => {
    const videoFile = newContent.videoFile;

    if (!videoFile) {
      throw new Error("No video file provided");
    }

    const storageRef = ref(storage, `videos/${videoFile.name}`);
    await uploadBytes(storageRef, videoFile);
    const url = await getDownloadURL(storageRef);

    const docRef = await addDoc(collection(db, "content"), {
      title: newContent.title,
      author: newContent.author,
      description: newContent.description,
      source: url,
    });

    return { id: docRef.id, ...newContent, source: url };
  },
);

export const deleteContentFromFirestore = createAsyncThunk(
  "content/deleteContentFromFirestore",
  async (id: string) => {
    await deleteDoc(doc(db, "content", id));
    return id;
  },
);

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchContent.fulfilled,
        (state, action: PayloadAction<ContentItem[]>) => {
          state.status = "succeeded";
          state.content = action.payload;
        },
      )
      .addCase(fetchContent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch content";
      })
      .addCase(
        addContentToFirestore.fulfilled,
        (state, action: PayloadAction<ContentItem>) => {
          state.content.push(action.payload);
        },
      )
      .addCase(
        deleteContentFromFirestore.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.content = state.content.filter(
            (item) => item.id !== action.payload,
          );
        },
      );
  },
});

export const selectAllContent = (state: RootState) => state.content.content;
export const getContentStatus = (state: RootState) => state.content.status;
export const getContentError = (state: RootState) => state.content.error;

export default contentSlice.reducer;
