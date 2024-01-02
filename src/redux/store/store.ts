import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { connectRouter, routerMiddleware } from "connected-react-router";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  PersistConfig,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { AuthReducer } from "../reducers/auth/auth.reducer";
import history from "./history";
import { SettingReducer } from "../reducers/setting/setting.reducer";
import { StoryReducer } from "../reducers/story/story.reducer";
import { BackgroundReducer } from "../reducers/backgound/background.reducer";

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: AuthReducer,
  setting: SettingReducer,
  story: StoryReducer,
  background : BackgroundReducer  
});

type RootState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }).concat(routerMiddleware(history)),
});

export const persistor = persistStore(store);

export default store;
