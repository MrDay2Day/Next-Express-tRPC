export async function uploadByFile(file: File) {
  const formData = new FormData();
  formData.append("files", file);
  const requestOptions = { method: "POST", body: formData };
  const response = await fetch("/api/file", requestOptions);
  const res = (await response.json()) as {
    status: string;
    data: number;
    fileName: string;
    err: boolean;
  };

  if (res.err) throw new Error("Upload error");

  return {
    success: 1,
    file: {
      url: `/api/file?filename=${res.fileName}`,
    },
  };
}
