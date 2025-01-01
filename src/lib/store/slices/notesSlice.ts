import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type Note = {
  id: string;
  heading: string;
  content: string;
};

export interface NoteState {
  notes: Array<Note>;
}

const initialState: NoteState = {
  notes: [],
};

export const noteSlice = createSlice({
  reducers: {
    addNote: (
      state,
      action: PayloadAction<{ heading: string; content: string }>
    ) => {
      const note = action.payload;
      state.notes.push({ ...note, id: String(Date.now()) });
    },
    removeNote: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const notes = state.notes.filter((note) => note.id !== id);
      state.notes = notes;
    },
  },
  name: "notes-reducer",
  initialState,
});

// actions
export const { addNote, removeNote } = noteSlice.actions;

// selectors
export const selectNotes = (state: RootState) => state.notes.notes;

export default noteSlice.reducer;
