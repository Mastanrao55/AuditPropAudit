import { configureStore, combineReducers, AnyAction } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const appReducer = combineReducers({
  auth: authReducer,
});

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: AnyAction) => {
  // Reset all state to initial state on logout
  if (action.type === "RESET_ROOT_STATE") {
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Action to reset all Redux state
export const resetRootState = () => ({
  type: "RESET_ROOT_STATE" as const,
});

