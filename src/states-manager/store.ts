import { combineReducers, configureStore } from "@reduxjs/toolkit";
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
import triviaReducer from "./triviaSlice";
import web3Reducer from "./web3Slice"; // Import your web3 slice

// Persist configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["trivia"], // Only persist the 'trivia' slice
};

// Combine your reducers
const rootReducer = combineReducers({
  trivia: triviaReducer,
  web3: web3Reducer, // Web3 slice is not persisted
});

// Creating a persisted reducer,web3 slice is excluded from the persistence
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

export default store;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
