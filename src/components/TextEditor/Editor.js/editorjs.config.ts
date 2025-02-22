/* eslint-disable @typescript-eslint/no-unused-vars */
// Import tools
"use client";
import Image from "@editorjs/image";
import Checklist from "@editorjs/checklist";
import Marker from "@editorjs/marker";
import LinkTool from "@editorjs/link";
import Raw from "@editorjs/raw";
import SimpleImage from "@editorjs/simple-image";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Warning from "@editorjs/warning";
import CodeTool from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import Table from "@editorjs/table";
import CodeBlock from "@bomdi/codebox";
import EditorjsList from "@editorjs/list";

import { uploadByFile } from "@/utils/fileManagement";
import { ImageUploadResponse } from "./editor.js.types";

export const EDITOR_JS_TOOLS = {
  table: Table,
  list: List,
  quote: {
    class: Quote,
    inlineToolbar: true,
    config: {
      quotePlaceholder: "Enter a quote",
      captionPlaceholder: "Quote's author",
    },
  },
  warning: {
    class: Warning,
    inlineToolbar: true,
    config: {
      titlePlaceholder: "Title",
      messagePlaceholder: "Message",
    },
  },
  code: CodeTool,
  // code: CodeBlock,
  linkTool: LinkTool,
  image: {
    class: Image,
    config: {
      uploader: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        uploadByFile,
        async uploadByUrl(url: string): Promise<ImageUploadResponse> {
          return {
            success: 1,
            file: {
              url,
            },
          };
        },
      },
    },
  },
  raw: Raw,
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        coub: true,
        twitter: true,
        instagram: true,
        codepen: true,
      },
    },
  },
  header: Header,
  marker: Marker,
  checklist: Checklist,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
};

// export const editorjs = new EditorJS({
//   holder: "editorjs-holder",
//   tools: EDITOR_JS_TOOLS,
// });
