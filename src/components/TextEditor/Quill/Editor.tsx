/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

import { Button } from "../../ui/button";
import { LoadingComp } from "@/app/loading";

import "react-quill-new/dist/quill.snow.css";
import "katex/dist/katex.min.css";
// import "quill-image-uploader/dist/quill.imageUploader.min.css";

import DOMPurify from "dompurify";
import hljs from "highlight.js";
import { Input } from "@/components/ui/input";

// @ts-expect-error ---
window.hljs = hljs;

type BlotConstructor<T extends HTMLElement = HTMLElement> = {
  new (...args: any[]): T;
  blotName: string;
  tagName: string;
  create(value: any): T;
  value(node: T): any;
};

type BlockBlot = BlotConstructor<HTMLElement>;

const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: RQ, Quill } = await import("react-quill-new");

    const { default: QuillResizeImage } = await import("quill-resize-image");

    const { default: katex } = await import("katex");
    window.katex = katex;

    // -@ts-expect-error ---
    // const { default: BetterTable } = await import("quill-better-table");
    // const { default: QuillTableUI } = await import("quill-table-ui");

    Quill.register(
      {
        "modules/resize": QuillResizeImage,
        // "modules/imageUploader":
        // "modules/better-table": BetterTable,
      },
      true
    );

    // @ts-expect-error ---
    window.Quill = Quill;
    console.log({ Quill });
    return function comp({ forwardedRef, ...props }: any) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false, loading: () => <LoadingComp /> }
);

const QuillEditorComponent = () => {
  const [mounted, setMounted] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [value, setValue] = useState<string>();
  const [title, setTitle] = useState<string>("");

  const imageHandler = useCallback(async () => {
    const input: HTMLInputElement = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const files = input.files;
      if (!files) return;
      const file = files[0];
      if (file) {
        try {
          // Create form data
          const formData = new FormData();
          formData.append("files", file);

          // Upload to your API endpoint
          const response = await fetch("/api/file", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) throw new Error("Upload failed");

          const data = (await response.json()) as { url: string };

          // Get the Quill instance
          const quillContainer = document.querySelector(".quill");
          if (!quillContainer) throw new Error("Quill container not found");
          const quill = (quillContainer.children[0] as any).__quill;

          // Get the current cursor position
          const range = quill.getSelection(true);

          // Insert the image
          quill.insertEmbed(
            range.index,
            "image",
            `/api/file?filename=${data.url}`
          );
          // Move cursor to next position
          quill.setSelection(range.index + 1);
        } catch (error) {
          console.error("Error uploading image:", error);
          alert("Failed to upload image");
        }
      }
    };
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <LoadingComp />;
  }

  const changeState = () => {
    const newReadOnly = !readOnly;
    setReadOnly(newReadOnly);
    const toolBars = document.getElementsByClassName("ql-toolbar");
    Array.from(toolBars).forEach((toolbar) => {
      // @ts-expect-error Does exist
      toolbar.style.display = newReadOnly ? "none" : "block";
    });
  };

  const sanitizeContent = (content: string) => {
    // Configure DOMPurify to allow necessary tags and attributes
    const sanitizeConfig = {
      ALLOWED_TAGS: [
        "p",
        "span",
        "img",
        "strong",
        "em",
        "u",
        "h1",
        "h2",
        "h3",
        "blockquote",
        "ul",
        "ol",
        "li",
        "a",
      ],
      ALLOWED_ATTR: ["src", "class", "href", "target", "rel", "alt", "style"],
      ADD_TAGS: ["iframe"],
      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
    };

    return DOMPurify.sanitize(content, sanitizeConfig);
  };

  const modules = {
    syntax: false,
    resize: {
      locale: {
        center: "center",
      },
    },
    table: false,
    handlers: {
      image: imageHandler,
    },
    toolbar: [
      [{ header: [false, 1, 2, 3, 4, 5, 6] }, { font: [] }],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block", "formula"],
      [{ script: "sub" }, { script: "super" }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["table"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const formats = [
    "font",
    "table",
    "align",
    "header",
    "color",
    "background",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "code-block",
    "formula",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <>
      <Button
        onClick={changeState}
        className="my-4 w-40 hover:bg-red-900 hover:text-gray-300 duration-100 transition-all hover:font-bold"
      >
        {readOnly ? "Disable" : "Enable"}
        {" Read Only"}
      </Button>

      {readOnly ? (
        <h1 className="p-4 mx-auto max-w-[1200px]">{title || "Untitled"}</h1>
      ) : (
        <Input
          className="my-4 h-16 mx-auto max-w-[1200px]"
          placeholder="Title"
          size={20}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      )}

      <div>
        {readOnly && (!value || value.length < 1) ? (
          <p className="p-4 mx-auto max-w-[1200px]">No Content</p>
        ) : (
          <QuillNoSSRWrapper
            className={`w-full mx-auto max-w-[1200px] ${
              readOnly ? "" : "border-[1px] border-s-slate-400"
            }`}
            readOnly={readOnly}
            value={value}
            modules={modules}
            formats={formats}
            theme="snow"
            onChange={(v: string) => {
              console.log(v);
              if (readOnly) return;
              setValue(v);
            }}
            placeholder={readOnly ? "" : "Type here..."}
            onBlur={() => console.log("CONTENT:", value)}
          />
        )}
        <Button
          className="my-4 w-32 bg-lime-800 text-slate-100 font-bold"
          onClick={() => console.log({ value })}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default QuillEditorComponent;
