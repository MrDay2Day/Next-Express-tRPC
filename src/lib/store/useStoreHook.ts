"use client";
import * as UseHooks from "./hooks";
import * as NoteSlice from "./slices/notesSlice";
import * as PreferenceSlice from "./slices/preferenceSlice";

export function useNotes() {
  const notes = UseHooks.useAppSelector(NoteSlice.selectNotes);
  const dispatch = UseHooks.useAppDispatch();

  return {
    notesReducer: {
      notes,
      addNote: (data: { heading: string; content: string }) =>
        dispatch(NoteSlice.addNote(data)),
      remoteNote: (id: string) => dispatch(NoteSlice.removeNote(id)),
    },
  };
}

export function usePreferences() {
  const preferences = UseHooks.useAppSelector(
    PreferenceSlice.selectPreferences
  );
  const dispatch = UseHooks.useAppDispatch();

  return {
    preferenceReducer: {
      preferences,
      toggleDarkMode: () => dispatch(PreferenceSlice.toggleDarkMode()),
      toggleCompactMenu: () => dispatch(PreferenceSlice.toggleCompactMenu()),
      toggleNotificationOn: () =>
        dispatch(PreferenceSlice.toggleNotificationOn()),
    },
  };
}
