/* eslint-disable @typescript-eslint/no-explicit-any */
// In a new file, e.g., components/QuillEditor.js
"use client";
import React, { useCallback } from "react";
import dynamic from "next/dynamic";

// Import Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const QuillEditorImageUpload = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  // Custom image handler function
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

  // Quill modules configuration
  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };

  return (
    <div className="quill-container">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        className="quill"
      />
    </div>
  );
};

export default QuillEditorImageUpload;
