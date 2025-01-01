import { configureStore, combineReducers } from "@reduxjs/toolkit";
import noteReducer from "./slices/notesSlice";
import preferenceReducer from "./slices/preferenceSlice";

const rootReducer = combineReducers({
  notes: noteReducer,
  preferences: preferenceReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: {
      name: "Demo App",
      // Custom trace configuration
      trace: true,
      traceLimit: 25,
      // Additional options
      features: {
        pause: true, // pause recording actions
        lock: true, // lock/unlock dispatcher
        persist: true, // persist states to local storage
        export: true, // export history of actions
        import: "custom", // import history of actions
        jump: true, // jump back and forth (time travel)
        skip: true, // skip actions
        reorder: true, // reorder actions
        dispatch: true, // dispatch custom actions
        test: true, // generate tests for actions
      },
    },
    // Optional: Add middleware
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ["your/action/type"],
          // Ignore these field paths in all actions
          ignoredActionPaths: ["meta.arg", "payload.timestamp"],
          // Ignore these paths in the state
          ignoredPaths: ["items.dates"],
        },
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
