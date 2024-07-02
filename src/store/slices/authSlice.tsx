import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { db } from "@/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { User } from "@/props/props";

interface AuthState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  users: [],
  status: "idle",
  error: null,
};

export const addUserToFirestore = createAsyncThunk(
  "auth/addUserToFirestore",
  async (newUser: Omit<User, "id">) => {
    const docRef = await addDoc(collection(db, "auth"), newUser);
    return { id: docRef.id, ...newUser };
  },
);

export const fetchUsers = createAsyncThunk("auth/fetchUsers", async () => {
  try {
    const usersCollection = collection(db, "auth");
    const querySnapshot = await getDocs(usersCollection);

    const users: User[] = [];
    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        author: doc.data().author,
        email: doc.data().email,
        password: doc.data().password,
      });
    });

    return users;
  } catch (error: any) {
    throw new Error("Failed to fetch users: " + error.message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUserToFirestore.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addUserToFirestore.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "succeeded";
          state.users.push(action.payload);
        },
      )
      .addCase(addUserToFirestore.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add user";
      })
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

// Selectors
export const selectAllUsers = (state: RootState) => state.auth.users;
export const getAuthStatus = (state: RootState) => state.auth.status;
export const getAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
