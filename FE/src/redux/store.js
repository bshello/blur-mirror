/*
redux의 경우 
1. combineRecuer를 통해 합친 reducer를 store에 전달
2. thunk
3. thunk를 apply할 수 있는 applyMiddleware
4. composeWithDevTools(리덕스 dev tool)를 전부 작성해 주었지만

redux/toolkit은 configureStore 만 있으면 된다.(위의 4가지 모두 자동화)
*/
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userEdit from "../redux/reducers/userEdit";
import MToggle from "../redux/reducers/MToggle";
import introEdit from "../redux/reducers/introEdit";
import saveTokenReducer from "./reducers/saveToken";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootReducer = combineReducers({
  user: userEdit,
  mt: MToggle,
  intro: introEdit,
  strr: saveTokenReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["strr"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
