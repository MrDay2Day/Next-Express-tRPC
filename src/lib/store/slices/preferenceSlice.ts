import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type Preferences = {
  darkMode: boolean;
  compactMenu: boolean;
  notificationOn: boolean;
};

const initialState: Preferences = {
  darkMode: false,
  compactMenu: false,
  notificationOn: true,
};

export const preferenceSlice = createSlice({
  reducers: {
    toggleDarkMode: (state) => {
      return (state = { ...state, darkMode: !state.darkMode });
    },
    toggleCompactMenu: (state) => {
      return (state = { ...state, compactMenu: !state.compactMenu });
    },
    toggleNotificationOn: (state) => {
      return (state = { ...state, notificationOn: !state.notificationOn });
    },
  },
  name: "preferences-reducer",
  initialState,
});

// actions
export const { toggleDarkMode, toggleCompactMenu, toggleNotificationOn } =
  preferenceSlice.actions;

// selectors
export const selectPreferences = (state: RootState) => state.preferences;

export default preferenceSlice.reducer;
