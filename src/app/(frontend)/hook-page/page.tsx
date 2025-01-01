"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useNotes } from "../../../lib/store/useStoreHook";

const HookPage = (): JSX.Element => {
  const notesReducer = useNotes().notesReducer;

  const [formData, setFormData] = useState<{
    heading?: string;
    content?: string;
  } | null>(null);

  useEffect(() => {
    const x = notesReducer.notes;
    console.log({ notes: x.map((_, i, arr) => arr[arr.length - 1 - i]) });
    return () => {};
  }, [notesReducer.notes]);

  const deleteNote = (noteId: string) => {
    notesReducer.remoteNote(noteId);
  };

  const renderNotes = notesReducer.notes
    .map((_, i, arr) => arr[arr.length - 1 - i]) // Reverse Array
    .map((note) => (
      <div className="border rounded-lg my-5 p-5 max-w-52" key={note.id}>
        <h1>{note.heading}</h1>
        <p className="text-xs">{note.id}</p>
        <p>{note.content}</p>
        <button
          className="w-40 bg-red-700 rounded-md my-2"
          onClick={() => deleteNote(note.id)}
        >
          Delete Note
        </button>
      </div>
    ));

  function updateFormData(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function addToStore() {
    if (formData && formData.content && formData.heading) {
      notesReducer.addNote({
        heading: formData.heading,
        content: formData.content,
      });
    }
  }

  return (
    <div>
      <input
        className="my-2 rounded-md p-1 border-orange-800 border-2"
        name={"heading"}
        placeholder={"Heading"}
        value={formData?.heading || ""}
        onChange={updateFormData}
      />
      <br />
      <input
        className="my-2 rounded-md p-1 border-orange-800 border-2"
        name={"content"}
        placeholder={"Content"}
        value={formData?.content || ""}
        onChange={updateFormData}
      />
      <br />
      <button
        disabled={!formData || !formData.content || !formData.heading}
        className={`w-20 rounded-md my-2`}
        style={{
          backgroundColor:
            !formData || !formData.content || !formData.heading
              ? "darkgray"
              : "green",
          color:
            !formData || !formData.content || !formData.heading
              ? "black"
              : "white",
        }}
        onClick={() => addToStore()}
      >
        Add
      </button>

      <div className="">{renderNotes}</div>
    </div>
  );
};

export default HookPage;
