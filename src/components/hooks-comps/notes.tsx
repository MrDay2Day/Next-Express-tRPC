"use client";

import { useNotes } from "../../lib/store/useStoreHook";

export default function Notes() {
  const notesReducer = useNotes().notesReducer;

  // const deleteNote = (noteId: string) => {
  //   notesReducer.remoteNote(noteId);
  // };
  const renderNotes = notesReducer.notes
    .map((_, i, arr) => arr[arr.length - 1 - i]) // Reverse Array
    .map((note) => (
      <div className="border rounded-lg my-5 p-5 max-w-52" key={note.id}>
        <h3>{note.heading}</h3>
        <p className="text-xs">{note.id}</p>
        <p>{note.content}</p>
        {/* <button
          className="w-40 bg-red-700 rounded-md my-2"
          onClick={() => deleteNote(note.id)}
        >
          Delete Note
        </button> */}
      </div>
    ));

  return (
    <>
      <div className="my-5 border-2 border-cyan-800">
        <h3>{"Client Component - Notes | Reducer -> Component"}</h3>
        {renderNotes}
      </div>
    </>
  );
}
