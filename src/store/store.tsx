import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import contentReducer from "./slices/contentSlice";
import loginReducer from "./slices/logInSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  content: contentReducer,
  isLogin: loginReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export { store };
