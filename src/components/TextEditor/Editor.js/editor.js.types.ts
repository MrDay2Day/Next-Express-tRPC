import { OutputData } from "@editorjs/editorjs";

export interface EditorProps {
  data?: OutputData;
  onChange?: (data: OutputData) => void;
}

export interface EditorCore {
  destroy(): Promise<void>;
  clear(): Promise<void>;
  save(): Promise<OutputData>;
  render(data: OutputData): Promise<void>;
  _editorJS?: any;
}

export interface ImageUploadResponse {
  success: 1 | 0;
  file: {
    url: string;
    caption?: string;
    width?: number;
    height?: number;
  };
}

export type EditorJsType =
  | {
      viewOnly: false;
      data: undefined | OutputData;
      updateData?: (data: OutputData) => void;
    }
  | {
      viewOnly: true;
      data: undefined | OutputData;
    };
