"use client";
import { useAppDispatch, useAppSelector } from "./hooks";
import { removeNote, selectNotes, addNote } from "./slices/notesSlice";
import {
  selectPreferences,
  toggleCompactMenu,
  toggleDarkMode,
  toggleNotificationOn,
} from "./slices/preferenceSlice";

export function useNotes() {
  const notes = useAppSelector(selectNotes);
  const dispatch = useAppDispatch();

  return {
    notesReducer: {
      notes,
      addNote: (data: { heading: string; content: string }) =>
        dispatch(addNote(data)),
      remoteNote: (id: string) => dispatch(removeNote(id)),
    },
  };
}

export function usePreferences() {
  const preferences = useAppSelector(selectPreferences);
  const dispatch = useAppDispatch();

  return {
    preferenceReducer: {
      preferences,
      toggleDarkMode: () => dispatch(toggleDarkMode()),
      toggleCompactMenu: () => dispatch(toggleCompactMenu()),
      toggleNotificationOn: () => dispatch(toggleNotificationOn()),
    },
  };
}
