import { configureStore } from "@reduxjs/toolkit";
import tokenOperations from "./token-operations/reducer";
import wallet from "./wallet/reducer";
import application from "./application/reducer";
import tokens from "./tokens/reducer";

const store = configureStore({
  reducer: {
    tokenOperations,
    wallet,
    application,
    tokens
  },
});

export type RootState = ReturnType<typeof store.getState>;



export default store;
