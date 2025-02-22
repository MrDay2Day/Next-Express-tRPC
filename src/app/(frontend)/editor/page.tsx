import { LoadingComp } from "@/app/loading";
import { nextDynamic } from "@/utils/dynamic";

import "@/components/TextEditor/Editor.js/editor.js.css";
import { demoData } from "@/components/TextEditor/Editor.js/demoData";

export const dynamic = "force-dynamic";
async function SimpleEditor() {
  const EditorJsComponent = nextDynamic<
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

  return (
    <main className="container mx-auto p-4 w-full">
      <h2>Editor.Js</h2>
      <p>Exports to JSON blocks with images uploaded to server.</p>
      <EditorJsComponent data={demoData} viewOnly={false} />
    </main>
  );
}

export default SimpleEditor;
