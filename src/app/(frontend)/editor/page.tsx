"use client";

import { ComponentType, useState } from "react";
import { OutputData } from "@editorjs/editorjs";

import { nextDynamic } from "@/utils/dynamic";
import { LoadingComp } from "@/app/loading";

import { demoData } from "@/components/TextEditor/Editor.js/demoData";
import { Button } from "@/components/ui/button";
import { EditorJsType } from "@/components/TextEditor/Editor.js/editor.js.types";

import "@/components/TextEditor/Editor.js/editor.js.css";

const EditorJsComponents: ComponentType<EditorJsType | undefined>[] = [];
for (let x = 0; x < 2; x++) {
  const Comp = nextDynamic<
    React.ComponentProps<
      typeof import("@/components/TextEditor/Editor.js/EditorJsComponent").default
    >
  >(
    async () =>
      import(
        // @ts-expect-error ---
        "@/components/TextEditor/Editor.js/EditorJsComponent"
      ),
    { ssr: false, loading: () => <LoadingComp /> }
  );

  EditorJsComponents.push(Comp);
}
const EditorJsComponent1 = EditorJsComponents[0];
const EditorJsComponent2 = EditorJsComponents[1];

function SimpleEditor() {
  const [readOnly, setReadOnly] = useState(false);
  const [data, setData] = useState<OutputData>(demoData);

  return (
    <main className="container mx-auto w-full">
      <h2>Editor.Js</h2>
      <p>Exports to JSON blocks with images uploaded to server.</p>
      <Button className="my-4 w-48" onClick={() => setReadOnly(!readOnly)}>{`${
        readOnly ? "Disable" : "Enable"
      } Read Only`}</Button>

      {readOnly ? (
        <EditorJsComponent1 data={data} viewOnly={true} />
      ) : (
        <EditorJsComponent2
          data={data}
          viewOnly={false}
          updateData={(newData: OutputData) => {
            console.log({ newData });
            setData(newData);
          }}
        />
      )}
    </main>
  );
}

export default SimpleEditor;
