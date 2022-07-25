import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import swap from "./swap/reducer";
import tokens from "./tokens/reducer";
import wallet from "./wallet/reducer";
import { load, save } from "redux-localstorage-simple";

const PERSISTED_KEYS: string[] = ["tokens"];

const store = configureStore({
  reducer: {
    swap,
    tokens,
    wallet,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }).concat(
      save({ states: PERSISTED_KEYS, debounce: 1000 })
    ),
  preloadedState: load({ states: PERSISTED_KEYS }),
});

setupListeners(store.dispatch);

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
