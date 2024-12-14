"use client";
import { Button } from "@/shared/ui/button";
import { fileTypeFromBuffer } from "file-type";
import { downloadFileAction } from "../model/actions/downloadFile";

const determineMimeType = async (fileContent: Uint8Array) => {
  const fileType = await fileTypeFromBuffer(fileContent);

  if (fileType) {
    return fileType.mime;
  } else {
    return "application/octet-stream";
  }
};

const FileDownloadButton = ({
  filepath,
  filename,
}: {
  filepath: string;
  filename: string;
}) => {
  const handleDownload = async () => {
    console.log(filepath);
    const buffer = await downloadFileAction(filepath);

    if (!buffer) return console.log("ytadwad");
    const mimeType = await determineMimeType(buffer);

    const fileContentBuffer = new Uint8Array(buffer);
    const blob = new Blob([fileContentBuffer], { type: mimeType });
    const url = window.URL.createObjectURL(blob);

    const extension = mimeType.split("/")[1];

    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.${extension}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  return (
    <Button variant={"ghost"} onClick={handleDownload}>
      Download
    </Button>
  );
};

export default FileDownloadButton;
