import { configureStore } from "@reduxjs/toolkit";
import tokenOperations from "./token-operations/reducer";
import wallet from "./wallet/reducer";
import application from "./application/reducer";
import tokens from "./tokens/reducer";
import createPool from './create-pool/reducer'

const store = configureStore({
  reducer: {
    tokenOperations,
    wallet,
    application,
    tokens,
    createPool
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
