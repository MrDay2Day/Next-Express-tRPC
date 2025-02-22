/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef } from "react";
import { createReactEditorJS } from "react-editor-js";
import { useCallback, useMemo, useState } from "react";
import { OutputData } from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "./editorjs.config";
import { EditorCore, EditorJsType } from "./editor.js.types";

function EditorJsComponent(props?: EditorJsType) {
  const editorCore = useRef<EditorCore | null>(null);
  const [data] = useState<OutputData>(
    props && props.data
      ? props.data
      : {
          time: new Date().getTime(),
          blocks: [],
        }
  );
  const [error, setError] = useState<string | null>(null);

  const [ReactEditorJS] = useMemo(() => {
    const REJs = createReactEditorJS();
    return [REJs];
  }, []);

  const handleInitialize = useCallback(
    (instance: EditorCore) => {
      editorCore.current = instance;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ReactEditorJS]
  );

  const handleSave = useCallback(async () => {
    try {
      if (editorCore.current) {
        const savedData = await editorCore.current.save();
        if (props?.updateData) {
          props.updateData(savedData);
        }
        console.log("Data saved successfully:", savedData);
      }
    } catch (err) {
      console.error("Error saving data:", err);
      setError(err instanceof Error ? err.message : "Failed to save data");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorCore]);

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-100 rounded">
        <h3 className="font-bold">Error</h3>
        <p>{error}</p>
        <button
          onClick={() => {
            setError(null);
          }}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <>
        <div className="w-full">
          <ReactEditorJS
            tools={EDITOR_JS_TOOLS}
            defaultValue={data}
            onInitialize={handleInitialize}
            onChange={handleSave}
            placeholder="Start writing your content..."
            onReady={() => console.log("Editor is ready!")}
            readOnly={props && props.viewOnly ? true : false}
          />
        </div>
      </>
    </>
  );
}

export default EditorJsComponent;
